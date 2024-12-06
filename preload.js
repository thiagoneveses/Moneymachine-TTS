// preload.js
export const electronAPI = {
  processFile: async (data) => {
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: error.message };
    }
  },

  showFileDialog: () => {
    // Na web, usamos input type="file" ao invés do dialog
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = '.txt';

      input.onchange = (e) => {
        const files = Array.from(e.target.files);
        resolve(files);
      };

      input.click();
    });
  }
};

// Expor para janela
if (typeof window !== 'undefined') {
  window.electronAPI = electronAPI;
}