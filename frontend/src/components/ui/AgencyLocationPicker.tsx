import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Crosshair, 
  ChevronDown, 
  Building2, 
  Check, 
  Search, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { 
  AGENCY_PRIMARY_LOCATIONS, 
  ALLURI_AGENCY_HOSPITALS, 
  LocationItem 
} from '../../data/agencyLocations';

interface AgencyLocationPickerProps {
  value: string;
  onChange: (locationName: string) => void;
  className?: string;
  dropdownClassName?: string;
}

export const AgencyLocationPicker: React.FC<AgencyLocationPickerProps> = ({
  value,
  onChange,
  className = '',
  dropdownClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionMessage, setDetectionMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // HTML5 Geolocation with fallback to Alluri Agency location
  const handleUseMyLocation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetecting(true);
    setDetectionMessage('Detecting GPS coordinates...');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setIsDetecting(false);

          // If in proximity to Paderu / Araku / North Coastal AP:
          // Roughly lat 17.5 - 18.5, lon 82.0 - 83.5
          if (latitude >= 18.0 && latitude <= 18.5 && longitude <= 83.0) {
            const detected = 'Paderu (ITDA Tribal Agency HQ)';
            onChange(detected);
            localStorage.setItem('aarogya_selected_location', detected);
            setDetectionMessage('Detected: Paderu, ASR District');
          } else {
            const detected = 'Visakhapatnam (KGH / AMC Oncology Hub)';
            onChange(detected);
            localStorage.setItem('aarogya_selected_location', detected);
            setDetectionMessage('Detected: Visakhapatnam Medical Hub');
          }

          setTimeout(() => {
            setIsOpen(false);
            setDetectionMessage(null);
          }, 800);
        },
        (_error) => {
          setIsDetecting(false);
          // Fallback to Paderu (District HQ)
          const fallback = 'Paderu';
          onChange(fallback);
          localStorage.setItem('aarogya_selected_location', fallback);
          setDetectionMessage('Defaulting to Paderu (ASR District HQ)');
          setTimeout(() => {
            setIsOpen(false);
            setDetectionMessage(null);
          }, 900);
        },
        { timeout: 5000 }
      );
    } else {
      setIsDetecting(false);
      const fallback = 'Paderu';
      onChange(fallback);
      localStorage.setItem('aarogya_selected_location', fallback);
      setIsOpen(false);
    }
  };

  const handleSelect = (item: LocationItem) => {
    onChange(item.name);
    localStorage.setItem('aarogya_selected_location', item.name);
    setIsOpen(false);
    setFilterQuery('');
  };

  // Filter primary locations
  const filteredPrimary = AGENCY_PRIMARY_LOCATIONS.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.details.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // Filter agency hospitals
  const filteredHospitals = ALLURI_AGENCY_HOSPITALS.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.details.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      
      {/* Trigger Button / Input Display */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer w-full text-left"
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <MapPin className="w-4 h-4 text-[#199fd9] shrink-0" />
        
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#414146] truncate">
            {value || 'Select Location / Hospital'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleUseMyLocation}
          title="Use my current GPS location"
          className="p-1 rounded text-[#199fd9] hover:bg-[#e0e0e5]/50 shrink-0 text-[10px] font-bold flex items-center gap-1 transition-colors"
        >
          <Crosshair className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin text-[#10b981]' : ''}`} />
        </button>

        <ChevronDown className={`w-3.5 h-3.5 text-[#737382] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Floating Dropdown Panel */}
      {isOpen && (
        <div 
          className={`absolute left-0 top-full mt-2 w-80 sm:w-96 max-w-[92vw] bg-white rounded-xl shadow-2xl border border-[#e0e0e5] z-50 overflow-hidden font-sans text-xs animate-fadeIn ${dropdownClassName}`}
          role="listbox"
        >
          {/* Internal Quick Search Bar */}
          <div className="p-2.5 border-b border-[#f0f0f5] bg-[#fafafa] flex items-center gap-2">
            <Search className="w-4 h-4 text-[#787887] shrink-0" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search Araku, Paderu, CHC, Hospital..."
              className="w-full bg-transparent text-xs text-[#414146] focus:outline-none placeholder:text-[#a0a0a8]"
              autoFocus
            />
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-[#f0f0f5]">

            {/* 1. "Use my current location" Action Option */}
            <div 
              onClick={handleUseMyLocation}
              className="p-3 bg-[#f0f9ff] hover:bg-[#e0f2fe] cursor-pointer transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#199fd9] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Crosshair className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#199fd9] text-xs">Use my current location</span>
                    <Sparkles className="w-3 h-3 text-[#199fd9]" />
                  </div>
                  <p className="text-[11px] text-[#737382]">
                    {detectionMessage || 'Detect GPS (Paderu / Araku / ASR Agency / Vizag)'}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-[#199fd9]/10 text-[#199fd9] px-2 py-0.5 rounded">
                GPS
              </span>
            </div>

            {/* 2. Primary Locations in Alphabetical Order */}
            {filteredPrimary.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1 text-[10px] font-extrabold text-[#787887] uppercase tracking-wider flex items-center justify-between">
                  <span>Primary Locations (Alphabetical)</span>
                  <span className="text-[9px] text-[#199fd9]">A → Z</span>
                </div>

                <div className="space-y-0.5 mt-1">
                  {filteredPrimary.map((item) => {
                    const isSelected = value === item.name;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className={`p-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                          isSelected ? 'bg-[#e6f4f6] text-[#087F8C]' : 'hover:bg-[#f8f9fb] text-[#414146]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#087F8C]' : 'text-[#787887]'}`} />
                          <div className="min-w-0">
                            <p className="font-bold text-xs truncate">{item.name}</p>
                            <p className="text-[11px] text-[#787887] truncate">{item.details}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="text-[10px] bg-[#f0f0f5] text-[#787887] px-1.5 py-0.5 rounded font-semibold">
                            {item.typeBadge}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#087F8C]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Agency Hospitals in Alluri Sitharama Raju District */}
            {filteredHospitals.length > 0 && (
              <div className="p-2">
                <div className="px-2 py-1 text-[10px] font-extrabold text-[#787887] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#087F8C]" />
                    Hospitals in Agency (ASR District)
                  </span>
                  <span className="text-[9px] text-[#087F8C] font-bold">17 Facilities</span>
                </div>

                <div className="space-y-0.5 mt-1">
                  {filteredHospitals.map((hosp) => {
                    const isSelected = value === hosp.name;
                    return (
                      <div
                        key={hosp.id}
                        onClick={() => handleSelect(hosp)}
                        className={`p-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                          isSelected ? 'bg-[#e6f4f6] text-[#087F8C]' : 'hover:bg-[#f8f9fb] text-[#414146]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Building2 className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#087F8C]' : 'text-[#787887]'}`} />
                          <div className="min-w-0">
                            <p className="font-bold text-xs truncate">{hosp.name}</p>
                            <p className="text-[11px] text-[#787887] truncate">{hosp.details}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="text-[10px] bg-[#def7ec] text-[#03543f] px-1.5 py-0.5 rounded font-bold">
                            {hosp.typeBadge}
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[#087F8C]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* If no matches found */}
            {filteredPrimary.length === 0 && filteredHospitals.length === 0 && (
              <div className="p-6 text-center text-[#787887]">
                <AlertCircle className="w-6 h-6 mx-auto mb-1.5 text-[#f59e0b]" />
                <p className="font-semibold text-xs">No matching location or hospital</p>
                <p className="text-[11px] mt-0.5">Try searching "Araku", "Paderu", or "CHC"</p>
              </div>
            )}

          </div>

          {/* Bottom Footer Note */}
          <div className="p-2 bg-[#f8f9fb] border-t border-[#f0f0f5] text-[10px] text-[#787887] flex items-center justify-between px-3">
            <span>Alluri Sitharama Raju Agency Healthcare Network</span>
            <span className="font-bold text-[#10b981]">✓ Aarogyasri Free Care</span>
          </div>

        </div>
      )}

    </div>
  );
};
