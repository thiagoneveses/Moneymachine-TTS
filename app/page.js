'use client';

import { useState } from 'react';
import { VoiceSelector } from '@/components/VoiceSelector';
import { FileDropzone } from '@/components/FileDropzone';
import { processFile } from '@/lib/api';

export default function Home() {
  const [sourceLanguage, setSourceLanguage] = useState('pt-BR');
  const [sourceVoice, setSourceVoice] = useState('');
  const [translations, setTranslations] = useState([]);
  const [files, setFiles] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const handleAddTranslation = () => {
    setTranslations(prev => [...prev, {
      targetLang: 'en-US',
      targetVoice: ''
    }]);
  };

  const removeTranslation = (index) => {
    setTranslations(translations.filter((_, i) => i !== index));
  };

  const handleFileSelect = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleProcessAll = async () => {
    if (files.length === 0) {
      alert('Please add files first');
      return;
    }

    try {
      for (const file of files) {
        const content = await file.text();
        const result = await processFile({
          content,
          fileName: file.name,
          sourceLanguage,
          sourceVoice,
          translations
        });

        if (!result.success) {
          throw new Error(result.error);
        }
      }
      alert('Processing completed successfully!');
    } catch (error) {
      alert('Error processing files: ' + error.message);
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="titlebar flex items-center px-4 bg-transparent">
          <div className="flex-1 text-center text-sm opacity-50">
            TTS Generator
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Settings Panel */}
            <div className="w-full md:w-1/3">
              <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Settings</h2>
                  <button 
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    🌓
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Source Text Settings</h3>
                  <VoiceSelector
                    language={sourceLanguage}
                    value={sourceVoice}
                    onChange={setSourceVoice}
                    onLanguageChange={setSourceLanguage}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Target Translations</h3>
                    <button 
                      onClick={handleAddTranslation}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add Translation
                    </button>
                  </div>

                  <div className="space-y-4">
                    {translations.map((trans, index) => (
                      <div key={index} className="p-4 border rounded dark:border-gray-700">
                        <button 
                          onClick={() => removeTranslation(index)}
                          className="float-right text-red-500 hover:text-red-700"
                        >
                          ❌
                        </button>
                        <VoiceSelector
                          language={trans.targetLang}
                          value={trans.targetVoice}
                          onChange={(voice) => {
                            const newTranslations = [...translations];
                            newTranslations[index].targetVoice = voice;
                            setTranslations(newTranslations);
                          }}
                          onLanguageChange={(lang) => {
                            const newTranslations = [...translations];
                            newTranslations[index].targetLang = lang;
                            setTranslations(newTranslations);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Queue */}
            <div className="w-full md:w-2/3">
              <div className="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Processing Queue</h2>
                  <button
                    onClick={handleProcessAll}
                    disabled={files.length === 0}
                    className={`px-4 py-2 rounded ${
                      files.length === 0
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    Process All
                  </button>
                </div>

                <FileDropzone
                  onFilesAdded={handleFileSelect}
                  files={files}
                  onFileRemove={removeFile}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
