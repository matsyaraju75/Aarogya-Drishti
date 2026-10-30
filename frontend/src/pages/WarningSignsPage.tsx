import React from 'react';
import { 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall,
  Info
} from 'lucide-react';
import { PageId, Language } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface WarningSignsPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const WarningSignsPage: React.FC<WarningSignsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      <section className="bg-white border-b border-[#DCE8E9] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="danger" className="mb-3">Clinical Warning Consensus</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#18313B] font-heading">
            Oral Cancer Warning Signs & The 14-Day Rule
          </h1>
          <p className="text-[#647681] text-base mt-3 max-w-3xl leading-relaxed">
            Early detection transforms oral cancer survival from under 50% to over 90%. Any mucosal alteration persisting past fourteen days requires clinical evaluation by an oral medicine specialist or oncologist.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* The 14-Day Rule Callout */}
        <div className="bg-[#FFEBEE] border-2 border-[#FFCDD2] rounded-3xl p-8 text-[#18313B]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#B42332] text-white flex items-center justify-center shrink-0">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B42332]">Golden Clinical Rule</span>
                <h2 className="text-2xl font-black text-[#8F1B27] font-heading mt-0.5">
                  The Two-Week (14-Day) Diagnostic Threshold
                </h2>
                <p className="text-sm text-[#3A1418] mt-2 max-w-3xl leading-relaxed">
                  Benign aphthous ulcers, viral stomatitis, and minor traumatic bites typically heal spontaneously within 7 to 10 days. <strong>An ulcer, rough patch, or indurated spot that fails to resolve in 14 days must be examined in person by a dental professional or oncologist.</strong>
                </p>
              </div>
            </div>
            <Button
              variant="danger"
              size="md"
              onClick={() => onNavigate('screening')}
              leftIcon={<ShieldAlert className="w-4 h-4" />}
            >
              Start Triage Screening
            </Button>
          </div>
        </div>

        {/* Detailed High Risk Indicators */}
        <div>
          <h2 className="text-2xl font-black text-[#18313B] font-heading mb-6">
            Primary Warning Signs Requiring Prompt Attention
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Card className="p-6 border-l-6 border-l-[#B42332] overflow-hidden group">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-32 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&auto=format&fit=crop&q=80"
                    alt="Non-healing oral ulcer clinical check"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-[#B42332] shrink-0" />
                    <h3 className="text-lg font-bold text-[#18313B]">Non-Healing Mucosal Ulcer</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#647681] mt-1 leading-relaxed">
                    A sore or crater on the lateral border of the tongue, floor of the mouth, or retromolar trigone with raised edges or indurated (hardened) base that does not respond to topical ointment or vitamin therapy.
                  </p>
                  <div className="mt-3 text-xs font-semibold text-[#B42332] bg-[#FFEBEE] px-3 py-1.5 rounded-lg inline-block">
                    Urgent Evaluation: Biopsy Indicated
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-6 border-l-[#B42332] overflow-hidden group">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-32 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=80"
                    alt="Erythroplakia and dysplasia lesion check"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-[#B42332] shrink-0" />
                    <h3 className="text-lg font-bold text-[#18313B]">Persistent Red or Mixed Patch</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#647681] mt-1 leading-relaxed">
                    Velvety red patches (erythroplakia) or speckled red-and-white lesions (erythroleukoplakia). These carry up to an 85% probability of severe epithelial dysplasia or carcinoma in situ.
                  </p>
                  <div className="mt-3 text-xs font-semibold text-[#B42332] bg-[#FFEBEE] px-3 py-1.5 rounded-lg inline-block">
                    High Dysplasia Risk: Immediate Specialist Review
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-6 border-l-[#A96A12] overflow-hidden group">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-32 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop&q=80"
                    alt="Cervical lymph node palpation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-[#A96A12] shrink-0" />
                    <h3 className="text-lg font-bold text-[#18313B]">Painless Lump or Swelling in Neck/Jaw</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#647681] mt-1 leading-relaxed">
                    A firm, non-tender lump in the cheek, floor of mouth, or submandibular/cervical lymph nodes in the neck that does not subside after antibiotic therapy.
                  </p>
                  <div className="mt-3 text-xs font-semibold text-[#A96A12] bg-[#FFF8E1] px-3 py-1.5 rounded-lg inline-block">
                    Palpation and Ultrasonography Recommended
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-6 border-l-[#2563A6] overflow-hidden group">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-full sm:w-32 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80"
                    alt="Functional impairment clinical assessment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-5 h-5 text-[#2563A6] shrink-0" />
                    <h3 className="text-lg font-bold text-[#18313B]">Functional Impairments & Numbness</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#647681] mt-1 leading-relaxed">
                    Unexplained numbness or paresthesia of the lower lip or chin (Vincent symptom), restriction of tongue mobility, persistent difficulty swallowing (dysphagia), or voice changes.
                  </p>
                  <div className="mt-3 text-xs font-semibold text-[#2563A6] bg-[#EAF1F9] px-3 py-1.5 rounded-lg inline-block">
                    Neurovascular & Head/Neck Referral Urged
                  </div>
                </div>
              </div>
            </Card>

          </div>
        </div>

        {/* Emergency Helpline Box */}
        <Card className="p-8 bg-[#18313B] text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#B8E7D0] uppercase tracking-wider">National Healthcare Resources</span>
              <h3 className="text-xl font-bold font-heading mt-1">Need Immediate Guidance or In-Person Consultation?</h3>
              <p className="text-white/70 text-sm mt-1 max-w-2xl leading-relaxed">
                Connect with government cancer helplines and locate the nearest tertiary cancer institute or regional dental hospital.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="accent"
                size="md"
                onClick={() => onNavigate('find-specialist')}
                leftIcon={<Stethoscope className="w-4 h-4 text-[#18313B]" />}
              >
                Find Specialists
              </Button>
              <a
                href="tel:1800221951"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold border border-white/20 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-[#B8E7D0]" />
                Call 1800-22-1951
              </a>
            </div>
          </div>
        </Card>

      </main>
    </div>
  );
};
