import { api } from '../services/api';
import React, { useState } from 'react';
import { 
  Video, 
  Phone, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  User, 
  X, 
  Mic, 
  MicOff, 
  VideoOff, 
  Sparkles,
  HelpCircle,
  Building2,
  Stethoscope,
  Smile,
  Activity,
  Scan,
  Microscope,
  Award
} from 'lucide-react';
import { PageId, Language } from '../types';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface VideoConsultPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

interface SpecialtyCard {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  icon: 'omr' | 'ent' | 'dentist' | 'surgery' | 'pathology' | 'general' | 'gynae' | 'derma';
  concern: string;
  badge?: string;
  image: string;
}

export const VideoConsultPage: React.FC<VideoConsultPageProps> = ({ onNavigate }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Oral Medicine and Radiology Specialist');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultStep, setConsultStep] = useState<'details' | 'connecting' | 'call'>('details');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [consultType, setConsultType] = useState<'video' | 'audio'>('video');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callTimer, setCallTimer] = useState(12);

  // 25+ Specialities Data matching the screenshot structure
  const specialities: SpecialtyCard[] = [
    {
      id: 'omr',
      image: 'https://images.unsplash.com/photo-1594824813585-64906f30d07a?w=400&auto=format&fit=crop&q=80',
      name: 'Oral Medicine & Radiology',
      price: '₹0 / ₹199',
      originalPrice: '₹499',
      icon: 'omr',
      concern: 'Leukoplakia, OSMF, white/red patches',
      badge: 'Aarogyasri Free'
    },
    {
      id: 'ent',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
      name: 'ENT Specialist',
      price: '₹0 / ₹199',
      originalPrice: '₹599',
      icon: 'ent',
      concern: 'Mouth ulcers >14 days, throat hoarseness',
      badge: 'Popular'
    },
    {
      id: 'dentist',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&auto=format&fit=crop&q=80',
      name: 'Dentist (Dental Care)',
      price: '₹0 / ₹149',
      originalPrice: '₹399',
      icon: 'dentist',
      concern: 'Tooth pain, gum bleeding, pre-cancer triage',
      badge: 'Essential'
    },
    {
      id: 'surgery',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
      name: 'Head & Neck Oncology',
      price: '₹0 / ₹299',
      originalPrice: '₹999',
      icon: 'surgery',
      concern: 'Mouth tumor review, surgical second opinion',
      badge: 'Apex Specialist'
    },
    {
      id: 'pathology',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&auto=format&fit=crop&q=80',
      name: 'Oral Pathologist',
      price: '₹0 / ₹199',
      originalPrice: '₹499',
      icon: 'pathology',
      concern: 'Biopsy report analysis & dysplasia grading',
      badge: 'Biopsy Lab'
    },
    {
      id: 'general',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
      name: 'General Physician',
      price: '₹199',
      originalPrice: '₹399',
      icon: 'general',
      concern: 'Fever, fatigue, general health review'
    },
    {
      id: 'gynae',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
      name: 'Gynaecology',
      price: '₹249',
      originalPrice: '₹499',
      icon: 'gynae',
      concern: 'Women health, pregnancy & hormonal care'
    },
    {
      id: 'derma',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80',
      name: 'Dermatology',
      price: '₹249',
      originalPrice: '₹599',
      icon: 'derma',
      concern: 'Skin rashes, oral-mucosal lesions, allergies'
    }
  ];

  // Common Health Concerns Data
  const commonConcerns = [
    {
      title: 'White or Red Patch in Mouth',
      subtitle: 'Suspected Leukoplakia / Erythroplakia',
      doctor: 'Oral Medicine Specialist',
      fee: 'Free / ₹199'
    },
    {
      title: 'Mouth Ulcer not healing > 14 Days',
      subtitle: 'High clinical priority for biopsy assessment',
      doctor: 'ENT & Head-Neck Specialist',
      fee: 'Free / ₹199'
    },
    {
      title: 'Difficulty Opening Mouth (OSMF)',
      subtitle: 'Common among areca nut & gutkha chewers',
      doctor: 'Dental Surgeon / OMR',
      fee: 'Free / ₹149'
    },
    {
      title: 'Second Opinion on Biopsy Report',
      subtitle: 'Expert review by Tata Memorial & KGH Oncologists',
      doctor: 'Surgical Oncologist',
      fee: 'Free / ₹299'
    }
  ];

  // Live Available Doctors Online
  const onlineDoctors = [
    {
      name: 'Dr. K. Srinivas Rao',
      qualification: 'MBBS, MS, MCh (Head & Neck Surgical Oncology)',
      experience: '14 yrs exp',
      hospital: 'King George Hospital (KGH), Visakhapatnam',
      rating: '98%',
      avatar: 'SR',
      color: '#1d4ed8',
      specialty: 'Oral Cavity Oncology & Flap Surgery'
    },
    {
      name: 'Dr. P. Ananya Varma',
      qualification: 'BDS, MDS (Oral Maxillofacial Pathology)',
      experience: '9 yrs exp',
      hospital: 'District Hospital, Paderu (ITDA Tribal Node)',
      rating: '97%',
      avatar: 'AV',
      color: '#047857',
      specialty: 'OPMD & Tissue Biopsy Triage'
    },
    {
      name: 'Dr. V. Lavanya',
      qualification: 'MBBS, MS (ENT & Head-Neck Surgery)',
      experience: '10 yrs exp',
      hospital: 'Area Hospital, Rampachodavaram',
      rating: '97%',
      avatar: 'VL',
      color: '#0284c7',
      specialty: 'Oral Ulcers & Laryngeal Assessment'
    },
    {
      name: 'Dr. M. Suresh Kumar',
      qualification: 'BDS, MDS (Oral Medicine & Diagnosis)',
      experience: '11 yrs exp',
      hospital: 'Community Health Centre (CHC), Araku Valley',
      rating: '98%',
      avatar: 'SK',
      color: '#0d9488',
      specialty: 'Pre-cancer Triage & Tribal Tele-Oncology'
    }
  ];

  const handleStartConsult = (specialtyTitle?: string) => {
    if (specialtyTitle) {
      setSelectedSpecialty(specialtyTitle);
    }
    setConsultStep('details');
    setIsConsultModalOpen(true);
  };

  const handleConnectNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultStep('connecting');
    try {
      await api.startConsultation({
        specialty: selectedSpecialty,
        patient_name: patientName || 'Patient User',
        patient_phone: patientPhone || '+91 94941 00000',
        consult_type: consultType
      });
    } catch {
      // offline fallback
    }
    setTimeout(() => {
      setConsultStep('call');
    }, 2000);
  };

  const renderSpecialtyIcon = (icon: SpecialtyCard['icon']) => {
    switch (icon) {
      case 'omr': return <Scan className="w-6 h-6 text-[#087F8C]" />;
      case 'ent': return <Activity className="w-6 h-6 text-[#92400e]" />;
      case 'dentist': return <Smile className="w-6 h-6 text-[#0369a1]" />;
      case 'surgery': return <Stethoscope className="w-6 h-6 text-[#6d28d9]" />;
      case 'pathology': return <Microscope className="w-6 h-6 text-[#b91c1c]" />;
      default: return <User className="w-6 h-6 text-[#199fd9]" />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#414146]">
      <DisclaimerBanner />

      {/* 1. HERO BANNER - Exactly matching user screenshot */}
      <section className="bg-gradient-to-r from-[#fbf2eb] via-[#f8ede6] to-[#f4e2d6] border-b border-[#e8d8cc] py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#e8d8cc] text-xs font-bold text-[#087F8C] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                <span>Government Connected Care & Telemedicine Node</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-black text-[#414146] tracking-tight leading-[1.15] font-heading">
                  Skip the travel! <br />
                  <span className="text-[#199fd9]">Take Online Doctor Consultation</span>
                </h1>

                <p className="text-base sm:text-lg text-[#737382] font-medium">
                  Private consultation + Audio call • Starts at just ₹199
                </p>

                <p className="text-xs text-[#047857] font-bold bg-[#def7ec] inline-block px-2.5 py-1 rounded-md border border-[#bcf0da]">
                  ✓ 100% Cashless for Dr. YSR Aarogyasri beneficiaries & Tribal Agency residents
                </p>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => handleStartConsult()}
                  className="px-8 py-3.5 bg-[#199fd9] hover:bg-[#1589bb] text-white font-black text-sm rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Consult Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Badges Strip matching screenshot */}
              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-[#414146] font-semibold border-t border-[#e8d8cc]/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#199fd9]" />
                  <span>Verified Doctors</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#199fd9]" />
                  <span>Digital Prescription</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#199fd9]" />
                  <span>Free Followup</span>
                </div>
              </div>
            </div>

            {/* Right Image matching screenshot */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden shadow-card border-4 border-white/80 bg-white">
                <img
                  src="/images/video-consult.jpg"
                  alt="Online Video Doctor Consultation"
                  className="w-full h-72 sm:h-84 object-cover object-center"
                />
                
                {/* Floating live call overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-[#e0e0e5] shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#10b981]/15 text-[#10b981] flex items-center justify-center font-bold">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#414146]">Instant Video Connect</p>
                      <p className="text-[11px] text-[#737382]">Doctors available within 60 seconds</p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping"></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. 25+ SPECIALITIES SECTION - Exactly matching user screenshot */}
      <section className="py-12 bg-white border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#414146] font-heading">
                25+ Specialities
              </h2>
              <p className="text-xs sm:text-sm text-[#737382] mt-1">
                Consult with top doctors across specialities
              </p>
            </div>

            <button
              onClick={() => onNavigate('find-specialist')}
              className="px-4 py-2 border border-[#b4b4be] hover:border-[#414146] text-[#414146] font-bold text-xs rounded-md transition-colors self-start sm:self-auto hover:bg-[#f0f0f5]"
            >
              See all Specialities
            </button>
          </div>

          {/* Specialities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specialities.map((spec) => (
              <div
                key={spec.id}
                onClick={() => handleStartConsult(spec.name)}
                className="p-4 rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] hover:shadow-card transition-all cursor-pointer bg-white group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group-hover:scale-105 transition-transform shadow-xs">
                      <img
                        src={spec.image}
                        alt={spec.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {spec.badge && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#def7ec] text-[#03543f]">
                        {spec.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-[#414146] group-hover:text-[#199fd9] transition-colors">
                    {spec.name}
                  </h3>
                  
                  <p className="text-xs text-[#737382] mt-1 leading-snug line-clamp-2">
                    {spec.concern}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0f0f5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-black text-[#414146] block">{spec.price}</span>
                    <span className="text-[10px] text-[#737382] line-through">{spec.originalPrice}</span>
                  </div>
                  <span className="text-xs font-bold text-[#199fd9] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Consult <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. COMMON ORAL HEALTH CONCERNS & SYMPTOMS */}
      <section className="py-12 bg-[#f8f9fb] border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-bold text-[#199fd9] uppercase tracking-wider block mb-1">
              Priority Clinical Concerns
            </span>
            <h2 className="text-2xl font-black text-[#414146] font-heading">
              Common Oral Mucosal & Head-Neck Symptoms
            </h2>
            <p className="text-xs text-[#737382] mt-1">
              Connect directly with qualified specialists for early visual triage and biopsy guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonConcerns.map((c, i) => (
              <div 
                key={i}
                onClick={() => handleStartConsult(c.title)}
                className="p-5 bg-white rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] shadow-xs hover:shadow-card transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ef4444]"></span>
                    <h3 className="font-bold text-sm text-[#414146] group-hover:text-[#199fd9] transition-colors">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#737382]">{c.subtitle}</p>
                  <p className="text-[11px] text-[#087F8C] font-semibold">Recommended: {c.doctor}</p>
                </div>

                <div className="text-right shrink-0 ml-4">
                  <span className="text-xs font-bold text-[#047857] block">{c.fee}</span>
                  <button className="mt-2 px-3 py-1.5 bg-[#199fd9] text-white text-xs font-bold rounded hover:bg-[#1589bb] transition-colors">
                    Consult
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ONLINE SPECIALISTS READY TO CONNECT NOW */}
      <section className="py-12 bg-white border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#10b981] flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
                4 Specialists Online Right Now
              </span>
              <h2 className="text-2xl font-black text-[#414146] font-heading">
                Verified Oncologists & OMR Specialists
              </h2>
            </div>
            
            <button
              onClick={() => onNavigate('find-specialist')}
              className="text-xs text-[#199fd9] font-bold hover:underline flex items-center gap-1"
            >
              View Full Doctor Directory <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {onlineDoctors.map((doc, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border border-[#e0e0e5] bg-white hover:shadow-card transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0"
                      style={{ backgroundColor: doc.color }}
                    >
                      {doc.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-xs text-[#414146] truncate">{doc.name}</h3>
                        <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" title="Online Now"></span>
                      </div>
                      <p className="text-[11px] text-[#737382] truncate">{doc.experience}</p>
                    </div>
                  </div>

                  <p className="text-[11px] font-semibold text-[#087F8C] mb-1">{doc.specialty}</p>
                  <p className="text-[10px] text-[#737382] leading-tight line-clamp-2">{doc.hospital}</p>
                  
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-[#10b981] font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{doc.rating} Patient Satisfaction</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#f0f0f5]">
                  <button
                    onClick={() => handleStartConsult(doc.specialty)}
                    className="w-full py-2 bg-[#199fd9] hover:bg-[#1589bb] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Call Now (Online)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-12 bg-[#f8f9fb] border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-[#414146] font-heading mb-8">
            How Online Doctor Consultation Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-[#e0e0e5] text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center mx-auto mb-4 font-black text-xl">
                1
              </div>
              <h3 className="font-bold text-sm text-[#414146] mb-1">Select Specialty / Doctor</h3>
              <p className="text-xs text-[#737382] leading-relaxed">
                Choose from Oral Medicine, ENT, Dental or Head-Neck Oncology specialists.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e0e0e5] text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#def7ec] text-[#03543f] flex items-center justify-center mx-auto mb-4 font-black text-xl">
                2
              </div>
              <h3 className="font-bold text-sm text-[#414146] mb-1">Instant 60-Sec Video Call</h3>
              <p className="text-xs text-[#737382] leading-relaxed">
                Connect via secure, end-to-end encrypted HD video call on your smartphone or PC.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#e0e0e5] text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#ede9fe] text-[#6d28d9] flex items-center justify-center mx-auto mb-4 font-black text-xl">
                3
              </div>
              <h3 className="font-bold text-sm text-[#414146] mb-1">Digital Prescription & Followup</h3>
              <p className="text-xs text-[#737382] leading-relaxed">
                Download your certified digital prescription with valid medical council registration and free 7-day chat followup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE VIDEO CONSULT MODAL & SIMULATOR */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-fadeIn border border-[#e0e0e5]">
            
            {/* Modal Header */}
            <div className="p-4 bg-[#28328c] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-[#14bef0]" />
                <h3 className="font-bold text-sm">Aarogya Drishti Telemedicine Room</h3>
              </div>
              <button 
                onClick={() => setIsConsultModalOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: Patient intake details */}
            {consultStep === 'details' && (
              <form onSubmit={handleConnectNow} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#414146] block mb-1">Specialty Selected</label>
                  <input
                    type="text"
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full p-2.5 bg-[#f0f0f5] border border-[#e0e0e5] rounded-lg font-semibold text-[#414146]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#414146] block mb-1">Patient Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-2.5 border border-[#e0e0e5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#199fd9]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#414146] block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-2.5 border border-[#e0e0e5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#199fd9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#414146] block mb-1.5">Consultation Mode</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultType('video')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold ${
                        consultType === 'video'
                          ? 'border-[#199fd9] bg-[#e0f2fe] text-[#0369a1]'
                          : 'border-[#e0e0e5] text-[#737382]'
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      <span>HD Video Call</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultType('audio')}
                      className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold ${
                        consultType === 'audio'
                          ? 'border-[#199fd9] bg-[#e0f2fe] text-[#0369a1]'
                          : 'border-[#e0e0e5] text-[#737382]'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span>Private Audio Call</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#def7ec] rounded-xl text-[#03543f] text-[11px] font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10b981]" />
                  <span>Dr. YSR Aarogyasri Free Telemedicine Consultation Applied (₹0 fee)</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#199fd9] hover:bg-[#1589bb] text-white font-bold rounded-lg transition-colors text-sm shadow-md"
                >
                  Connect with Online Doctor (Starts in 60s)
                </button>
              </form>
            )}

            {/* STEP 2: Connecting animation */}
            {consultStep === 'connecting' && (
              <div className="p-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#199fd9]/20 text-[#199fd9] flex items-center justify-center mx-auto animate-pulse">
                  <Video className="w-8 h-8 animate-spin" />
                </div>
                <h4 className="font-bold text-base text-[#414146]">Connecting to Verified Specialist...</h4>
                <p className="text-xs text-[#737382]">
                  Assigning next available doctor from King George Hospital / ITDA Paderu Node
                </p>
                <div className="w-3/4 mx-auto bg-[#e0e0e5] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#199fd9] h-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}

            {/* STEP 3: Live Call Simulator Screen */}
            {consultStep === 'call' && (
              <div className="p-4 space-y-4">
                <div className="relative bg-slate-900 rounded-xl h-64 overflow-hidden flex items-center justify-center text-white">
                  {/* Doctor Video Feed Placeholder */}
                  <div className="text-center space-y-2">
                    <div className="w-20 h-20 rounded-full bg-[#087F8C] flex items-center justify-center text-xl font-bold mx-auto border-2 border-white">
                      SR
                    </div>
                    <div>
                      <p className="font-bold text-sm">Dr. K. Srinivas Rao (Live)</p>
                      <p className="text-[11px] text-white/70">Oncologist • KGH Visakhapatnam</p>
                    </div>
                    <span className="text-[10px] bg-[#10b981] text-white px-2 py-0.5 rounded-full font-bold">
                      ● Active Call: 00:{callTimer < 10 ? `0${callTimer}` : callTimer}
                    </span>
                  </div>

                  {/* Self PIP preview */}
                  <div className="absolute bottom-3 right-3 w-20 h-16 bg-slate-800 rounded-lg border border-white/30 flex items-center justify-center text-[10px] text-white/80">
                    {isVideoOff ? 'Video Off' : 'You (Patient)'}
                  </div>
                </div>

                {/* Call Control Buttons */}
                <div className="flex items-center justify-center gap-4 py-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-full transition-colors ${
                      isMuted ? 'bg-red-500 text-white' : 'bg-[#f0f0f5] text-[#414146] hover:bg-[#e0e0e5]'
                    }`}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={`p-3 rounded-full transition-colors ${
                      isVideoOff ? 'bg-red-500 text-white' : 'bg-[#f0f0f5] text-[#414146] hover:bg-[#e0e0e5]'
                    }`}
                  >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => {
                      setIsConsultModalOpen(false);
                      setConsultStep('details');
                    }}
                    className="p-3 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4 rotate-[135deg]" />
                    <span>End Call</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
