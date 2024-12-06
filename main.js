const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

// Inicializar Gemini
const genAI = new GoogleGenerativeAI('AIzaSyARzNw_Kh8PGb9c7lCJ2ueGeeMx6XkAB28');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });
    mainWindow.loadFile('index.html');
}

// Window Controls
ipcMain.on('close-window', () => mainWindow.close());
ipcMain.on('minimize-window', () => mainWindow.minimize());
ipcMain.on('maximize-window', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});

// File Dialog
ipcMain.handle('show-file-dialog', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Text Files', extensions: ['txt'] }]
    });
    
    if (!result.canceled) {
        return Promise.all(result.filePaths.map(async filepath => ({
            path: filepath,
            name: path.basename(filepath),
            content: await fs.readFile(filepath, 'utf8')
        })));
    }
    return [];
});

// Função para delay entre tentativas
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Função para dividir o texto em chunks
function splitTextIntoChunks(text, numChunks = 30) {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunkSize = Math.ceil(sentences.length / numChunks);
    const chunks = [];
    
    for (let i = 0; i < sentences.length; i += chunkSize) {
        chunks.push(sentences.slice(i, i + chunkSize).join(' ').trim());
    }
    
    return chunks;
}

// Função para tradução usando IA com retentativas
async function translateWithAI(text, sourceLang, targetLang, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Tentativa ${attempt} de tradução`);
            
            const prompt = `
                Você é um tradutor profissional especializado em adaptações culturais e literárias.
                
                Traduza o seguinte texto de ${sourceLang} para ${targetLang}.
                Mantenha o tom e o estilo do original, mas faça as adaptações necessárias para que soe natural no idioma alvo.
                Não faça traduções literais, adapte expressões idiomáticas e referências culturais quando necessário.
                
                Texto original:
                "${text}"
                
                Forneça apenas a tradução, sem explicações ou notas adicionais.
            `;

            const result = await Promise.race([
                model.generateContent(prompt),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Timeout')), 30000)
                )
            ]);

            return result.response.text().trim();
        } catch (error) {
            console.error(`Erro na tentativa ${attempt}:`, error);
            lastError = error;
            
            if (attempt < maxRetries) {
                const waitTime = Math.pow(2, attempt) * 1000;
                console.log(`Aguardando ${waitTime}ms antes da próxima tentativa...`);
                await delay(waitTime);
            }
        }
    }
    
    throw lastError;
}

// Função auxiliar para processar o texto em chunks
async function processTextToSpeech(text, voice, outputPath) {
    const tempDir = path.join(app.getPath('temp'), 'tts-temp');
    await fs.mkdir(tempDir, { recursive: true });
    const tempFile = path.join(tempDir, `${Date.now()}.txt`);
    await fs.writeFile(tempFile, text, 'utf8');
    
    try {
        await execAsync(`edge-tts --voice "${voice}" --file "${tempFile}" --write-media "${outputPath}"`);
    } finally {
        try {
            await fs.unlink(tempFile);
        } catch (error) {
            console.error('Error cleaning temp file:', error);
        }
    }
}

// Process Files
ipcMain.handle('process-file', async (event, data) => {
    const { content, fileName, sourceLanguage, sourceVoice, translations } = data;
    
    const outputDir = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
        title: 'Select Output Directory'
    });
    
    if (outputDir.canceled) return { success: false, error: 'No output directory selected' };

    try {
        const baseName = path.parse(fileName).name;
        
        // Processar áudio original
        console.log('Gerando áudio original...');
        const sourceOutputPath = path.join(outputDir.filePaths[0], `${baseName}_original.mp3`);
        await processTextToSpeech(content, sourceVoice, sourceOutputPath);
        
        // Dividir o texto em chunks para tradução
        const textChunks = splitTextIntoChunks(content);
        console.log(`Texto dividido em ${textChunks.length} partes`);
        
        // Processar cada tradução
        for (const trans of translations) {
            console.log(`Iniciando tradução para ${trans.targetLang}...`);
            const targetLang = trans.targetLang.split('-')[0];
            let fullTranslation = '';
            
            // Traduzir chunk por chunk
            for (let i = 0; i < textChunks.length; i++) {
                console.log(`Processando parte ${i + 1} de ${textChunks.length}`);
                
                const translatedChunk = await translateWithAI(
                    textChunks[i],
                    sourceLanguage,
                    targetLang
                );
                
                fullTranslation += translatedChunk + ' ';
                
                // Notificar progresso
                mainWindow.webContents.send('translation-progress', {
                    lang: trans.targetLang,
                    current: i + 1,
                    total: textChunks.length
                });

                // Pequena pausa entre chunks
                if (i < textChunks.length - 1) {
                    await delay(1000);
                }
            }
            
            // Gerar áudio da tradução
            console.log('Gerando áudio da tradução...');
            const outputPath = path.join(outputDir.filePaths[0], `${baseName}_${trans.targetLang}.mp3`);
            await processTextToSpeech(fullTranslation.trim(), trans.targetVoice, outputPath);
        }
        
        return { success: true };
    } catch (error) {
        console.error('Erro no processamento:', error);
        return { success: false, error: error.message };
    }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});