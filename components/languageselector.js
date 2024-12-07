'use client';

const languages = {
  "pt-BR": "Portuguese (Brazil)",
  "en-US": "English (US)",
  "es-ES": "Spanish (Spain)",
  "fr-FR": "French (France)",
  "de-DE": "German (Germany)",
  "it-IT": "Italian (Italy)",
  "ja-JP": "Japanese (Japan)",
  "ko-KR": "Korean (Korea)",
  "zh-CN": "Chinese (Simplified)",
  "ru-RU": "Russian (Russia)"
};

export default function LanguageSelector({ value, onChange, label = "Language" }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-select"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
