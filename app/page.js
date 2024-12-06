'use client';

import { useState } from 'react';
import { processFile } from '@/lib/api';
import { VoiceSelector } from '../components/VoiceSelector';
import { FileDropzone } from '../components/FileDropzone';
import { processFile } from '../lib/api';

export default function Home() {
  const [sourceLanguage, setSourceLanguage] = useState('pt-BR');
  const [sourceVoice, setSourceVoice] = useState('');
  const [translations, setTranslations] = useState([]);
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleAddTranslation = () => {
    setTranslations(prev => [...prev, {
      targetLang: 'en-US',
      targetVoice: ''
    }]);
  };

  const removeTranslation = (index) => {
    setTranslations(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      alert('Please add files first');
      return;
    }

    setProcessing(true);
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
      alert(`Error: ${error.message}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="card p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Source Settings</h2>
            <LanguageSelector
              value={sourceLanguage}
              onChange={setSourceLanguage}
            />
            <VoiceSelector
              language={sourceLanguage}
              value={sourceVoice}
              onChange={setSourceVoice}
            />
          </div>

          <div className="card p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Target Translations</h2>
              <button 
                onClick={handleAddTranslation}
                className="btn bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Translation
              </button>
            </div>
            {translations.map((translation, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="flex justify-end mb-2">
                  <button 
                    onClick={() => removeTranslation(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
                <LanguageSelector
                  value={translation.targetLang}
                  onChange={(lang) => {
                    const newTranslations = [...translations];
                    newTranslations[index].targetLang = lang;
                    setTranslations(newTranslations);
                  }}
                />
                <VoiceSelector
                  language={translation.targetLang}
                  value={translation.targetVoice}
                  onChange={(voice) => {
                    const newTranslations = [...translations];
                    newTranslations[index].targetVoice = voice;
                    setTranslations(newTranslations);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <FileDropzone 
            onFilesAdded={handleFileUpload}
            files={files}
            onFileRemove={(index) => {
              setFiles(prev => prev.filter((_, i) => i !== index));
            }}
          />
          
          <button
            onClick={handleProcess}
            disabled={processing || files.length === 0}
            className={`w-full py-3 rounded-lg font-bold ${
              processing || files.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {processing ? 'Processing...' : 'Process Files'}
          </button>
        </div>
      </div>
    </main>
  );
}
