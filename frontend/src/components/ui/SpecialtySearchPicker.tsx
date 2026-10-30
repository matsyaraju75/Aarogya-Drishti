import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Smile, 
  Stethoscope, 
  Scan, 
  Microscope, 
  Activity, 
  Building2, 
  Check, 
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

export interface SpecialtyItem {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  badgeColor: string;
  icon: 'dentist' | 'ent' | 'omr' | 'surgery' | 'pathology' | 'clinic';
  keywords: string[];
}

export const SPECIALTY_LIST: SpecialtyItem[] = [
  {
    id: 'dentist',
    name: 'Dentist',
    title: 'Dentist (General Dental Surgeon)',
    category: 'Dental Medicine & Surgery',
    description: 'Routine oral mucosal screening, tooth/gum pain, pre-cancer triage & habit counseling',
    badge: 'Dental Care',
    badgeColor: 'bg-[#e0f2fe] text-[#0369a1]',
    icon: 'dentist',
    keywords: ['dentist', 'dental', 'teeth', 'gums', 'bds', 'tooth', 'dentistry', 'cleaning', 'oral cavity']
  },
  {
    id: 'ent-specialist',
    name: 'ENT Specialist',
    title: 'ENT Specialist (Ear, Nose, Throat & Head-Neck)',
    category: 'Otolaryngology & Head-Neck Surgery',
    description: 'Persistent oral ulcers >14 days, throat hoarseness, dysphagia, neck lumps & vocal cords',
    badge: 'ENT Specialist',
    badgeColor: 'bg-[#fef3c7] text-[#92400e]',
    icon: 'ent',
    keywords: ['ent', 'ent specialist', 'ear', 'nose', 'throat', 'larynx', 'neck', 'hoarseness', 'swallowing']
  },
  {
    id: 'omr-specialist',
    name: 'Oral Medicine and Radiology Specialist',
    title: 'Oral Medicine and Radiology Specialist (OMR)',
    category: 'Diagnostic Oral Oncology & Radiology',
    description: 'Gold-standard diagnosis for Leukoplakia, Erythroplakia, OSMF, optical imaging & biopsy triage',
    badge: 'OMR Specialist',
    badgeColor: 'bg-[#e6f4f6] text-[#087F8C]',
    icon: 'omr',
    keywords: ['oral medicine', 'radiology', 'omr', 'oral medicine and radiology', 'leukoplakia', 'osmf', 'erythroplakia', 'biopsy', 'white patch']
  },
  {
    id: 'surgical-oncologist',
    name: 'Head & Neck Surgical Oncologist',
    title: 'Head & Neck Surgical Oncologist',
    category: 'Tertiary Cancer Surgery & Reconstruction',
    description: 'Malignancy resection, sentinel lymph node biopsy, microvascular flap reconstructive surgery',
    badge: 'Onco Surgery',
    badgeColor: 'bg-[#ede9fe] text-[#6d28d9]',
    icon: 'surgery',
    keywords: ['surgical oncologist', 'cancer surgery', 'oncologist', 'oncology', 'tumor', 'resection', 'mch']
  },
  {
    id: 'oral-pathologist',
    name: 'Oral & Maxillofacial Pathologist',
    title: 'Oral & Maxillofacial Pathologist (Biopsy)',
    category: 'Histopathology & Tissue Diagnostics',
    description: 'Formal punch/incisional biopsy processing, dysplasia grading, histopathological confirmation',
    badge: 'Biopsy Lab',
    badgeColor: 'bg-[#fee2e2] text-[#b91c1c]',
    icon: 'pathology',
    keywords: ['pathologist', 'oral pathology', 'biopsy', 'tissue', 'histopathology', 'dysplasia', 'staining']
  },
  {
    id: 'screening-clinic',
    name: 'Oral Cancer Screening Clinic (Agency CHC)',
    title: 'Oral Cancer Screening Clinic (Agency CHC)',
    category: 'Government Primary Health Care Hub',
    description: 'Free AI-assisted screening camps, ITDA mobile telemedicine van & tribal referral hospital',
    badge: 'Govt Free Care',
    badgeColor: 'bg-[#def7ec] text-[#03543f]',
    icon: 'clinic',
    keywords: ['screening clinic', 'clinic', 'hospital', 'chc', 'paderu', 'araku', 'government', 'free']
  }
];

interface SpecialtySearchPickerProps {
  value: string;
  onChange: (query: string) => void;
  onSelectSpecialty: (specialtyName: string) => void;
  placeholder?: string;
  className?: string;
}

export const SpecialtySearchPicker: React.FC<SpecialtySearchPickerProps> = ({
  value,
  onChange,
  onSelectSpecialty,
  placeholder = 'Search doctors, clinics, hospitals, biopsy labs (e.g. leukoplakia)...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SpecialtyItem) => {
    onChange(item.name);
    setIsOpen(false);
    onSelectSpecialty(item.name);
  };

  // Filter list by user query
  const filteredSpecialties = SPECIALTY_LIST.filter((item) => {
    if (!value || value.trim() === '') return true;
    const q = value.toLowerCase().trim();
    return (
      item.name.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.includes(q))
    );
  });

  const getIcon = (type: SpecialtyItem['icon'], isSelected: boolean) => {
    const iconClass = `w-4 h-4 shrink-0 ${isSelected ? 'text-[#087F8C]' : 'text-[#787887]'}`;
    switch (type) {
      case 'dentist':
        return <Smile className={iconClass} />;
      case 'ent':
        return <Activity className={iconClass} />;
      case 'omr':
        return <Scan className={iconClass} />;
      case 'surgery':
        return <Stethoscope className={iconClass} />;
      case 'pathology':
        return <Microscope className={iconClass} />;
      case 'clinic':
        return <Building2 className={iconClass} />;
    }
  };

  return (
    <div ref={containerRef} className={`relative flex-1 ${className}`}>
      
      {/* Search Input Field */}
      <div className="flex items-center w-full">
        <Search className="w-4 h-4 text-[#737382] mr-2 shrink-0" />
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onFocus={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full text-xs text-[#414146] bg-transparent focus:outline-none placeholder:text-[#737382]"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />

        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="p-1 text-[#787887] hover:text-[#414146] rounded-full hover:bg-[#e0e0e5]/50 transition-colors mr-1"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Floating Suggestions Dropdown */}
      {isOpen && (
        <div 
          className="absolute left-0 top-full mt-2 w-full min-w-[320px] sm:min-w-[420px] max-w-[95vw] bg-white rounded-xl shadow-2xl border border-[#e0e0e5] z-50 overflow-hidden font-sans text-xs animate-fadeIn"
          role="listbox"
        >
          {/* Dropdown Header */}
          <div className="p-2.5 bg-[#f8f9fb] border-b border-[#f0f0f5] flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#787887] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#199fd9]" />
              Select Specialty / Health Service
            </span>
            <span className="text-[10px] text-[#199fd9] font-bold">
              Instant Appointment
            </span>
          </div>

          {/* Specialty Items List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-[#f0f0f5]">
            {filteredSpecialties.map((item) => {
              const isSelected = value.toLowerCase() === item.name.toLowerCase();
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`p-3 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                    isSelected ? 'bg-[#e6f4f6]' : 'hover:bg-[#f8f9fb]'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#f0f0f5] flex items-center justify-center shrink-0">
                      {getIcon(item.icon, isSelected)}
                    </div>
                    
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong className="text-xs font-bold text-[#414146]">
                          {item.name}
                        </strong>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-[#737382] mt-0.5 leading-snug line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center shrink-0 mt-1">
                    {isSelected ? (
                      <Check className="w-4 h-4 text-[#087F8C]" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-[#b4b4be] hover:text-[#414146]" />
                    )}
                  </div>
                </div>
              );
            })}

            {filteredSpecialties.length === 0 && (
              <div className="p-6 text-center text-[#787887]">
                <p className="font-bold text-xs">No matching specialty found</p>
                <p className="text-[11px] mt-1">
                  Try searching for <span className="text-[#199fd9] font-bold cursor-pointer" onClick={() => onChange('Dentist')}>Dentist</span>, <span className="text-[#199fd9] font-bold cursor-pointer" onClick={() => onChange('ENT Specialist')}>ENT Specialist</span>, or <span className="text-[#199fd9] font-bold cursor-pointer" onClick={() => onChange('Oral Medicine and Radiology Specialist')}>Oral Medicine</span>
                </p>
              </div>
            )}
          </div>

          {/* Quick Select Bottom Bar */}
          <div className="p-2 bg-[#f0f0f5]/80 border-t border-[#e0e0e5] flex flex-wrap items-center justify-between gap-2 px-3 text-[11px]">
            <span className="text-[#787887] font-semibold">Quick Filters:</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleSelect(SPECIALTY_LIST[0])}
                className="px-2 py-0.5 rounded-full bg-white border border-[#e0e0e5] text-[#414146] font-bold hover:border-[#199fd9] hover:text-[#199fd9] text-[10px] transition-colors"
              >
                Dentist
              </button>
              <button
                type="button"
                onClick={() => handleSelect(SPECIALTY_LIST[1])}
                className="px-2 py-0.5 rounded-full bg-white border border-[#e0e0e5] text-[#414146] font-bold hover:border-[#199fd9] hover:text-[#199fd9] text-[10px] transition-colors"
              >
                ENT
              </button>
              <button
                type="button"
                onClick={() => handleSelect(SPECIALTY_LIST[2])}
                className="px-2 py-0.5 rounded-full bg-white border border-[#e0e0e5] text-[#414146] font-bold hover:border-[#199fd9] hover:text-[#199fd9] text-[10px] transition-colors"
              >
                Oral Medicine (OMR)
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
