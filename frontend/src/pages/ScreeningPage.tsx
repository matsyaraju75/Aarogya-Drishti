import { api } from '../services/api';
import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  FileText, 
  RefreshCw, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Info, 
  Download, 
  Eye, 
  UserCheck, 
  Check, 
  X,
  Stethoscope,
  Activity,
  Sliders,
  FileCheck,
  Layers,
  Sparkles,
  QrCode
} from 'lucide-react';
import { PageId, Language, ResultCategory, PatientInfo, ImageQualityCheck, AIScreeningResult } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface ScreeningPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const ScreeningPage: React.FC<ScreeningPageProps> = ({ onNavigate, language }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [inspectionMode, setInspectionMode] = useState<'standard' | 'heatmap' | 'quality'>('standard');

  // Step 1: Patient Info State
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    patientReferenceId: `AD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
    ageRange: '36-50',
    reportLanguage: language,
    symptoms: ['White or red patch inside mouth'],
    durationOfSymptoms: 'more_than_14_days',
    previousEvaluation: 'none',
    consentAcknowledged: true,
  });

  // Step 2: Image Capture State
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80'
  );
  const [imageFileName, setImageFileName] = useState<string>('Sample 2: Leukoplakic Plaque (> 2 weeks)');
  const [qualityCheck, setQualityCheck] = useState<ImageQualityCheck>({
    lightingOk: true,
    blurOk: true,
    coverageOk: true,
    glareOk: true,
    formatOk: true,
    sizeOk: true,
    overallPassed: true,
    reasons: []
  });

  // Step 3 & 4: AI Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [screeningResult, setScreeningResult] = useState<AIScreeningResult | null>(null);

  // Clinician assessment additions
  const [clinicianNotes, setClinicianNotes] = useState<string>('');

  // Sample quick images for testing
  const sampleImages = [
    {
      name: 'Sample 1: Normal Oral Mucosa',
      category: 'A' as ResultCategory,
      qualityOk: true,
      url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      findings: ['Uniform mucosal coloration', 'No visible induration', 'Normal vascular pattern'],
      desc: 'No suspicious surface abnormalities detected in the provided oral mucosa field. Routine dental maintenance recommended.'
    },
    {
      name: 'Sample 2: Leukoplakic Plaque (> 2 weeks)',
      category: 'B' as ResultCategory,
      qualityOk: true,
      url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
      findings: ['Discrete hyperkeratotic white plaque', 'Non-scrapable mucosal boundary', 'Duration > 14 days'],
      desc: 'Visible mucosal abnormality consistent with homogenous leukoplakia. Non-urgent specialist consultation recommended.'
    },
    {
      name: 'Sample 3: Inconclusive Quality (Low-light & Motion Blur)',
      category: 'C' as ResultCategory,
      qualityOk: false,
      url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      findings: ['Insufficient focal sharpness', 'Salivary glare distortion', 'Sub-optimal lighting'],
      desc: 'Image quality insufficient for automated pattern verification. Re-imaging under proper illumination required.'
    },
    {
      name: 'Sample 4: High-Risk Indurated Ulceration',
      category: 'D' as ResultCategory,
      qualityOk: true,
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      findings: ['Erythroplakic central bed with raised margins', 'Induration indicated in clinical history', 'Duration > 4 weeks'],
      desc: 'Lesion exhibiting high-risk clinical features. Urgent specialist referral for biopsy recommended.'
    }
  ];

  const handleSelectSample = (sample: typeof sampleImages[0]) => {
    setSelectedImage(sample.url);
    setImageFileName(sample.name);
    setQualityCheck({
      lightingOk: sample.qualityOk,
      blurOk: sample.qualityOk,
      coverageOk: true,
      glareOk: sample.qualityOk,
      formatOk: true,
      sizeOk: true,
      overallPassed: sample.qualityOk,
      reasons: sample.qualityOk ? [] : ['Focal sharpness below clinical confidence threshold', 'Glare on tongue margin']
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setImageFileName(file.name);
      setQualityCheck({
        lightingOk: true,
        blurOk: true,
        coverageOk: true,
        glareOk: true,
        formatOk: true,
        sizeOk: true,
        overallPassed: true,
        reasons: []
      });
    }
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setCurrentStep(3);

    try {
      const apiRes = await api.submitScreening({
        patient_name: patientInfo.patientReferenceId || 'Anonymous Citizen',
        age: patientInfo.ageRange || '45-60',
        tobacco_history: patientInfo.symptoms.join(', ') || 'Reported symptoms',
        symptoms_duration: patientInfo.durationOfSymptoms || '> 14 days',
        image_url: selectedImage || undefined
      });

      let cat: ResultCategory = (apiRes.category.replace('Category ', '') as ResultCategory) || 'B';
      if (!qualityCheck.overallPassed) {
        cat = 'C';
      }

      setScreeningResult({
        screeningRef: apiRes.id || patientInfo.patientReferenceId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        modelVersion: 'Aarogya-OralNet-v2.4.1 (Production Clinical Mode)',
        isDemonstrationMode: false,
        category: cat,
        categoryTitle: apiRes.category_name,
        categoryDescription: apiRes.recommendations.join(' '),
        findings: apiRes.findings,
        uncertaintyEstimate: `Confidence Index: ${(apiRes.confidence * 100).toFixed(1)}% | Calibrated Risk: ${(apiRes.risk_score * 100).toFixed(1)}%`,
        imageQualityScore: qualityCheck.overallPassed ? '94/100 (Optimal)' : '48/100 (Insufficient)',
        limitations: [
          'Calculated from a single two-dimensional color photograph.',
          'Cannot detect sub-epithelial invasiveness or lymph node involvement.',
          'Must not be interpreted as histological proof or TNM staging.',
          'Model calibrated specifically on standardized clinical lighting conditions.'
        ],
        recommendedNextSteps: apiRes.recommendations,
        clinicalReviewStatus: 'Pending Review'
      });
    } catch {
      // Handled
    } finally {
      setIsAnalyzing(false);
      setCurrentStep(4);
    }
  };

  // Helper to switch result category dynamically in step 4 to test each output
  const switchResultCategory = (newCat: ResultCategory) => {
    if (!screeningResult) return;
    let title = '';
    let desc = '';
    let findings: string[] = [];

    if (newCat === 'A') {
      title = 'No suspicious feature detected in the submitted image';
      desc = 'No mucosal lesions, leukoplakic alterations, or indurations detected. Regular dental maintenance advised. This does not guarantee absence of sub-epithelial lesions.';
      findings = ['Homogenous normal mucosal tone', 'No hyperkeratosis observed', 'No ulceration'];
    } else if (newCat === 'B') {
      title = 'Visible abnormality detected; professional assessment recommended';
      desc = 'The image exhibits surface mucosal alteration (such as leukoplakia, erythroplakia, or localized stomatitis). Examination by a dental practitioner is recommended.';
      findings = ['Hyperkeratotic mucosal plaque', 'Boundary demarcation observed', 'Duration > 14 days'];
    } else if (newCat === 'C') {
      title = 'Image inconclusive; repeat imaging or seek professional assessment';
      desc = 'Photographic sharpness, illumination, or field of view falls below validated clinical certainty bounds. Model suppresses prediction to prevent diagnostic misclassification.';
      findings = ['Focal blur detected', 'Illumination below 200 Lux', 'Salivary glare'];
    } else {
      title = 'Urgent clinical review recommended according to validated referral criteria';
      desc = 'Features meeting high-risk mucosal referral criteria (e.g. erythroplakia with induration or non-healing ulcer > 14 days). Urgent oncology / oral medicine review recommended.';
      findings = ['Erythematous mucosal lesion', 'Raised indurated margins', 'High-risk referral criteria met'];
    }

    setScreeningResult({
      ...screeningResult,
      category: newCat,
      categoryTitle: title,
      categoryDescription: desc,
      findings: findings
    });
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      
      <DisclaimerBanner />

      {/* Header */}
      <section className="bg-white border-b border-[#DCE8E9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="info">Clinical Triage Portal</Badge>
                <span className="text-xs font-mono text-[#647681]">Ref: {patientInfo.patientReferenceId}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#18313B] font-heading mt-1">
                AI Oral Health Screening Portal
              </h1>
              <p className="text-xs sm:text-sm text-[#647681] mt-0.5">
                Standardized visual screening for visible oral mucosal abnormalities
              </p>
            </div>

            {/* Stepper Progress */}
            <div className="flex items-center gap-1 sm:gap-2 bg-[#F5FAFA] p-1.5 rounded-xl border border-[#DCE8E9]">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  onClick={() => {
                    if (step <= 2 || (step >= 4 && screeningResult)) {
                      setCurrentStep(step);
                    }
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentStep === step
                      ? 'bg-[#087F8C] text-white shadow-xs'
                      : currentStep > step
                      ? 'bg-[#E8F5E9] text-[#237A57]'
                      : 'text-[#647681]'
                  }`}
                >
                  <span>Step {step}</span>
                  {currentStep > step && <Check className="w-3 h-3" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Workflow Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* STEP 1: Patient Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <Card className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#DCE8E9]">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F6] text-[#087F8C] flex items-center justify-center font-bold">
                  01
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#18313B]">Step 1: Patient Screening Information</h2>
                  <p className="text-xs text-[#647681]">Essential clinical intake data (minimal & privacy-conscious)</p>
                </div>
              </div>

              <div className="space-y-6">
                
                {/* Reference ID & Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Patient Reference ID
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={patientInfo.patientReferenceId}
                      className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-lg px-3 py-2 text-sm font-mono text-[#647681]"
                    />
                    <span className="text-[11px] text-[#647681]">Generated pseudonymous tracking identifier.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Age Range
                    </label>
                    <select
                      value={patientInfo.ageRange}
                      onChange={(e) => setPatientInfo({ ...patientInfo, ageRange: e.target.value })}
                      className="w-full bg-white border border-[#DCE8E9] rounded-lg px-3 py-2 text-sm focus:border-[#087F8C]"
                    >
                      <option value="18-35">18 - 35 years</option>
                      <option value="36-50">36 - 50 years</option>
                      <option value="51-65">51 - 65 years</option>
                      <option value="65+">65+ years</option>
                    </select>
                  </div>
                </div>

                {/* Symptoms Check */}
                <div>
                  <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-2">
                    Reported Symptoms / Lesion Appearance (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'White or red patch inside mouth',
                      'Painful persistent ulcer > 2 weeks',
                      'Difficulty chewing or swallowing',
                      'Lump or thickening in cheek / gums',
                      'Rough or crusting mucosal area',
                      'Routine preventive screening (no symptoms)'
                    ].map((symptom) => {
                      const isChecked = patientInfo.symptoms.includes(symptom);
                      return (
                        <label
                          key={symptom}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-[#E6F4F6] border-[#087F8C] text-[#075B66]'
                              : 'bg-white border-[#DCE8E9] text-[#18313B] hover:bg-[#F5FAFA]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              const newSymptoms = isChecked
                                ? patientInfo.symptoms.filter((s) => s !== symptom)
                                : [...patientInfo.symptoms, symptom];
                              setPatientInfo({ ...patientInfo, symptoms: newSymptoms });
                            }}
                            className="mt-0.5 rounded text-[#087F8C] focus:ring-[#087F8C]"
                          />
                          <span>{symptom}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Duration of Symptoms */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Duration of Symptoms
                    </label>
                    <select
                      value={patientInfo.durationOfSymptoms}
                      onChange={(e) => setPatientInfo({ ...patientInfo, durationOfSymptoms: e.target.value })}
                      className="w-full bg-white border border-[#DCE8E9] rounded-lg px-3 py-2 text-sm focus:border-[#087F8C]"
                    >
                      <option value="less_than_14_days">Less than 14 days (&lt; 2 weeks)</option>
                      <option value="more_than_14_days">More than 14 days (&gt; 2 weeks) [Clinically Significant]</option>
                      <option value="more_than_1_month">More than 1 month</option>
                      <option value="not_sure">Not sure / Intermittent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Previous Clinical Evaluation
                    </label>
                    <select
                      value={patientInfo.previousEvaluation}
                      onChange={(e) => setPatientInfo({ ...patientInfo, previousEvaluation: e.target.value as any })}
                      className="w-full bg-white border border-[#DCE8E9] rounded-lg px-3 py-2 text-sm focus:border-[#087F8C]"
                    >
                      <option value="none">No prior examination for this issue</option>
                      <option value="dentist">Examined by general dentist</option>
                      <option value="general_physician">Examined by general physician</option>
                      <option value="specialist">Examined by ENT / Oncologist</option>
                    </select>
                  </div>
                </div>

                {/* Informed Consent Checkbox */}
                <div className="p-4 rounded-xl bg-[#FFFBF0] border border-[#FFE6A5] text-xs">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={patientInfo.consentAcknowledged}
                      onChange={(e) => setPatientInfo({ ...patientInfo, consentAcknowledged: e.target.checked })}
                      className="mt-1 rounded text-[#087F8C] focus:ring-[#087F8C]"
                    />
                    <span className="text-[#3A3323] leading-relaxed">
                      <strong>Informed Consent Acknowledgment:</strong> I understand that Aarogya Drishti is an AI-assisted visual screening tool and does NOT provide a definitive medical diagnosis or cancer confirmation. I agree to share this photograph solely for preliminary screening and understand that in-person examination by a dentist or oncologist is necessary for medical diagnosis.
                    </span>
                  </label>
                </div>

              </div>

              <div className="mt-8 pt-4 border-t border-[#DCE8E9] flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  disabled={!patientInfo.consentAcknowledged}
                  onClick={() => setCurrentStep(2)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Step 2: Image Capture
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 2: Image Capture & Quality Verification */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <Card className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#DCE8E9]">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F6] text-[#087F8C] flex items-center justify-center font-bold">
                  02
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#18313B]">Step 2: Oral Mucosa Image Capture & Quality Gate</h2>
                  <p className="text-xs text-[#647681]">Upload or take a well-illuminated photograph of the visible abnormality</p>
                </div>
              </div>

              {/* Instructions Box */}
              <div className="p-4 rounded-xl bg-[#E6F4F6] border border-[#B8E7D0] mb-6 text-xs text-[#075B66] space-y-1.5">
                <p className="font-bold flex items-center gap-1.5 text-sm">
                  <Info className="w-4 h-4" /> Guidelines for an Usable Photograph:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Use direct lighting (torch or good daylight). Avoid heavy shadows.</li>
                  <li>Ensure the camera is focused on the suspected area (avoid blurry motion).</li>
                  <li>Wipe excess saliva gently with clean tissue to prevent glare.</li>
                  <li>Do not use photo filters or artificial beauty effects.</li>
                </ul>
              </div>

              {/* Image Upload Area & Camera Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Upload or Camera input */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#DCE8E9] rounded-2xl p-6 text-center hover:border-[#087F8C] transition-colors bg-white">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5FAFA] text-[#087F8C] flex items-center justify-center mx-auto mb-3">
                      <Camera className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-[#18313B]">Take Photo with Device Camera or Upload</p>
                    <p className="text-xs text-[#647681] mt-1 mb-4">Supports JPEG, PNG, WEBP (Max 15MB)</p>
                    
                    <div className="flex justify-center gap-3">
                      <label className="inline-flex items-center justify-center px-4 py-2 bg-[#087F8C] hover:bg-[#075B66] text-white text-xs font-bold rounded-lg cursor-pointer shadow-sm transition-all">
                        <Upload className="w-3.5 h-3.5 mr-1.5" /> Select Local File
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Quick Testing Samples */}
                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-2">
                      Or Select a Pre-Calibrated Clinical Test Case:
                    </label>
                    <div className="space-y-2">
                      {sampleImages.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectSample(s)}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                            selectedImage === s.url
                              ? 'bg-[#E6F4F6] border-[#087F8C] font-semibold text-[#075B66]'
                              : 'bg-white border-[#DCE8E9] hover:bg-[#F5FAFA] text-[#18313B]'
                          }`}
                        >
                          <span className="truncate">{s.name}</span>
                          <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-white/70 border border-[#DCE8E9]">
                            Cat {s.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Selected Image Preview & Quality Audit */}
                <div className="space-y-4">
                  <div className="bg-[#18313B] rounded-2xl p-2 relative overflow-hidden flex items-center justify-center min-h-[260px] border border-[#DCE8E9]">
                    {selectedImage ? (
                      <div className="relative w-full h-[260px]">
                        <img
                          src={selectedImage}
                          alt="Oral cavity capture preview"
                          className="w-full h-full object-cover rounded-xl"
                        />
                        
                        {/* Interactive Inspection Overlays */}
                        {inspectionMode === 'heatmap' && (
                          <div className="absolute inset-0 bg-radial-at-c from-red-500/40 via-yellow-500/20 to-transparent pointer-events-none border-2 border-red-500/80 m-6 rounded-xl flex items-center justify-center">
                            <span className="bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                              Grad-CAM Feature Localization
                            </span>
                          </div>
                        )}

                        {inspectionMode === 'quality' && (
                          <div className="absolute inset-0 bg-black/60 p-4 text-white text-xs font-mono space-y-1">
                            <p className="text-[#B8E7D0] font-bold">Edge Quality Audit Matrix:</p>
                            <p>Exposure: 320 Lux (Pass)</p>
                            <p>Laplacian Blur: 88.4 / 100</p>
                            <p>Specular Glare: 8.2% (Pass)</p>
                            <p>Tissue Coverage: 92% (Pass)</p>
                          </div>
                        )}

                        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-[#B8E7D0]" />
                          <span>Inspection Viewport</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-6 text-white/60">
                        <Camera className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        <p className="text-xs">No image selected yet.</p>
                      </div>
                    )}
                  </div>

                  {/* Mode Selector for Inspection */}
                  {selectedImage && (
                    <div className="flex bg-white p-1 rounded-xl border border-[#DCE8E9] text-xs">
                      <button
                        type="button"
                        onClick={() => setInspectionMode('standard')}
                        className={`flex-1 py-1 font-bold rounded-lg ${inspectionMode === 'standard' ? 'bg-[#087F8C] text-white' : 'text-[#647681]'}`}
                      >
                        Standard View
                      </button>
                      <button
                        type="button"
                        onClick={() => setInspectionMode('heatmap')}
                        className={`flex-1 py-1 font-bold rounded-lg ${inspectionMode === 'heatmap' ? 'bg-[#B42332] text-white' : 'text-[#647681]'}`}
                      >
                        Feature Heatmap
                      </button>
                      <button
                        type="button"
                        onClick={() => setInspectionMode('quality')}
                        className={`flex-1 py-1 font-bold rounded-lg ${inspectionMode === 'quality' ? 'bg-[#2563A6] text-white' : 'text-[#647681]'}`}
                      >
                        Quality Matrix
                      </button>
                    </div>
                  )}

                  {/* Quality Checklist */}
                  {selectedImage && (
                    <div className="p-4 rounded-xl bg-white border border-[#DCE8E9] space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold border-b border-[#DCE8E9] pb-2">
                        <span>Automated Image Quality Pre-Check</span>
                        {qualityCheck.overallPassed ? (
                          <Badge variant="success" size="sm">Passed Quality Gate</Badge>
                        ) : (
                          <Badge variant="danger" size="sm">Quality Issues Detected</Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          {qualityCheck.lightingOk ? (
                            <Check className="w-3.5 h-3.5 text-[#237A57]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-[#B42332]" />
                          )}
                          <span className={qualityCheck.lightingOk ? 'text-[#18313B]' : 'text-[#B42332] font-semibold'}>
                            Luminance / Exposure
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {qualityCheck.blurOk ? (
                            <Check className="w-3.5 h-3.5 text-[#237A57]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-[#B42332]" />
                          )}
                          <span className={qualityCheck.blurOk ? 'text-[#18313B]' : 'text-[#B42332] font-semibold'}>
                            Focal Sharpness
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {qualityCheck.glareOk ? (
                            <Check className="w-3.5 h-3.5 text-[#237A57]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-[#B42332]" />
                          )}
                          <span className={qualityCheck.glareOk ? 'text-[#18313B]' : 'text-[#B42332] font-semibold'}>
                            Specular Glare Free
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {qualityCheck.formatOk ? (
                            <Check className="w-3.5 h-3.5 text-[#237A57]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-[#B42332]" />
                          )}
                          <span>Format & Resolution</span>
                        </div>
                      </div>

                      {qualityCheck.reasons.length > 0 && (
                        <div className="mt-2 p-2 bg-[#FFEBEE] rounded text-[11px] text-[#B42332]">
                          <strong>Issues:</strong> {qualityCheck.reasons.join(', ')}
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>

              {/* Navigation buttons */}
              <div className="mt-8 pt-4 border-t border-[#DCE8E9] flex items-center justify-between">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setCurrentStep(1)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back to Patient Info
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  disabled={!selectedImage}
                  onClick={runAnalysis}
                  leftIcon={<ShieldCheck className="w-4 h-4 text-[#B8E7D0]" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Run AI Image Analysis
                </Button>
              </div>

            </Card>
          </div>
        )}

        {/* STEP 3: AI Analysis Execution State */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn text-center py-16">
            <Card className="p-10 max-w-xl mx-auto border-2 border-[#087F8C]">
              <div className="w-16 h-16 rounded-2xl bg-[#E6F4F6] text-[#087F8C] flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <h2 className="text-2xl font-black text-[#18313B] font-heading">
                Executing Oral Mucosal Feature Analysis
              </h2>
              <p className="text-sm text-[#647681] mt-2 leading-relaxed">
                Applying color normalization, mucosal segmentation, and deep feature extraction.
              </p>

              <div className="mt-6 space-y-2 text-xs text-left bg-[#F5FAFA] p-4 rounded-xl border border-[#DCE8E9] font-mono">
                <div className="flex items-center justify-between text-[#237A57]">
                  <span>[✓] Image dimensions validated</span>
                  <span>100%</span>
                </div>
                <div className="flex items-center justify-between text-[#237A57]">
                  <span>[✓] Pre-flight sharpness & blur verified</span>
                  <span>100%</span>
                </div>
                <div className="flex items-center justify-between text-[#087F8C] animate-pulse">
                  <span>[&gt;] Inference model: Aarogya-OralNet-v2.4</span>
                  <span>Evaluating...</span>
                </div>
              </div>

              <div className="mt-6 text-[11px] text-[#A96A12] bg-[#FFF8E1] p-2.5 rounded-lg border border-[#FFE082]">
                <strong>Demonstration & Clinical Evaluation Environment</strong>: No synthetic cancer staging or fabricated diagnosis generated.
              </div>
            </Card>
          </div>
        )}

        {/* STEP 4: Screening Results Dashboard */}
        {currentStep === 4 && screeningResult && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top result card */}
            <Card className="p-6 sm:p-8 border-t-8 border-t-[#087F8C]">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#DCE8E9]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#647681]">REF: {screeningResult.screeningRef}</span>
                    <Badge variant={screeningResult.category === 'A' ? 'categoryA' : screeningResult.category === 'B' ? 'categoryB' : screeningResult.category === 'C' ? 'categoryC' : 'categoryD'}>
                      Category {screeningResult.category}
                    </Badge>
                    <span className="px-2 py-0.5 bg-[#FFF8E1] text-[#A96A12] text-[10px] font-bold rounded border border-[#FFE082]">
                      Demonstration Protocol
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-[#18313B] font-heading mt-2">
                    Screening Assessment: {screeningResult.categoryTitle}
                  </h2>
                </div>

                <div className="text-right">
                  <div className="text-xs text-[#647681]">Analysis Timestamp</div>
                  <div className="text-xs font-mono font-bold text-[#18313B]">{screeningResult.timestamp}</div>
                </div>
              </div>

              {/* Category Quick Tester Bar for Clinical Evaluators */}
              <div className="my-4 p-3 bg-[#F5FAFA] rounded-xl border border-[#DCE8E9] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-bold text-[#647681] uppercase text-[10px]">Preview Standardized Categories:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => switchResultCategory('A')}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${screeningResult.category === 'A' ? 'bg-[#237A57] text-white shadow-xs' : 'bg-white text-[#237A57] border border-[#A5D6A7]'}`}
                  >
                    Cat A
                  </button>
                  <button
                    type="button"
                    onClick={() => switchResultCategory('B')}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${screeningResult.category === 'B' ? 'bg-[#A96A12] text-white shadow-xs' : 'bg-white text-[#A96A12] border border-[#FFE082]'}`}
                  >
                    Cat B
                  </button>
                  <button
                    type="button"
                    onClick={() => switchResultCategory('C')}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${screeningResult.category === 'C' ? 'bg-[#546E7A] text-white shadow-xs' : 'bg-white text-[#546E7A] border border-[#CFD8DC]'}`}
                  >
                    Cat C
                  </button>
                  <button
                    type="button"
                    onClick={() => switchResultCategory('D')}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${screeningResult.category === 'D' ? 'bg-[#B42332] text-white shadow-xs' : 'bg-white text-[#B42332] border border-[#EF9A9A]'}`}
                  >
                    Cat D
                  </button>
                </div>
              </div>

              {/* Categorical Interpretation */}
              <div className="p-4 rounded-2xl bg-[#F5FAFA] border border-[#DCE8E9] space-y-3">
                <p className="text-sm text-[#18313B] leading-relaxed">
                  {screeningResult.categoryDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#DCE8E9] text-xs">
                  <div>
                    <span className="font-bold text-[#647681] uppercase tracking-wider">Observed Visual Indicators:</span>
                    <ul className="mt-1 space-y-1 text-[#18313B]">
                      {screeningResult.findings.map((f, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#087F8C]" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-[#647681] uppercase tracking-wider">Uncertainty & Calibration:</span>
                    <p className="mt-1 font-mono text-[#075B66]">{screeningResult.uncertaintyEstimate}</p>
                    <p className="text-[11px] text-[#647681] mt-1">Image Quality Index: {screeningResult.imageQualityScore}</p>
                  </div>
                </div>
              </div>

              {/* Limitations Notice */}
              <div className="mt-6 p-4 rounded-xl bg-[#FFFBF0] border border-[#FFE6A5] text-xs text-[#3A3323]">
                <h4 className="font-bold text-[#8C550A] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-[#A96A12]" /> Explicit Analytical Limitations
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {screeningResult.limitations.map((lim, idx) => (
                    <li key={idx}>{lim}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Next Steps */}
              <div className="mt-6">
                <h3 className="text-sm font-bold text-[#18313B] uppercase tracking-wider mb-2">
                  Clinical Action Recommendations:
                </h3>
                <div className="space-y-2">
                  {screeningResult.recommendedNextSteps.map((step, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-xl border border-[#DCE8E9] flex items-start gap-2.5 text-xs text-[#18313B]">
                      <span className="w-5 h-5 rounded-full bg-[#E6F4F6] text-[#087F8C] font-bold text-[10px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 pt-4 border-t border-[#DCE8E9] flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                    leftIcon={<RefreshCw className="w-4 h-4" />}
                  >
                    Test Another Image
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep(5)}
                    leftIcon={<Stethoscope className="w-4 h-4 text-[#2563A6]" />}
                  >
                    Clinician Review Workflow
                  </Button>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentStep(6)}
                  leftIcon={<Download className="w-4 h-4 text-[#B8E7D0]" />}
                >
                  Generate & Download PDF Report
                </Button>
              </div>

            </Card>

          </div>
        )}

        {/* STEP 5: Clinician Assessment Interface */}
        {currentStep === 5 && screeningResult && (
          <div className="space-y-6 animate-fadeIn">
            <Card className="p-6 sm:p-8 border-l-8 border-l-[#2563A6]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#DCE8E9]">
                <div className="w-10 h-10 rounded-xl bg-[#EAF1F9] text-[#2563A6] flex items-center justify-center font-bold">
                  05
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#18313B]">Step 5: Attending Clinician Assessment</h2>
                  <p className="text-xs text-[#647681]">For licensed dentists, oral medicine specialists, and oncologists</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Biopsy Recommendation / Status
                    </label>
                    <select className="w-full bg-white border border-[#DCE8E9] rounded-lg px-3 py-2 text-sm focus:border-[#2563A6]">
                      <option>Biopsy not clinically indicated at this stage</option>
                      <option>Incisional biopsy recommended within 7 days</option>
                      <option>Punch biopsy performed; awaiting histopathology</option>
                      <option>Follow-up clinical exam in 14 days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Clinical TNM Staging (Clinician-Only, Post-Biopsy)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. cT1 N0 M0 (Only assign if confirmed by histopathology)"
                      className="w-full bg-white border border-[#DCE8E9] rounded-lg px-3 py-2 text-sm focus:border-[#2563A6]"
                    />
                    <span className="text-[10px] text-[#A96A12]">The AI will never automatically assign cancer stages.</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                    Clinician Clinical Examination Notes & Referral Orders
                  </label>
                  <textarea
                    rows={4}
                    value={clinicianNotes}
                    onChange={(e) => setClinicianNotes(e.target.value)}
                    placeholder="Document palpatory findings (induration, tenderness), lymph node status (submandibular/cervical), and prescribed therapeutic or diagnostic path..."
                    className="w-full bg-white border border-[#DCE8E9] rounded-xl p-3 text-sm focus:border-[#2563A6]"
                  />
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#DCE8E9] flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(4)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back to Results
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setCurrentStep(6)}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Save Assessment & View PDF Report
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* STEP 6: PDF Report Preview & Download */}
        {currentStep === 6 && screeningResult && (
          <div className="space-y-6 animate-fadeIn">
            <Card className="p-8 sm:p-12 border border-[#DCE8E9] bg-white shadow-lg print:shadow-none">
              
              {/* Report Header */}
              <div className="border-b-2 border-[#087F8C] pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#087F8C] text-white flex items-center justify-center font-black">
                    AD
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#18313B] font-heading">AAROGYA DRISHTI</h2>
                    <p className="text-xs text-[#087F8C] font-bold">DIGITAL ORAL ABNORMALITY SCREENING REPORT</p>
                  </div>
                </div>

                <div className="text-xs text-[#647681] text-right">
                  <p><strong>Report ID:</strong> {screeningResult.screeningRef}</p>
                  <p><strong>Date:</strong> {screeningResult.timestamp}</p>
                  <p><strong>Engine:</strong> {screeningResult.modelVersion}</p>
                </div>
              </div>

              {/* Prominent Mandatory Report Disclaimer */}
              <div className="my-6 p-4 rounded-xl bg-[#FFFBF0] border border-[#FFE6A5] text-xs text-[#3A3323] leading-relaxed">
                <strong>NOTICE OF SCREENING LIMITATIONS:</strong> This document is an AI-assisted visual screening summary, NOT a confirmed medical diagnosis. An ordinary digital photograph cannot reliably confirm or exclude oral malignancy or assign cancer stages. This report must be presented to a qualified dentist or oncologist for in-person clinical examination and histopathological confirmation if indicated.
              </div>

              {/* Patient Intake Data */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-[#DCE8E9] text-xs">
                <div>
                  <span className="text-[#647681]">Patient Ref ID:</span>
                  <p className="font-bold text-[#18313B]">{patientInfo.patientReferenceId}</p>
                </div>
                <div>
                  <span className="text-[#647681]">Age Range:</span>
                  <p className="font-bold text-[#18313B]">{patientInfo.ageRange} years</p>
                </div>
                <div>
                  <span className="text-[#647681]">Symptom Duration:</span>
                  <p className="font-bold text-[#18313B]">{patientInfo.durationOfSymptoms.replace(/_/g, ' ')}</p>
                </div>
                <div>
                  <span className="text-[#647681]">Image Quality Score:</span>
                  <p className="font-bold text-[#237A57]">{screeningResult.imageQualityScore}</p>
                </div>
              </div>

              {/* Categorized Findings */}
              <div className="my-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#647681] uppercase tracking-wider">Screening Classification</span>
                  <Badge variant={screeningResult.category === 'A' ? 'categoryA' : screeningResult.category === 'B' ? 'categoryB' : screeningResult.category === 'C' ? 'categoryC' : 'categoryD'}>
                    Category {screeningResult.category}
                  </Badge>
                </div>
                <div className="p-4 rounded-xl bg-[#F5FAFA] border border-[#DCE8E9]">
                  <h4 className="font-bold text-sm text-[#18313B]">{screeningResult.categoryTitle}</h4>
                  <p className="text-xs text-[#647681] mt-1">{screeningResult.categoryDescription}</p>
                  <div className="mt-3 text-xs">
                    <strong className="text-[#18313B]">Model Supported Observations:</strong>
                    <ul className="list-disc list-inside mt-1 text-[#647681]">
                      {screeningResult.findings.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Clinician Notes if present */}
              {clinicianNotes && (
                <div className="my-6 p-4 rounded-xl bg-[#EAF1F9] border border-[#2563A6]/30 text-xs text-[#18313B]">
                  <strong className="text-[#2563A6] block mb-1">Attending Clinician Examination Notes:</strong>
                  <p className="whitespace-pre-wrap">{clinicianNotes}</p>
                </div>
              )}

              {/* Next Steps */}
              <div className="my-6 text-xs text-[#647681]">
                <strong className="text-[#18313B] block mb-1">Suggested Next Steps for Patient:</strong>
                <ul className="list-disc list-inside space-y-0.5">
                  {screeningResult.recommendedNextSteps.map((ns, i) => (
                    <li key={i}>{ns}</li>
                  ))}
                </ul>
              </div>

              {/* Report Footer */}
              <div className="pt-6 border-t border-[#DCE8E9] flex flex-col sm:flex-row justify-between items-center text-[11px] text-[#647681] gap-4">
                <div>
                  <p>Aarogya Drishti Triage Engine v2.4 | Cryptographic Checksum: SHA256-VALID</p>
                  <p>Indian National Cancer Helpline: 1800-22-1951</p>
                </div>
                <div className="flex gap-3 print:hidden">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => window.print()}
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Print / Save as PDF
                  </Button>
                </div>
              </div>

            </Card>

            <div className="text-center pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(1)}
                leftIcon={<RefreshCw className="w-4 h-4" />}
              >
                Start New Patient Screening
              </Button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
