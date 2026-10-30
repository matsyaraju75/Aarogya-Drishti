import React from 'react';
import { 
  ShieldAlert, 
  Camera, 
  Cpu, 
  FileCheck2, 
  Stethoscope, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  ShieldCheck,
  Eye,
  Sliders,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { PageId, Language } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface HowItWorksPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      
      <DisclaimerBanner />

      {/* Header Banner */}
      <section className="bg-white border-b border-[#DCE8E9] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="info" className="mb-3">Clinical Screening Architecture</Badge>
            <h1 className="text-3xl sm:text-4xl font-black text-[#18313B] font-heading">
              The 6-Step Clinical Screening & Assessment Protocol
            </h1>
            <p className="text-[#647681] text-base mt-3 leading-relaxed">
              Aarogya Drishti is engineered to assist healthcare workers, patients, and dental clinics in identifying visible mucosal abnormalities early. Below is the end-to-end clinical workflow and technical methodology.
            </p>
          </div>
        </div>
      </section>

      {/* Distinction Table: Screening vs Diagnosis */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-[#FFFBF0] border border-[#FFE6A5] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-[#A96A12] shrink-0 mt-0.5" />
            <div className="w-full">
              <h3 className="text-sm font-bold text-[#8C550A] uppercase tracking-wide">
                Critical Distinction: AI Visual Screening vs. Medical Diagnosis
              </h3>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-white p-4 rounded-xl border border-[#FFE6A5]">
                  <p className="font-bold text-[#087F8C] flex items-center gap-1.5 mb-1.5">
                    <Sliders className="w-4 h-4" /> What Aarogya Drishti Does (Screening)
                  </p>
                  <ul className="space-y-1.5 text-[#3A3323] list-disc list-inside">
                    <li>Screens digital photographs for visible surface abnormalities (erythroplakia, leukoplakia, ulcerations).</li>
                    <li>Evaluates photographic quality (lighting, sharpness, view).</li>
                    <li>Calculates risk indicators to facilitate timely specialist referrals.</li>
                    <li>Generates structured summary reports for attending physicians.</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#FFE6A5]">
                  <p className="font-bold text-[#B42332] flex items-center gap-1.5 mb-1.5">
                    <Stethoscope className="w-4 h-4" /> What Requires a Qualified Clinician (Diagnosis)
                  </p>
                  <ul className="space-y-1.5 text-[#3A3323] list-disc list-inside">
                    <li>Tissue biopsy, histopathological examination, and microscopic analysis.</li>
                    <li>Palpation of lymph nodes and physical bimanual examination.</li>
                    <li>Determining TNM cancer stage (Tumor, Node, Metastasis).</li>
                    <li>Prescribing chemotherapy, surgery, radiation, or final medical prognoses.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Steps Detailed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 space-y-10">
        
        {/* Step 1 */}
        <Card className="p-6 sm:p-8 border-l-8 border-l-[#087F8C]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#087F8C] text-white font-black text-base flex items-center justify-center">1</span>
              <div>
                <h3 className="text-xl font-bold text-[#18313B]">Step 1: Patient Information Intake</h3>
                <p className="text-xs text-[#647681]">Minimal data collection with privacy-by-design</p>
              </div>
            </div>
            <Badge variant="info">Patient Protection</Badge>
          </div>
          <p className="text-sm text-[#647681] leading-relaxed mb-4">
            The platform captures strictly necessary intake data required for screening relevance: patient age range, duration of symptoms (e.g. &lt; 2 weeks vs &gt; 2 weeks), and prior dental evaluations. We avoid collecting unnecessary identifying sensitive data, adhering to the Indian Digital Personal Data Protection Act (DPDP).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F5FAFA] p-4 rounded-xl text-xs text-[#18313B]">
            <div><strong>Anonymized ID:</strong> System generates pseudonymous reference ID.</div>
            <div><strong>Symptom Duration:</strong> Flags lesions &gt; 14 days automatically.</div>
            <div><strong>Informed Consent:</strong> Explicit patient acknowledgment required.</div>
          </div>
        </Card>

        {/* Step 2 */}
        <Card className="p-6 sm:p-8 border-l-8 border-l-[#087F8C]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#087F8C] text-white font-black text-base flex items-center justify-center">2</span>
              <div>
                <h3 className="text-xl font-bold text-[#18313B]">Step 2: Guided Image Capture & Quality Verification</h3>
                <p className="text-xs text-[#647681]">Real-time edge inspection to prevent false evaluations</p>
              </div>
            </div>
            <Badge variant="warning">Crucial Quality Gate</Badge>
          </div>
          <p className="text-sm text-[#647681] leading-relaxed mb-4">
            Poor camera focus or improper lighting can distort oral mucosal coloration. Before any analysis occurs, an automated pre-flight quality check evaluates:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#FFF8E1] rounded-lg border border-[#FFE082]">
              <p className="font-bold text-[#8C550A]">Sharpness / Blur</p>
              <p className="text-[#3A3323] mt-1">Rejects out-of-focus or motion-blurred captures.</p>
            </div>
            <div className="p-3 bg-[#FFF8E1] rounded-lg border border-[#FFE082]">
              <p className="font-bold text-[#8C550A]">Luminance / Shadow</p>
              <p className="text-[#3A3323] mt-1">Verifies adequate natural or torch illumination.</p>
            </div>
            <div className="p-3 bg-[#FFF8E1] rounded-lg border border-[#FFE082]">
              <p className="font-bold text-[#8C550A]">Glare / Flash</p>
              <p className="text-[#3A3323] mt-1">Flags specular saliva reflections masking lesions.</p>
            </div>
            <div className="p-3 bg-[#FFF8E1] rounded-lg border border-[#FFE082]">
              <p className="font-bold text-[#8C550A]">Field of View</p>
              <p className="text-[#3A3323] mt-1">Confirms oral cavity anatomy is in focus.</p>
            </div>
          </div>
        </Card>

        {/* Step 3 */}
        <Card className="p-6 sm:p-8 border-l-8 border-l-[#2563A6]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#2563A6] text-white font-black text-base flex items-center justify-center">3</span>
              <div>
                <h3 className="text-xl font-bold text-[#18313B]">Step 3: AI Abnormality Analysis Service</h3>
                <p className="text-xs text-[#647681]">Separately versioned inference service with documented limitations</p>
              </div>
            </div>
            <Badge variant="info">Evidence-Based</Badge>
          </div>
          <p className="text-sm text-[#647681] leading-relaxed">
            The image is delivered to a dedicated inference API with strict isolation. The model evaluates whether the visual surface exhibits features of benign stomatitis, pre-malignant lesions (leukoplakia, erythroplakia, lichen planus, oral submucous fibrosis), or suspicious persistent ulcerations. Uncertainty estimates and model version tags are recorded for full auditability.
          </p>
        </Card>

        {/* Step 4 */}
        <Card className="p-6 sm:p-8 border-l-8 border-l-[#2563A6]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#2563A6] text-white font-black text-base flex items-center justify-center">4</span>
              <div>
                <h3 className="text-xl font-bold text-[#18313B]">Step 4: Standardized Result Categorization</h3>
                <p className="text-xs text-[#647681]">Four transparent clinical triage tiers (A through D)</p>
              </div>
            </div>
            <Badge variant="success">Standardized Output</Badge>
          </div>
          <p className="text-sm text-[#647681] leading-relaxed mb-4">
            Results are displayed exclusively in 4 conservative categories to avoid false alarm or false security:
          </p>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="p-3 bg-[#E8F5E9] border border-[#C8E6C9] rounded-lg">
              <strong className="text-[#237A57]">Category A:</strong> No suspicious feature detected in the submitted image. Continue regular dental checkups; not an absolute cancer-free certificate.
            </div>
            <div className="p-3 bg-[#FFF8E1] border border-[#FFE082] rounded-lg">
              <strong className="text-[#A96A12]">Category B:</strong> Visible abnormality detected. Professional dental examination advised within 1-2 weeks.
            </div>
            <div className="p-3 bg-[#ECEFF1] border border-[#CFD8DC] rounded-lg">
              <strong className="text-[#546E7A]">Category C:</strong> Image inconclusive. Retake photo under better lighting or visit a dental professional.
            </div>
            <div className="p-3 bg-[#FFEBEE] border border-[#FFCDD2] rounded-lg">
              <strong className="text-[#B42332]">Category D:</strong> Urgent clinical review recommended according to validated referral criteria. Immediate specialist consultation urged.
            </div>
          </div>
        </Card>

        {/* Step 5 */}
        <Card className="p-6 sm:p-8 border-l-8 border-l-[#237A57]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#237A57] text-white font-black text-base flex items-center justify-center">5</span>
              <div>
                <h3 className="text-xl font-bold text-[#18313B]">Step 5: Authorized Clinical Review & Histopathology</h3>
                <p className="text-xs text-[#647681]">Human-in-the-loop specialist assessment</p>
              </div>
            </div>
            <Badge variant="success">Human In The Loop</Badge>
          </div>
          <p className="text-sm text-[#647681] leading-relaxed">
            Authorized dental clinicians and oncologists access a secure clinical dashboard. They examine high-resolution uncompressed imagery, record physical examination findings, document biopsy and pathology results, and document clinical staging only after diagnostic proof is confirmed.
          </p>
        </Card>

        {/* Step 6 */}
        <Card className="p-6 sm:p-8 border-l-8 border-l-[#237A57]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#237A57] text-white font-black text-base flex items-center justify-center">6</span>
              <div>
                <h3 className="text-xl font-bold text-[#18313B]">Step 6: Secure PDF Screening Report Generation</h3>
                <p className="text-xs text-[#647681]">Downloadable, shareable clinical documentation</p>
              </div>
            </div>
            <Badge variant="info">Clinical Documentation</Badge>
          </div>
          <p className="text-sm text-[#647681] leading-relaxed mb-4">
            The platform compiles a comprehensive, tamper-evident PDF report including the unique screening reference number, timestamp, model version, categorized findings, limitations statement, and clinician notes.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('screening')}
              leftIcon={<ShieldCheck className="w-4 h-4 text-[#B8E7D0]" />}
            >
              Experience the Screening Interface
            </Button>
          </div>
        </Card>

      </section>

    </div>
  );
};
