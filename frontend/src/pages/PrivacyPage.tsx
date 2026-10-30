import React from 'react';
import { Shield, Lock, FileText, CheckCircle2, UserCheck, AlertCircle } from 'lucide-react';
import { PageId, Language } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface PrivacyPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      <section className="bg-white border-b border-[#DCE8E9] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="info" className="mb-3">Data Governance Standards</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#18313B] font-heading">
            Privacy & Health Data Protection Policy
          </h1>
          <p className="text-[#647681] text-base mt-3 max-w-3xl leading-relaxed">
            Aarogya Drishti is built in strict adherence to the Indian Digital Personal Data Protection Act (DPDP Act 2023) and DISHA (Digital Information Security in Healthcare Act).
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6 text-[#087F8C]" />
            <h3 className="text-lg font-bold text-[#18313B]">1. Data Minimization & Purpose Limitation</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
            We collect only the bare minimum data necessary to perform visual mucosal screening (anonymized age bracket, symptom duration, and the localized oral photograph). We do not request Aadhaar numbers, financial credentials, or unnecessary personal identifiers during screening.
          </p>
        </Card>

        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#2563A6]" />
            <h3 className="text-lg font-bold text-[#18313B]">2. Private Image Storage & Encryption</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
            All submitted oral cavity images are encrypted both in transit (TLS 1.3) and at rest (AES-256). Photographs are housed in air-gapped private storage buckets. <strong>No public URLs exist</strong>; access is restricted through role-based server-side authentication with short-lived signed tokens.
          </p>
        </Card>

        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-6 h-6 text-[#237A57]" />
            <h3 className="text-lg font-bold text-[#18313B]">3. Patient Rights: Access, Correction, and Deletion</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
            Under DPDP Act 2023, every user has the absolute right to request an immediate, irreversible wipe of their screening history and uploaded photographs. A dedicated "Request Data Deletion" mechanism is available inside the patient dashboard and through our Data Protection Officer.
          </p>
        </Card>

        <Card className="p-8 space-y-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-[#A96A12]" />
            <h3 className="text-lg font-bold text-[#18313B]">4. Research Data Anonymization Standards</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
            Data used for model validation is completely decoupled from patient identifiers, stripped of facial metadata, and governed under institutional ethics review board (IRB) protocols. No personal images are sold or shared with commercial advertising entities.
          </p>
        </Card>

      </main>
    </div>
  );
};
