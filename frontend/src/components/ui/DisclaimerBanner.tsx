import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface DisclaimerBannerProps {
  languageNotice?: string;
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ languageNotice, compact = false }) => {
  return (
    <div className={`w-full bg-[#FFFBF0] border-y border-[#FFE6A5] text-[#18313B] ${compact ? 'py-2 px-4 text-xs' : 'py-3 px-4 sm:px-6 text-sm'}`}>
      <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3">
        <div className="p-1 rounded-full bg-[#FFF3D0] text-[#A96A12] shrink-0 mt-0.5 sm:mt-0">
          <AlertTriangle className={compact ? "w-4 h-4" : "w-5 h-5"} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-[#8C550A] text-xs uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#087F8C]" />
            Official Clinical Disclaimer & Scope of Screening
          </p>
          <p className="text-[#3A3323] mt-0.5 text-xs sm:text-sm leading-relaxed">
            {languageNotice || "Aarogya Drishti provides preliminary AI-assisted visual screening and triage support. It DOES NOT provide a definitive diagnosis, rule out malignancy, or determine cancer stages. Clinical examination and biopsy by an oral medicine specialist or oncologist are strictly required."}
          </p>
        </div>
      </div>
    </div>
  );
};
