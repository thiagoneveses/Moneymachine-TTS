// Mapeamento completo de vozes do Edge TTS
const edgeVoices = {
    'pt-BR': [
        { value: 'pt-BR-AntonioNeural', name: 'Antonio', tags: ['male'] },
        { value: 'pt-BR-FranciscaNeural', name: 'Francisca', tags: ['female'] },
        { value: 'pt-BR-LeticiaNeural', name: 'Letícia', tags: ['female'] },
        { value: 'pt-BR-BrendaNeural', name: 'Brenda', tags: ['female'] },
        { value: 'pt-BR-DonatoNeural', name: 'Donato', tags: ['male'] },
        { value: 'pt-BR-ElzaNeural', name: 'Elza', tags: ['female'] },
        { value: 'pt-BR-FabioNeural', name: 'Fabio', tags: ['male'] },
        { value: 'pt-BR-GiovannaNeural', name: 'Giovanna', tags: ['female'] },
        { value: 'pt-BR-HumbertoNeural', name: 'Humberto', tags: ['male'] },
        { value: 'pt-BR-JulioNeural', name: 'Julio', tags: ['male'] },
        { value: 'pt-BR-ManuelaNeural', name: 'Manuela', tags: ['female'] },
        { value: 'pt-BR-NicolauNeural', name: 'Nicolau', tags: ['male'] },
        { value: 'pt-BR-ValerioNeural', name: 'Valerio', tags: ['male', 'multilingual'] }
    ],
    'en-US': [
        { value: 'en-US-ChristopherNeural', name: 'Christopher', tags: ['male'] },
        { value: 'en-US-JennyNeural', name: 'Jenny', tags: ['female'] },
        { value: 'en-US-EricNeural', name: 'Eric', tags: ['male'] },
        { value: 'en-US-AnaNeural', name: 'Ana', tags: ['female'] },
        { value: 'en-US-AmberNeural', name: 'Amber', tags: ['female'] },
        { value: 'en-US-AshleyNeural', name: 'Ashley', tags: ['female'] },
        { value: 'en-US-BrandonNeural', name: 'Brandon', tags: ['male'] },
        { value: 'en-US-BrianNeural', name: 'Brian', tags: ['male'] },
        { value: 'en-US-DavisNeural', name: 'Davis', tags: ['male'] },
        { value: 'en-US-ElizabethNeural', name: 'Elizabeth', tags: ['female'] },
        { value: 'en-US-GuyNeural', name: 'Guy', tags: ['male'] },
        { value: 'en-US-JacobNeural', name: 'Jacob', tags: ['male'] },
        { value: 'en-US-JaneNeural', name: 'Jane', tags: ['female'] },
        { value: 'en-US-JasonNeural', name: 'Jason', tags: ['male'] },
        { value: 'en-US-MichelleNeural', name: 'Michelle', tags: ['female'] },
        { value: 'en-US-MonicaNeural', name: 'Monica', tags: ['female'] },
        { value: 'en-US-NancyNeural', name: 'Nancy', tags: ['female'] },
        { value: 'en-US-RogerNeural', name: 'Roger', tags: ['male'] },
        { value: 'en-US-SaraNeural', name: 'Sara', tags: ['female'] },
        { value: 'en-US-SteffanNeural', name: 'Steffan', tags: ['male'] },
        { value: 'en-US-TonyNeural', name: 'Tony', tags: ['male', 'multilingual'] }
    ],
    'es-ES': [
        { value: 'es-ES-AlvaroNeural', name: 'Alvaro', tags: ['male'] },
        { value: 'es-ES-ElviraNeural', name: 'Elvira', tags: ['female'] },
        { value: 'es-ES-AbrilNeural', name: 'Abril', tags: ['female'] },
        { value: 'es-ES-ArnauNeural', name: 'Arnau', tags: ['male'] },
        { value: 'es-ES-DarioNeural', name: 'Dario', tags: ['male'] },
        { value: 'es-ES-EliasNeural', name: 'Elias', tags: ['male'] },
        { value: 'es-ES-EstrellaNeural', name: 'Estrella', tags: ['female'] },
        { value: 'es-ES-IreneNeural', name: 'Irene', tags: ['female'] },
        { value: 'es-ES-LaiaNeural', name: 'Laia', tags: ['female'] },
        { value: 'es-ES-LiaNeural', name: 'Lia', tags: ['female'] },
        { value: 'es-ES-NilNeural', name: 'Nil', tags: ['male'] },
        { value: 'es-ES-SaulNeural', name: 'Saul', tags: ['male'] },
        { value: 'es-ES-TeoNeural', name: 'Teo', tags: ['male'] },
        { value: 'es-ES-TrianaNeural', name: 'Triana', tags: ['female'] },
        { value: 'es-ES-VeronicaNeural', name: 'Veronica', tags: ['female', 'multilingual'] }
    ],
    'fr-FR': [
        { value: 'fr-FR-HenriNeural', name: 'Henri', tags: ['male'] },
        { value: 'fr-FR-DeniseNeural', name: 'Denise', tags: ['female'] },
        { value: 'fr-FR-AlainNeural', name: 'Alain', tags: ['male'] },
        { value: 'fr-FR-BrigitteNeural', name: 'Brigitte', tags: ['female'] },
        { value: 'fr-FR-CelesteNeural', name: 'Celeste', tags: ['female'] },
        { value: 'fr-FR-ClaudeNeural', name: 'Claude', tags: ['male'] },
        { value: 'fr-FR-CoralieNeural', name: 'Coralie', tags: ['female'] },
        { value: 'fr-FR-EloiseNeural', name: 'Eloise', tags: ['female'] },
        { value: 'fr-FR-JacquelineNeural', name: 'Jacqueline', tags: ['female'] },
        { value: 'fr-FR-JeromeNeural', name: 'Jerome', tags: ['male'] },
        { value: 'fr-FR-JosephineNeural', name: 'Josephine', tags: ['female'] },
        { value: 'fr-FR-MauriceNeural', name: 'Maurice', tags: ['male'] },
        { value: 'fr-FR-YvesNeural', name: 'Yves', tags: ['male'] },
        { value: 'fr-FR-YvetteNeural', name: 'Yvette', tags: ['female', 'multilingual'] }
    ]
};

// Adicionar Andrew multilíngue em todos os idiomas
const andrewMultilingual = { 
    value: 'en-US-AndrewNeural', 
    name: 'Andrew', 
    tags: ['male', 'multilingual', 'newscast', 'casual'] 
};

Object.keys(edgeVoices).forEach(lang => {
    edgeVoices[lang].push(andrewMultilingual);
});

// Funções de utilidade
function createLanguageSelect() {
    const select = document.createElement('select');
    select.className = 'target-language w-full p-2 rounded border mb-2';
    
    const langNames = {
        'pt-BR': 'Português (Brasil)',
        'en-US': 'English (US)',
        'es-ES': 'Español (España)',
        'fr-FR': 'Français (France)'
    };
    
    Object.keys(edgeVoices).forEach(langCode => {
        const option = document.createElement('option');
        option.value = langCode;
        option.textContent = langNames[langCode] || langCode;
        select.appendChild(option);
    });
    
    return select;
}

function updateVoiceSelect(selectElement, language) {
    selectElement.innerHTML = '';
    const voices = edgeVoices[language] || [];
    
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.value;
        option.textContent = `${voice.name} ${voice.tags.includes('multilingual') ? '🌐' : ''}`;
        selectElement.appendChild(option);
    });
}

function addTranslationEntry() {
    const entry = document.createElement('div');
    entry.className = 'p-3 bg-gray-50 dark:bg-gray-800 rounded';
    
    const languageSelect = createLanguageSelect();
    
    entry.innerHTML = `
        <div class="flex flex-col space-y-2">
            <div class="flex justify-between items-center">
                <label class="text-sm font-medium">Target Language</label>
                <button class="text-red-500 hover:text-red-700">❌</button>
            </div>
            <div class="language-select-container"></div>
            
            <label class="text-sm font-medium">Target Voice</label>
            <select class="target-voice w-full p-2 rounded border">
                <!-- Preenchido dinamicamente -->
            </select>
            
            <div class="text-xs text-gray-500 mt-1">
                🌐 = Multilingual available
            </div>
        </div>
    `;

    entry.querySelector('.language-select-container').appendChild(languageSelect);
    const voiceSelect = entry.querySelector('.target-voice');
    
    languageSelect.addEventListener('change', () => {
        updateVoiceSelect(voiceSelect, languageSelect.value);
    });
    
    updateVoiceSelect(voiceSelect, languageSelect.value);
    entry.querySelector('button').addEventListener('click', () => entry.remove());
    document.getElementById('translationsList').appendChild(entry);
}

// Gerenciamento de arquivos
let queuedFiles = [];

function handleFileSelect(event) {
    const files = event.target.files;
    processFiles(files);
}

async function processFiles(files) {
    const fileQueue = document.getElementById('fileQueue');
    
    Array.from(files).forEach(file => {
        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const item = document.createElement('div');
                item.className = 'bg-gray-50 dark:bg-gray-800 p-4 rounded flex items-start space-x-4';
                
                item.innerHTML = `
                    <div class="flex-1">
                        <div class="flex justify-between items-center mb-2">
                            <span class="font-medium">${file.name}</span>
                            <button class="text-red-500 hover:text-red-700">❌</button>
                        </div>
                        <textarea 
                            class="w-full p-2 rounded border text-sm h-20 mb-2"
                            readonly
                        >${e.target.result}</textarea>
                        <div class="flex items-center space-x-2">
                            <div class="h-2 bg-gray-200 rounded-full flex-1">
                                <div class="progress-bar h-full w-0 bg-blue-500 rounded-full transition-all duration-300"></div>
                            </div>
                            <span class="text-sm status">Pending</span>
                        </div>
                    </div>
                `;

                item.querySelector('button').addEventListener('click', () => {
                    item.remove();
                    queuedFiles = queuedFiles.filter(f => f.name !== file.name);
                    updateQueueStatus();
                });

                fileQueue.appendChild(item);
                queuedFiles.push({
                    name: file.name,
                    content: e.target.result,
                    element: item
                });
                updateQueueStatus();
            };

            reader.readAsText(file);
        }
    });
}

function updateQueueStatus() {
    const fileCount = document.getElementById('fileQueue').children.length;
    const queueStatus = document.getElementById('queueStatus');
    queueStatus.textContent = fileCount === 0 ? 'No files in queue' : 
                            `${fileCount} file${fileCount === 1 ? '' : 's'} in queue`;
}

// Event Listeners e Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Window controls
    document.getElementById('closeBtn').addEventListener('click', () => {
        window.electronAPI.closeWindow();
    });

    document.getElementById('minimizeBtn').addEventListener('click', () => {
        window.electronAPI.minimizeWindow();
    });

    document.getElementById('maximizeBtn').addEventListener('click', () => {
        window.electronAPI.maximizeWindow();
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? '' : 'dark'
        );
    });

    // File input
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);

    // Drag and drop
    const dropZone = document.getElementById('dropZone');
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        processFiles(e.dataTransfer.files);
    });

    // Process button
    document.getElementById('processAll').addEventListener('click', async () => {
        if (queuedFiles.length === 0) {
            alert('Please add files to the queue first!');
            return;
        }

        const sourceLanguage = document.getElementById('sourceLanguage').value;
        const sourceVoice = document.getElementById('sourceVoice').value;
        const translations = Array.from(document.querySelectorAll('#translationsList > div')).map(entry => ({
            targetLang: entry.querySelector('.target-language').value,
            targetVoice: entry.querySelector('.target-voice').value
        }));

        for (const file of queuedFiles) {
            try {
                const status = file.element.querySelector('.status');
                const progressBar = file.element.querySelector('.progress-bar');
                
                status.textContent = 'Processing...';
                progressBar.style.width = '50%';

                const result = await window.electronAPI.processFile({
                    content: file.content,
                    fileName: file.name,
                    sourceLanguage,
                    sourceVoice,
                    translations
                });

                if (result.success) {
                    status.textContent = 'Completed';
                    progressBar.style.width = '100%';
                    progressBar.style.backgroundColor = '#10B981';
                } else {
                    throw new Error(result.error);
                }
            } catch (error) {
                file.element.querySelector('.status').textContent = `Error: ${error.message}`;
                file.element.querySelector('.progress-bar').style.backgroundColor = '#EF4444';
            }
        }
    });

    // Initialize source language and voice
    const sourceLanguageSelect = document.getElementById('sourceLanguage');
    sourceLanguageSelect.addEventListener('change', () => {
        updateVoiceSelect(document.getElementById('sourceVoice'), sourceLanguageSelect.value);
    });
    
    // Add translation button
    document.getElementById('addTranslation').addEventListener('click', addTranslationEntry);
    
    // Initialize first translation entry and source voice
    addTranslationEntry();
    updateVoiceSelect(document.getElementById('sourceVoice'), sourceLanguageSelect.value);

    // Initialize file selection via button
    document.getElementById('addFiles').addEventListener('click', async () => {
        const files = await window.electronAPI.showFileDialog();
        processFiles(files);
    });
});
