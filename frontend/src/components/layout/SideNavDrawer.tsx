import React, { useState } from 'react';
import { 
  FlaskConical,
  X, 
  Search, 
  Video, 
  Stethoscope, 
  Smartphone, 
  BookOpen, 
  FileText, 
  Pill, 
  Building2, 
  CreditCard, 
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { PageId } from '../../types';

interface SideNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  currentPage: PageId;
}

export const SideNavDrawer: React.FC<SideNavDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentPage
}) => {
  const [showAppModal, setShowAppModal] = useState(false);

  if (!isOpen) return null;

  const handleItemClick = (page: PageId) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Semi-transparent dark backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 transition-opacity backdrop-blur-[1px] animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer panel from the left */}
      <aside 
        className="fixed top-0 left-0 bottom-0 w-[84%] sm:w-[380px] max-w-sm bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out overflow-y-auto font-sans"
        role="dialog"
        aria-modal="true"
        aria-label="Side navigation menu"
      >
        {/* Drawer Header with ONLY Aarogya Drishti */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#f0f0f5] sticky top-0 bg-white z-10">
          <button 
            onClick={onClose}
            className="p-1.5 -ml-1 text-[#414146] hover:bg-[#f0f0f5] rounded-full transition-colors focus:outline-none"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Aarogya Drishti Logo Brand Only */}
          <div className="flex items-center gap-2 select-none">
            <div className="w-7 h-7 rounded-lg bg-[#087F8C] text-white flex items-center justify-center font-black shadow-xs">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-[#087F8C] tracking-tight font-heading">
                Aarogya Drishti
              </span>
              <p className="text-[10px] text-[#787887] font-semibold leading-none">
                Oral Health & Clinical Care
              </p>
            </div>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 px-4 py-3 space-y-1 text-[#414146]">

          {/* 1. Aarogya Drishti PLUS */}
          <div 
            onClick={() => handleItemClick('screening')}
            className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[15px] text-[#414146]">Aarogya Drishti</span>
                <span className="bg-[#9d3cb4] text-white text-[10px] font-black px-1.5 py-0.5 rounded tracking-wider uppercase">
                  PLUS
                </span>
              </div>
              <p className="text-xs text-[#787887] mt-0.5">
                Health plans for you and your family
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          <div className="border-b border-[#f0f0f5] my-2" />

          {/* 2. Find Doctors */}
          <div 
            onClick={() => handleItemClick('find-specialist')}
            className={`flex items-center justify-between p-2.5 -mx-2 rounded-lg cursor-pointer transition-colors group ${
              currentPage === 'find-specialist' ? 'bg-[#f0f0f5]' : 'hover:bg-[#f8f9fb]'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Search className="w-5 h-5 text-[#787887]" />
              <div className="text-[14px]">
                <strong className="font-bold text-[#414146]">Find Doctors</strong>
                <span className="text-[#787887] font-normal text-xs ml-1.5">- Book an appointment</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* 3. Video Consult */}
          <div 
            onClick={() => handleItemClick('video-consult')}
            className={`flex items-center justify-between p-2.5 -mx-2 rounded-lg cursor-pointer transition-colors group ${
              currentPage === 'video-consult' ? 'bg-[#f0f0f5]' : 'hover:bg-[#f8f9fb]'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Video className="w-5 h-5 text-[#787887]" />
              <div className="text-[14px]">
                <strong className="font-bold text-[#414146]">Video Consult</strong>
                <span className="text-[#787887] font-normal text-xs ml-1.5">- Consult top doctors</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* Lab Tests */}
          <div 
            onClick={() => handleItemClick('lab-tests')}
            className={`flex items-center justify-between p-2.5 -mx-2 rounded-lg cursor-pointer transition-colors group ${
              currentPage === 'lab-tests' ? 'bg-[#f0f0f5]' : 'hover:bg-[#f8f9fb]'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <FlaskConical className="w-5 h-5 text-[#787887]" />
              <div className="text-[14px]">
                <strong className="font-bold text-[#414146]">Lab Tests</strong>
                <span className="text-[#787887] font-normal text-xs ml-1.5">- Book health tests online</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* 4. Surgeries */}
          <div 
            onClick={() => handleItemClick('about')}
            className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3.5">
              <Stethoscope className="w-5 h-5 text-[#787887]" />
              <div className="text-[14px]">
                <strong className="font-bold text-[#414146]">Surgeries</strong>
                <span className="text-[#787887] font-normal text-xs ml-1.5">- Expert surgical care</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* 5. Download the app Banner Box */}
          <div 
            onClick={() => setShowAppModal(true)}
            className="bg-[#f0f0f5] hover:bg-[#e8e8ee] p-3.5 rounded-xl flex items-center gap-3.5 my-3 cursor-pointer transition-all border border-[#e0e0e5]/60 group"
          >
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-xs border border-[#e0e0e5]">
              <Smartphone className="w-6 h-6 text-[#787887] group-hover:text-[#199fd9] transition-colors" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#414146]">
                Download the app
              </p>
              <p className="text-xs text-[#787887]">
                Faster & complete healthcare experience
              </p>
            </div>
          </div>

          {/* 6. Read health articles */}
          <div 
            onClick={() => handleItemClick('education')}
            className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3.5">
              <BookOpen className="w-5 h-5 text-[#787887]" />
              <span className="text-[14px] text-[#414146] font-normal">Read health articles</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* 7. View medical records */}
          <div 
            onClick={() => handleItemClick('patient-dashboard')}
            className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3.5">
              <FileText className="w-5 h-5 text-[#787887]" />
              <span className="text-[14px] text-[#414146] font-normal">View medical records</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* 8. Read about medicines */}
          <div 
            onClick={() => handleItemClick('medicines')}
            className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3.5">
              <Pill className="w-5 h-5 text-[#787887]" />
              <span className="text-[14px] text-[#414146] font-normal">Read about medicines</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* 9. Aarogya Drishti for Providers */}
          <div 
            onClick={() => handleItemClick('clinician-dashboard')}
            className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3.5">
              <Building2 className="w-5 h-5 text-[#787887]" />
              <span className="text-[14px] text-[#414146] font-normal">Aarogya Drishti for Providers</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* 10. ABDM */}
          <div 
            onClick={() => handleItemClick('patient-dashboard')}
            className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <div className="flex items-center gap-3.5">
              <CreditCard className="w-5 h-5 text-[#787887]" />
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-[#414146] font-normal">ABDM</span>
                <span className="text-[10px] bg-[#10b981]/15 text-[#10b981] font-bold px-1.5 py-0.2 rounded">
                  Ayushman Bharat
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          <div className="border-b border-[#f0f0f5] my-2" />

          {/* Aarogya Drishti Specialized AI Screening Section */}
          <div className="pt-1 pb-1">
            <p className="text-[11px] font-bold text-[#787887] uppercase tracking-wider px-1 mb-1">
              Oral Cancer Screening Care
            </p>

            <div 
              onClick={() => handleItemClick('screening')}
              className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#e6f4f6] cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <ShieldCheck className="w-5 h-5 text-[#087F8C]" />
                <div className="text-[14px]">
                  <strong className="font-bold text-[#087F8C]">AI Oral Screening</strong>
                  <span className="text-xs text-[#087F8C] block">Free lesion risk triage</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#087F8C] group-hover:translate-x-0.5 transition-transform" />
            </div>

            <div 
              onClick={() => handleItemClick('warning-signs')}
              className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <AlertCircle className="w-5 h-5 text-[#e11d48]" />
                <span className="text-[14px] text-[#414146] font-normal">14-Day Warning Signs</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
            </div>

            <div 
              onClick={() => handleItemClick('how-it-works')}
              className="flex items-center justify-between p-2.5 -mx-2 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <HelpCircle className="w-5 h-5 text-[#787887]" />
                <span className="text-[14px] text-[#414146] font-normal">How It Works</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
            </div>
          </div>

          <div className="border-b border-[#f0f0f5] my-2" />

          {/* 11. Data security */}
          <div 
            onClick={() => handleItemClick('privacy')}
            className="flex items-center justify-between py-2.5 px-1 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <span className="text-[14px] text-[#414146] font-normal">Data security</span>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

          {/* 12. Help */}
          <div 
            onClick={() => handleItemClick('contact')}
            className="flex items-center justify-between py-2.5 px-1 rounded-lg hover:bg-[#f8f9fb] cursor-pointer transition-colors group"
          >
            <span className="text-[14px] text-[#414146] font-normal">Help</span>
            <ChevronRight className="w-4 h-4 text-[#b4b4be] group-hover:text-[#414146] transition-colors" />
          </div>

        </div>

        {/* Drawer Bottom Action: Login / Signup */}
        <div className="p-4 border-t border-[#f0f0f5] bg-white sticky bottom-0">
          <button
            onClick={() => handleItemClick('signin')}
            className="w-full py-2.5 border border-[#b4b4be] rounded-md text-center font-bold text-xs text-[#414146] hover:bg-[#f0f0f5] hover:border-[#787887] transition-all"
          >
            Login / Signup
          </button>
        </div>
      </aside>

      {/* App Download Modal */}
      {showAppModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            <button 
              onClick={() => setShowAppModal(false)}
              className="absolute top-4 right-4 text-[#787887] hover:text-[#414146]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-2xl bg-[#e6f4f6] text-[#087F8C] flex items-center justify-center mx-auto mb-3">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#414146]">Download Aarogya Drishti</h3>
            <p className="text-xs text-[#787887] mt-1 mb-4">
              Get 24x7 instant AI oral cancer screening, appointments & telemedicine right from your phone.
            </p>
            <div className="p-4 bg-[#f0f0f5] rounded-xl flex items-center justify-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
              <span className="text-xs font-bold text-[#414146]">PWA & Mobile Ready (Android & iOS)</span>
            </div>
            <button
              onClick={() => setShowAppModal(false)}
              className="w-full py-2.5 bg-[#087F8C] text-white font-bold text-xs rounded-lg hover:bg-[#066570] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
