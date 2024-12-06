const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    closeWindow: () => ipcRenderer.send('close-window'),
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    processFile: (data) => ipcRenderer.invoke('process-file', data),
    showFileDialog: () => ipcRenderer.invoke('show-file-dialog'),
    onTranslationProgress: (callback) => 
        ipcRenderer.on('translation-progress', (_, data) => callback(data))
});