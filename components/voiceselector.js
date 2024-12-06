'use client';

import { useMemo } from 'react';
import voicesList from '@/lib/voices';

export default function VoiceSelector({ language, value, onChange }) {
  const voices = useMemo(() => {
    const [mainLang, country] = language.split('-');
    const langVoices = voicesList[mainLang]?.[country] || [];
    return langVoices;
  }, [language]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Voice
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-select"
      >
        <option value="">Select a voice</option>
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.gender})
            {voice.styles ? ` - Styles: ${voice.styles.join(', ')}` : ''}
          </option>
        ))}
      </select>
      {voices.length === 0 && (
        <p className="text-sm text-gray-500">
          No voices available for this language
        </p>
      )}
    </div>
  );
}
