'use client';

import { useState } from 'react';

export function FileDropzone({ onFilesAdded, files, onFileRemove }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'text/plain' || file.name.endsWith('.txt')
    );
    
    if (droppedFiles.length > 0) {
      onFilesAdded(droppedFiles);
    }
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 0) {
      onFilesAdded(selectedFiles);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}
          hover:border-blue-500 dark:hover:border-blue-500
        `}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          accept=".txt"
          onChange={handleFileInput}
          className="hidden"
        />
        <label 
          htmlFor="fileInput" 
          className="cursor-pointer text-gray-600 dark:text-gray-300"
        >
          Drag and drop TXT files here
          <br />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            or click to select files
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded"
            >
              <span className="truncate">{file.name}</span>
              <button
                onClick={() => onFileRemove(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-400">
        {files.length === 0 ? 'No files in queue' : `${files.length} file(s) in queue`}
      </div>
    </div>
  );
}
