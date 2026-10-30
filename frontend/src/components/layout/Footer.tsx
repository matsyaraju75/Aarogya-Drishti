import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import { PageId, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <footer className="bg-[#28328c] text-white pt-14 pb-8 border-t border-[#1b2361] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Disclaimer Highlight */}
        <div className="bg-[#1e2570] rounded-xl p-5 border border-white/15 mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#b8e7d0] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-bold text-xs tracking-wider uppercase">
                  {t.disclaimerBannerTitle}
                </h4>
                <p className="text-white/80 text-xs mt-1 max-w-4xl leading-relaxed">
                  {t.disclaimerNotice}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('warning-signs')}
              className="text-xs text-[#14bef0] hover:text-white font-bold underline shrink-0 flex items-center gap-1"
            >
              Learn More <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 5-Column Directory Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10 text-xs">
          
          {/* Col 1: Aarogya Drishti */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Aarogya Drishti</h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('education')} className="hover:text-white transition-colors">Oral Health Blog</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Careers</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Press</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
            </ul>
          </div>

          {/* Col 2: For Patients */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">For Patients</h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => onNavigate('find-specialist')} className="hover:text-white transition-colors">Search for Doctors</button></li>
              <li><button onClick={() => onNavigate('find-specialist')} className="hover:text-white transition-colors">Search for Clinics</button></li>
              <li><button onClick={() => onNavigate('find-specialist')} className="hover:text-white transition-colors">Search for Hospitals</button></li>
              <li><button onClick={() => onNavigate('screening')} className="hover:text-white transition-colors font-bold text-[#14bef0]">Free AI Oral Screening</button></li>
              <li><button onClick={() => onNavigate('patient-dashboard')} className="hover:text-white transition-colors">Patient Health Vault</button></li>
            </ul>
          </div>

          {/* Col 3: For Doctors */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">For Doctors</h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => onNavigate('clinician-dashboard')} className="hover:text-white transition-colors font-bold text-[#b8e7d0]">Clinician Triage Console</button></li>
              <li><button onClick={() => onNavigate('register')} className="hover:text-white transition-colors">Doctor Profile Verification</button></li>
              <li><button onClick={() => onNavigate('find-specialist')} className="hover:text-white transition-colors">Telemedicine Consult</button></li>
              <li><button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors">Biopsy Assessment Protocol</button></li>
            </ul>
          </div>

          {/* Col 4: For Hospitals */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">For Hospitals</h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Hospital Pilot Program</button></li>
              <li><button onClick={() => onNavigate('admin-dashboard')} className="hover:text-white transition-colors">Admin Governance Console</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">DISHA & DPDP Standards</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">Aarogyasri Empanelment</button></li>
            </ul>
          </div>

          {/* Col 5: Governance & Helplines */}
          <div>
            <h4 className="font-bold text-white text-sm mb-3">Emergency & Legal</h4>
            <ul className="space-y-2 text-white/70">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms & Conditions</button></li>
              <li className="pt-2 text-white/90">
                <span className="text-[#b8e7d0] font-bold block">National Cancer Helpline:</span>
                <span className="font-mono text-sm font-bold">1800-22-1951</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Brand Mark */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm text-white">Aarogya Drishti</span>
            <span>• Copyright © 2026. All rights reserved. Strictly non-diagnostic preliminary screening platform.</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => onNavigate('privacy')} className="hover:underline">Privacy</button>
            <button onClick={() => onNavigate('terms')} className="hover:underline">Terms</button>
            <button onClick={() => onNavigate('contact')} className="hover:underline">Security</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
