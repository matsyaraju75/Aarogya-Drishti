import { api } from '../services/api';
import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  Search, 
  Filter, 
  Eye, 
  FileCheck, 
  Download, 
  Send, 
  UserCheck, 
  Sliders, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { PageId, Language, ResultCategory, ScreeningRecord } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface ClinicianDashboardPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const ClinicianDashboardPage: React.FC<ClinicianDashboardPageProps> = ({ onNavigate }) => {
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [viewOverlay, setViewOverlay] = useState<'standard' | 'heatmap' | 'quality'>('standard');
  const [reviewNote, setReviewNote] = useState('');
  const [biopsyStatus, setBiopsyStatus] = useState('Incisional biopsy recommended within 7 days');
  const [pathologyDiagnosis, setPathologyDiagnosis] = useState('');
  const [tnmStaging, setTnmStaging] = useState('');
  const [approvedSuccess, setApprovedSuccess] = useState(false);

  // Clinician queue cases
  const [cases, setCases] = useState([
    {
      id: 'CASE-2026-441',
      patientRef: 'AD-2026-904128',
      ageRange: '45-60',
      submittedDate: 'Today, 09:14 UTC',
      category: 'D' as ResultCategory,
      symptoms: ['Painful persistent ulcer > 2 weeks', 'Lump or thickening in cheek'],
      duration: '> 14 days (approx. 4 weeks)',
      imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      aiModelFindings: [
        'Erythematous central bed with elevated border',
        'High contrast textural heterogeneity',
        'Validated referral trigger met (Severity index: 0.94)'
      ],
      qualityCheck: 'Pass (Sharpness: 91/100, Lighting: Optimal)',
      status: 'Pending Review'
    },
    {
      id: 'CASE-2026-440',
      patientRef: 'AD-2026-881920',
      ageRange: '36-50',
      submittedDate: 'Yesterday, 16:30 UTC',
      category: 'B' as ResultCategory,
      symptoms: ['White or red patch inside mouth'],
      duration: '> 14 days',
      imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      aiModelFindings: [
        'Hyperkeratotic opaque patch on buccal mucosa',
        'Sharp demarcation from surrounding mucosa',
        'Confidence score: 86.4%'
      ],
      qualityCheck: 'Pass (Sharpness: 88/100, Lighting: Pass)',
      status: 'In Review'
    },
    {
      id: 'CASE-2026-439',
      patientRef: 'AD-2026-773105',
      ageRange: '18-35',
      submittedDate: 'Oct 28, 11:20 UTC',
      category: 'C' as ResultCategory,
      symptoms: ['Rough or crusting mucosal area'],
      duration: '< 14 days',
      imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      aiModelFindings: [
        'Focal sharpness below clinical confidence threshold',
        'Salivary specular glare masking lesion floor',
        'Model refused prediction to prevent false reassurance'
      ],
      qualityCheck: 'Rejected (Sharpness: 48/100, Glare: High)',
      status: 'Quality Flagged'
    }
  ]);

  const handleOpenReview = (c: typeof cases[0]) => {
    setSelectedCase(c);
    setReviewNote('');
    setPathologyDiagnosis('');
    setTnmStaging('');
    setApprovedSuccess(false);
  };

  const handleApproveCase = () => {
    setApprovedSuccess(true);
    setTimeout(() => {
      if (selectedCase) {
        setCases(cases.map(item => item.id === selectedCase.id ? { ...item, status: 'Approved' } : item));
      }
      setSelectedCase(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      {/* Clinician Portal Header */}
      <section className="bg-white border-b border-[#DCE8E9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563A6] to-[#1D4E83] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#18313B] font-heading">
                    Clinician Review & Diagnostic Triage Console
                  </h1>
                  <Badge variant="info" size="sm">Doctor Portal</Badge>
                </div>
                <p className="text-xs text-[#647681] mt-0.5">
                  Logged in as <strong>Dr. Radhika Varma, MDS</strong> (Govt. Dental College / Osmania) • DCI-AP-2015-8941
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#237A57] bg-[#E8F5E9] px-3 py-1.5 rounded-lg border border-[#C8E6C9] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Validated Clinician Access
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Triage Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <Card className="p-5 border-l-4 border-l-[#B42332]">
            <span className="text-xs font-bold text-[#B42332] uppercase">Urgent Category D</span>
            <div className="text-2xl font-black text-[#B42332] font-heading mt-1">1 Priority</div>
            <p className="text-[11px] text-[#647681] mt-1">Requires immediate clinical triage</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-[#A96A12]">
            <span className="text-xs font-bold text-[#A96A12] uppercase">Abnormal Category B</span>
            <div className="text-2xl font-black text-[#A96A12] font-heading mt-1">1 Case</div>
            <p className="text-[11px] text-[#647681] mt-1">Non-urgent mucosal examination</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-[#546E7A]">
            <span className="text-xs font-bold text-[#546E7A] uppercase">Inconclusive Category C</span>
            <div className="text-2xl font-black text-[#546E7A] font-heading mt-1">1 Case</div>
            <p className="text-[11px] text-[#647681] mt-1">Image quality rejected by safety gate</p>
          </Card>

          <Card className="p-5 border-l-4 border-l-[#237A57]">
            <span className="text-xs font-bold text-[#237A57] uppercase">Concordance Rate</span>
            <div className="text-2xl font-black text-[#237A57] font-heading mt-1">94.2%</div>
            <p className="text-[11px] text-[#647681] mt-1">Clinical agreement with model triage</p>
          </Card>
        </div>

        {/* Triage Cases Queue */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DCE8E9]">
            <div>
              <h2 className="text-base font-bold text-[#18313B]">Pending Oral Screening Reviews</h2>
              <p className="text-xs text-[#647681]">Review incoming screening photographs, inspect AI visual indicators, and record clinical recommendations.</p>
            </div>
            <span className="text-xs font-bold text-[#087F8C] bg-[#E6F4F6] px-3 py-1 rounded-full">
              {cases.length} Active in Queue
            </span>
          </div>

          <div className="space-y-4">
            {cases.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl border border-[#DCE8E9] hover:border-[#087F8C] bg-white transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={c.imageUrl}
                    alt="Clinical case preview"
                    className="w-16 h-16 rounded-xl object-cover border border-[#DCE8E9] shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#18313B]">{c.id}</span>
                      <span className="text-xs text-[#647681]">({c.patientRef})</span>
                      <Badge variant={c.category === 'A' ? 'categoryA' : c.category === 'B' ? 'categoryB' : c.category === 'C' ? 'categoryC' : 'categoryD'}>
                        Category {c.category}
                      </Badge>
                      <span className="text-[10px] font-bold text-[#2563A6] bg-[#EAF1F9] px-2 py-0.5 rounded">
                        Age: {c.ageRange}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-[#18313B] mt-1">
                      {c.symptoms.join(', ')} • Duration: <span className="text-[#B42332]">{c.duration}</span>
                    </p>

                    <div className="text-[11px] text-[#647681] mt-1 flex flex-wrap gap-x-4">
                      <span><strong>AI Pre-Check:</strong> {c.qualityCheck}</span>
                      <span><strong>Submitted:</strong> {c.submittedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleOpenReview(c)}
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                  >
                    Open Clinical Inspection
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </main>

      {/* Clinical Inspection & Assessment Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <Card className="max-w-4xl w-full p-6 sm:p-8 bg-white my-8 max-h-[90vh] overflow-y-auto space-y-6 animate-fadeIn">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#DCE8E9]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#18313B]">
                    Specialist Clinical Review: {selectedCase.id}
                  </h3>
                  <Badge variant={selectedCase.category === 'D' ? 'categoryD' : 'categoryB'}>
                    Category {selectedCase.category}
                  </Badge>
                </div>
                <p className="text-xs text-[#647681] mt-0.5">
                  Patient Reference: <strong>{selectedCase.patientRef}</strong> • Age Group: {selectedCase.ageRange}
                </p>
              </div>

              <button
                onClick={() => setSelectedCase(null)}
                className="p-1 rounded-lg hover:bg-[#F5FAFA] text-[#647681]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Split View: High-Res Image Inspection & AI Visual Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left: Viewport with Overlay Controls */}
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden border border-[#DCE8E9] bg-black aspect-4/3 flex items-center justify-center">
                  <img
                    src={selectedCase.imageUrl}
                    alt="High resolution oral capture"
                    className="w-full h-full object-cover"
                  />

                  {/* Simulated Anomaly Heatmap Overlay */}
                  {viewOverlay === 'heatmap' && (
                    <div className="absolute inset-0 bg-radial-at-c from-red-500/40 via-yellow-500/20 to-transparent pointer-events-none border-2 border-red-500/80 m-8 rounded-xl flex items-center justify-center">
                      <span className="bg-black/75 text-white text-[10px] font-mono px-2 py-1 rounded">
                        Simulated Feature Activation (Grad-CAM)
                      </span>
                    </div>
                  )}

                  {/* Simulated Quality Mask */}
                  {viewOverlay === 'quality' && (
                    <div className="absolute inset-0 bg-black/60 p-4 text-white text-xs font-mono space-y-1">
                      <p className="text-[#B8E7D0]">Quality Metric Matrix:</p>
                      <p>Luminance: 320 Lux (Pass)</p>
                      <p>Focus Metric: 88.4 / 100</p>
                      <p>Saliva Glare Index: 8.2% (Pass)</p>
                      <p>Anatomical ROI: 94.1%</p>
                    </div>
                  )}

                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded">
                    Uncompressed 1080p Clinical Frame
                  </div>
                </div>

                {/* Overlay Toggle Buttons */}
                <div className="flex bg-[#F5FAFA] p-1 rounded-xl border border-[#DCE8E9] text-xs">
                  <button
                    type="button"
                    onClick={() => setViewOverlay('standard')}
                    className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
                      viewOverlay === 'standard' ? 'bg-white text-[#087F8C] shadow-xs' : 'text-[#647681]'
                    }`}
                  >
                    Visual Spectrum
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewOverlay('heatmap')}
                    className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
                      viewOverlay === 'heatmap' ? 'bg-white text-[#B42332] shadow-xs' : 'text-[#647681]'
                    }`}
                  >
                    AI Heatmap ROI
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewOverlay('quality')}
                    className={`flex-1 py-1.5 font-bold rounded-lg transition-all ${
                      viewOverlay === 'quality' ? 'bg-white text-[#2563A6] shadow-xs' : 'text-[#647681]'
                    }`}
                  >
                    Quality Grid
                  </button>
                </div>
              </div>

              {/* Right: AI Model Observation & Clinical History */}
              <div className="space-y-4 text-xs">
                <div className="p-3.5 bg-[#F5FAFA] rounded-xl border border-[#DCE8E9] space-y-2">
                  <h4 className="font-bold text-[#18313B] uppercase text-[11px] tracking-wider">
                    Model Extracted Observations
                  </h4>
                  <ul className="space-y-1 text-[#18313B]">
                    {selectedCase.aiModelFindings.map((finding: string, i: number) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#087F8C] shrink-0 mt-0.5" />
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 text-[10px] text-[#A96A12] border-t border-[#DCE8E9]">
                    Notice: Machine learning observations do not establish diagnosis.
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-[#18313B] uppercase text-[11px] tracking-wider">
                    Biopsy Recommendation Protocol
                  </label>
                  <select
                    value={biopsyStatus}
                    onChange={(e) => setBiopsyStatus(e.target.value)}
                    className="w-full bg-white border border-[#DCE8E9] rounded-xl p-2.5 focus:border-[#2563A6]"
                  >
                    <option>Incisional biopsy recommended within 7 days</option>
                    <option>Punch biopsy ordered; awaiting pathology result</option>
                    <option>Vital staining (Toluidine Blue) indicated</option>
                    <option>Biopsy not clinically warranted at this stage</option>
                    <option>Follow-up mucosal photography in 14 days</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-[#18313B] uppercase text-[11px] tracking-wider">
                    Histopathological Diagnosis & Staging (Only after tissue biopsy)
                  </label>
                  <input
                    type="text"
                    value={tnmStaging}
                    onChange={(e) => setTnmStaging(e.target.value)}
                    placeholder="e.g. Moderate Epithelial Dysplasia / cT1 N0 M0"
                    className="w-full bg-white border border-[#DCE8E9] rounded-xl p-2.5 focus:border-[#2563A6]"
                  />
                  <span className="text-[10px] text-[#647681] block">
                    The AI never assigns clinical cancer stages; only certified clinicians may document confirmed staging.
                  </span>
                </div>

              </div>

            </div>

            {/* Clinician Examination Notes */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider">
                Clinician Palpatory Findings & Specialist Referral Orders
              </label>
              <textarea
                rows={3}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder="Document palpatory induration, lymphadenopathy (submandibular/jugulodigastric), prescribed local therapy, or hospital referral orders..."
                className="w-full bg-white border border-[#DCE8E9] rounded-xl p-3 text-xs focus:border-[#2563A6]"
              />
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-[#DCE8E9] flex flex-wrap items-center justify-between gap-4">
              <Button variant="outline" size="sm" onClick={() => setSelectedCase(null)}>
                Close Without Saving
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleApproveCase}
                  leftIcon={<CheckCircle2 className="w-4 h-4 text-[#B8E7D0]" />}
                >
                  {approvedSuccess ? 'Assessment Certified & Approved' : 'Certify Assessment & Sign Report'}
                </Button>
              </div>
            </div>

          </Card>
        </div>
      )}

    </div>
  );
};
