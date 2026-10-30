import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../../types';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLanguageChange }) => {
  const languages: { code: Language; label: string; script: string }[] = [
    { code: 'en', label: 'English', script: 'EN' },
    { code: 'te', label: 'తెలుగు', script: 'TEL' },
    { code: 'hi', label: 'हिन्दी', script: 'HIN' },
  ];

  return (
    <div className="inline-flex items-center gap-1 bg-[#F5FAFA] border border-[#DCE8E9] rounded-lg p-0.5 shadow-sm">
      <div className="pl-2 pr-1 text-[#087F8C] hidden sm:flex items-center">
        <Globe className="w-3.5 h-3.5" />
      </div>
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => onLanguageChange(l.code)}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            currentLang === l.code
              ? 'bg-[#087F8C] text-white shadow-xs font-semibold'
              : 'text-[#647681] hover:text-[#18313B] hover:bg-white'
          }`}
          title={l.label}
          aria-label={`Switch language to ${l.label}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};
