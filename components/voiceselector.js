'use client';

import { useState, useEffect } from 'react';
import voicesList from '@/lib/voices';

export function VoiceSelector({ language, value, onChange, onLanguageChange }) {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const [lang, country] = language.split('-');
    const mainLanguage = Object.keys(voicesList).find(
      key => key.toLowerCase().startsWith(lang.toLowerCase())
    );
    
    if (mainLanguage) {
      const countryVoices = Object.entries(voicesList[mainLanguage]).find(([key]) =>
        key.toLowerCase().includes(country.toLowerCase())
      );
      
      if (countryVoices) {
        setVoices(countryVoices[1]);
      }
    }
  }, [language]);

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Language
        </label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
        >
          <option value="pt-BR">Portuguese (Brazil)</option>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Spanish (Spain)</option>
          <option value="fr-FR">French (France)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Voice
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
        >
          <option value="">Select a voice</option>
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.gender})
              {voice.styles ? ` - ${voice.styles.join(', ')}` : ''}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
