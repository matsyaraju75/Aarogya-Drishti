import React from 'react';
import { ShieldCheck, HeartPulse, Award, Users, Cpu, FileCheck2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PageId, Language } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      <section className="bg-white border-b border-[#DCE8E9] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="info" className="mb-3">Mission & Architecture</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#18313B] font-heading">
            About Aarogya Drishti
          </h1>
          <p className="text-[#647681] text-base mt-3 max-w-3xl leading-relaxed">
            Bridging the oral cancer diagnostic gap across India through ethical, evidence-based computer vision and clinical triage support.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Our Purpose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <Badge variant="success">The Healthcare Challenge</Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-[#18313B] font-heading">
              Why Oral Health Screening Cannot Wait
            </h2>
            <p className="text-sm sm:text-base text-[#647681] leading-relaxed">
              India accounts for nearly one-third of the global burden of oral cancer. Due to widespread habits involving smokeless tobacco, gutka, and areca nut, millions develop potentially malignant mucosal lesions. Unfortunately, over 70% of patients present in advanced stages (Stage III and IV), where 5-year survival drops dramatically below 50%.
            </p>
            <p className="text-sm sm:text-base text-[#647681] leading-relaxed">
              <strong>Aarogya Drishti</strong> was conceptualized to empower grassroots healthcare workers, dentists, and patients with instant preliminary image triage, flagging suspicious lesions early so patients reach tertiary specialists when treatment is most effective.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-[#087F8C] to-[#075B66] text-white p-8 rounded-3xl shadow-soft">
            <h3 className="text-xl font-bold font-heading mb-4 text-[#B8E7D0]">Our Guiding Commitments</h3>
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B8E7D0] shrink-0 mt-0.5" />
                <span><strong>No False Reassurance:</strong> We never equate an absence of detected lesions with an absolute guarantee of cancer freedom.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B8E7D0] shrink-0 mt-0.5" />
                <span><strong>Strict Non-Diagnostic Scope:</strong> We never simulate artificial cancer stages or claim autonomous diagnostic capability.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B8E7D0] shrink-0 mt-0.5" />
                <span><strong>Human-in-the-Loop Validation:</strong> Attending clinical specialists review images before histological staging.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Architecture Pillars */}
        <div>
          <h2 className="text-2xl font-black text-[#18313B] font-heading mb-6">
            Architectural Separation & Data Integrity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Cpu className="w-8 h-8 text-[#087F8C] mb-3" />
              <h4 className="font-bold text-base text-[#18313B] mb-2">Isolated Inference API</h4>
              <p className="text-xs text-[#647681] leading-relaxed">
                The machine-learning pipeline runs in a quarantined microservice container with strict input bounds, preventing data leaks and ensuring transparent model versioning.
              </p>
            </Card>

            <Card className="p-6">
              <ShieldCheck className="w-8 h-8 text-[#2563A6] mb-3" />
              <h4 className="font-bold text-base text-[#18313B] mb-2">Zero Public Bucket URLs</h4>
              <p className="text-xs text-[#647681] leading-relaxed">
                All patient photographs are stored in encrypted private object storage. Temporary, pre-signed authorized tokens ensure access only for registered clinicians.
              </p>
            </Card>

            <Card className="p-6">
              <FileCheck2 className="w-8 h-8 text-[#237A57] mb-3" />
              <h4 className="font-bold text-base text-[#18313B] mb-2">Audit-Logged Triage</h4>
              <p className="text-xs text-[#647681] leading-relaxed">
                Every screening evaluation, image quality score, and clinical review annotation is cryptographically timestamped in an append-only audit register.
              </p>
            </Card>
          </div>
        </div>

      </main>
    </div>
  );
};
