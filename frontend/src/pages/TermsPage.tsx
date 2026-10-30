import React from 'react';
import { FileText, AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PageId, Language } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface TermsPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      <section className="bg-white border-b border-[#DCE8E9] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="info" className="mb-3">Clinical Legal Terms</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#18313B] font-heading">
            Terms of Use & Clinical Disclaimer
          </h1>
          <p className="text-[#647681] text-base mt-3 max-w-3xl leading-relaxed">
            Please read these terms carefully before utilizing the Aarogya Drishti oral health screening platform.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        
        <Card className="p-8 border-l-6 border-l-[#B42332]">
          <h3 className="text-lg font-bold text-[#B42332] flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" /> Non-Diagnostic Screening Nature
          </h3>
          <p className="text-xs sm:text-sm text-[#18313B] leading-relaxed">
            Aarogya Drishti is an informational and triage-support screening tool. <strong>It does not provide a definitive medical diagnosis, nor does it guarantee the absence of oral dysplasia or malignancy.</strong> A 2D smartphone photograph cannot replace clinical palpation, lymph node assessment, or surgical biopsy.
          </p>
        </Card>

        <Card className="p-8 space-y-3">
          <h3 className="text-base font-bold text-[#18313B]">1. No Doctor-Patient Relationship Established</h3>
          <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
            The use of this service does not establish a formal doctor-patient relationship with Aarogya Drishti or its software engineers. Clinical reviews must be confirmed by an independent in-person medical evaluation.
          </p>
        </Card>

        <Card className="p-8 space-y-3">
          <h3 className="text-base font-bold text-[#18313B]">2. Emergency Medical Situations</h3>
          <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
            If you are experiencing severe oral hemorrhage, acute respiratory difficulty, sudden facial swelling, or severe pain, do not wait for an online screening report. Immediately visit the emergency department of your nearest hospital or call 112/108.
          </p>
        </Card>

        <Card className="p-8 space-y-3">
          <h3 className="text-base font-bold text-[#18313B]">3. Permitted Use</h3>
          <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
            This platform is intended for public health screening, healthcare educational awareness, and authorized dental triage. Any reverse-engineering, malicious payload injection, or automated image scraping is strictly prohibited.
          </p>
        </Card>

      </main>
    </div>
  );
};
