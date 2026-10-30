import React from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Smile, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { PageId, Language } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface OralHealthEducationPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const OralHealthEducationPage: React.FC<OralHealthEducationPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      <section className="bg-white border-b border-[#DCE8E9] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="info" className="mb-3">Preventive Health Knowledge</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#18313B] font-heading">
            Oral Health & Pre-Cancer Education
          </h1>
          <p className="text-[#647681] text-base mt-3 max-w-3xl leading-relaxed">
            Understanding the risk factors, common mucosal lesions, and performing monthly oral self-examinations can prevent up to 90% of advanced oral oncological complications.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Major Risk Factors */}
        <div>
          <h2 className="text-2xl font-black text-[#18313B] font-heading mb-6">
            Key Environmental & Lifestyle Risk Factors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hoverEffect className="overflow-hidden border-t-4 border-t-[#B42332] flex flex-col justify-between group">
              <div className="h-40 overflow-hidden relative bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=80"
                  alt="Areca nut and tobacco habit risks"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#B42332] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  Highest Risk
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-[#B42332] uppercase">Top Contributor in South Asia</span>
                <h3 className="text-lg font-bold text-[#18313B] mt-1 mb-2">Smokeless Tobacco & Areca Nut</h3>
                <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
                  Chewing gutka, khaini, pan masala, and betel quid with slaked lime causes direct cellular injury and collagen cross-linking, heavily predisposing to Oral Submucous Fibrosis (OSMF).
                </p>
              </div>
            </Card>

            <Card hoverEffect className="overflow-hidden border-t-4 border-t-[#A96A12] flex flex-col justify-between group">
              <div className="h-40 overflow-hidden relative bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=80"
                  alt="Smoking and alcohol combination risk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#A96A12] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  Carcinogen Multiplier
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-[#A96A12] uppercase">Carcinogenic Multiplier</span>
                <h3 className="text-lg font-bold text-[#18313B] mt-1 mb-2">Smoking & Heavy Alcohol</h3>
                <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
                  Combustion products like nitrosamines combined with alcohol’s solvent effect increase mucosal permeability, accelerating mutagenic changes across the tongue and floor of the mouth.
                </p>
              </div>
            </Card>

            <Card hoverEffect className="overflow-hidden border-t-4 border-t-[#2563A6] flex flex-col justify-between group">
              <div className="h-40 overflow-hidden relative bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&auto=format&fit=crop&q=80"
                  alt="Clinical biology of HPV-16"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#2563A6] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  Viral Factor
                </span>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-[#2563A6] uppercase">Biological Determinant</span>
                <h3 className="text-lg font-bold text-[#18313B] mt-1 mb-2">Human Papillomavirus (HPV-16)</h3>
                <p className="text-xs sm:text-sm text-[#647681] leading-relaxed">
                  High-risk strains like HPV-16 are increasingly associated with oropharyngeal lesions affecting the base of the tongue, tonsils, and posterior pharyngeal wall even in non-smokers.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Potentially Malignant Disorders (OPMDs) */}
        <div>
          <h2 className="text-2xl font-black text-[#18313B] font-heading mb-6">
            Recognizing Potentially Malignant Disorders (OPMDs)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden bg-white group flex flex-col justify-between">
              <div className="h-32 bg-slate-100 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&auto=format&fit=crop&q=80"
                  alt="Leukoplakia examination"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-base text-[#18313B] mb-1">Leukoplakia</h4>
                <p className="text-xs text-[#237A57] font-semibold mb-1.5">Predominantly White Patch</p>
                <p className="text-xs text-[#647681] leading-relaxed">
                  A white mucosal plaque that cannot be scraped off and cannot be characterized clinically or pathologically as any other disease.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden bg-white group flex flex-col justify-between">
              <div className="h-32 bg-slate-100 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&auto=format&fit=crop&q=80"
                  alt="Erythroplakia lesion examination"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-base text-[#18313B] mb-1">Erythroplakia</h4>
                <p className="text-xs text-[#B42332] font-semibold mb-1.5">Fiery Red Velvety Area</p>
                <p className="text-xs text-[#647681] leading-relaxed">
                  Smooth or granular red patch that carries significantly higher dysplasia rates than leukoplakia; mandates prompt biopsy.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden bg-white group flex flex-col justify-between">
              <div className="h-32 bg-slate-100 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80"
                  alt="Oral Submucous Fibrosis clinical examination"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-base text-[#18313B] mb-1">Oral Submucous Fibrosis</h4>
                <p className="text-xs text-[#A96A12] font-semibold mb-1.5">Blanched Mucosa & Trismus</p>
                <p className="text-xs text-[#647681] leading-relaxed">
                  Progressive loss of mouth opening, fibrous vertical bands in the cheek, and burning sensation while eating normal food.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden bg-white group flex flex-col justify-between">
              <div className="h-32 bg-slate-100 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&auto=format&fit=crop&q=80"
                  alt="Oral Lichen Planus biopsy check"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-base text-[#18313B] mb-1">Lichen Planus</h4>
                <p className="text-xs text-[#2563A6] font-semibold mb-1.5">Lace-like Reticular Striae</p>
                <p className="text-xs text-[#647681] leading-relaxed">
                  Chronic autoimmune mucosal disorder with white radiating lacy lines (Wickham striae) or erosive mucosal ulceration.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Monthly Self-Examination Protocol */}
        <Card className="p-8 bg-gradient-to-r from-[#087F8C]/10 to-[#2563A6]/10 border border-[#DCE8E9]">
          <div className="max-w-3xl">
            <Badge variant="success" className="mb-2">Empowering Preventive Care</Badge>
            <h3 className="text-2xl font-black text-[#18313B] font-heading mb-3">
              How to Perform a 2-Minute Monthly Oral Self-Check
            </h3>
            <p className="text-sm text-[#647681] leading-relaxed mb-6">
              Stand before a well-lit mirror with clean hands or a flashlight. Look and feel for anything that feels firm, rough, or altered:
            </p>
            <div className="space-y-3 text-xs sm:text-sm text-[#18313B]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
                <span><strong>Lips and outer gums:</strong> Pull lower and upper lips back; examine color and consistency.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
                <span><strong>Cheeks (buccal mucosa):</strong> Open mouth wide and look inside left and right cheeks for white bands or redness.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
                <span><strong>Tongue (all surfaces):</strong> Stick out tongue, examine the dorsal top, lift tip to roof of mouth, and inspect both lateral sides.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#087F8C] shrink-0 mt-0.5" />
                <span><strong>Floor and roof of mouth:</strong> Feel the floor under the tongue and touch the hard palate for unexplained nodules.</span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('screening')}
                leftIcon={<ShieldCheck className="w-4 h-4 text-[#B8E7D0]" />}
              >
                Start an Oral Screening
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('warning-signs')}
              >
                Review Warning Signs
              </Button>
            </div>
          </div>
        </Card>

      </main>
    </div>
  );
};
