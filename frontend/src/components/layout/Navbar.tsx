import React, { useState } from 'react';
import { Menu, ShieldCheck } from 'lucide-react';
import { PageId, Language } from '../../types';
import { LanguageSelector } from '../ui/LanguageSelector';
import { SideNavDrawer } from './SideNavDrawer';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  language,
  onLanguageChange
}) => {
  const [sideNavOpen, setSideNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-[#e0e0e5] font-sans">
        {/* Global Top Utility Bar */}
        <div className="bg-[#28328c] text-white text-[11px] py-1.5 px-4 sm:px-8 flex justify-between items-center tracking-wide">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-[#b8e7d0]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              AAROGYA DRISHTI CONNECTED CARE
            </span>
            <span className="hidden md:inline text-white/70">
              | In Partnership with Govt. Dental Colleges & Regional Cancer Centres
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-white/90">
              National Cancer Helpline: <strong>1800-22-1951</strong> (24x7 Free)
            </span>
            <LanguageSelector currentLang={language} onLanguageChange={onLanguageChange} />
          </div>
        </div>

        {/* Main Navigation Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Left section: Hamburger Side Nav Trigger + Brand Identity */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Hamburger Button to open Side Nav Drawer */}
              <button
                onClick={() => setSideNavOpen(true)}
                className="p-2 -ml-2 text-[#414146] hover:bg-[#f0f0f5] rounded-lg transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#199fd9]"
                aria-label="Open side navigation menu"
                title="Open menu"
              >
                <Menu className="w-6 h-6 text-[#414146]" />
              </button>

              {/* Aarogya Drishti Brand Identity Only */}
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2.5 text-left focus:outline-none group"
                aria-label="Aarogya Drishti Home"
              >
                <div className="w-9 h-9 rounded-xl bg-[#087F8C] text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-black text-[#087F8C] tracking-tight font-heading">
                    Aarogya Drishti
                  </span>
                  <p className="text-[10px] text-[#787887] font-semibold tracking-wide">
                    Oral Cancer Screening & Triage Platform
                  </p>
                </div>
              </button>

              {/* Primary Navigation Links matching screenshot */}
              <nav className="hidden md:flex items-center gap-1 text-[13px] font-bold text-[#414146] ml-4">
                <button
                  onClick={() => onNavigate('find-specialist')}
                  className={`px-3 py-2 rounded-md transition-all relative ${
                    currentPage === 'find-specialist' ? 'text-[#199fd9] border-b-2 border-[#14bef0] pb-1.5' : 'hover:text-[#199fd9]'
                  }`}
                >
                  Find Doctors
                </button>

                <button
                  onClick={() => onNavigate('video-consult')}
                  className={`px-3 py-2 rounded-md transition-all relative ${
                    currentPage === 'video-consult' ? 'text-[#199fd9] border-b-2 border-[#14bef0] pb-1.5' : 'hover:text-[#199fd9]'
                  }`}
                >
                  Video Consult
                </button>

                <button
                  onClick={() => onNavigate('medicines')}
                  className={`px-3 py-2 rounded-md transition-all relative ${
                    currentPage === 'medicines' ? 'text-[#199fd9] border-b-2 border-[#14bef0] pb-1.5' : 'hover:text-[#199fd9]'
                  }`}
                >
                  Medicines
                </button>

                <button
                  onClick={() => onNavigate('lab-tests')}
                  className={`px-3 py-2 rounded-md transition-all relative ${
                    currentPage === 'lab-tests' ? 'text-[#199fd9] border-b-2 border-[#14bef0] pb-1.5' : 'hover:text-[#199fd9]'
                  }`}
                >
                  Lab Tests
                </button>

                <button
                  onClick={() => onNavigate('surgeries')}
                  className={`px-3 py-2 rounded-md transition-all relative ${
                    currentPage === 'surgeries' ? 'text-[#199fd9] border-b-2 border-[#14bef0] pb-1.5' : 'hover:text-[#199fd9]'
                  }`}
                >
                  Surgeries
                </button>
              </nav>
            </div>

            {/* Right Navigation Actions */}
            <div className="flex items-center gap-3 text-[13px] font-semibold text-[#787887]">
              {/* Login / Signup Button */}
              <button
                onClick={() => onNavigate('signin')}
                className="px-4 py-2 border border-[#b4b4be] rounded hover:border-[#787887] text-[#414146] font-bold text-xs hover:bg-[#f0f0f5] transition-all"
              >
                Login / Signup
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Slide-Out Side Nav Drawer */}
      <SideNavDrawer
        isOpen={sideNavOpen}
        onClose={() => setSideNavOpen(false)}
        onNavigate={onNavigate}
        currentPage={currentPage}
      />
    </>
  );
};
