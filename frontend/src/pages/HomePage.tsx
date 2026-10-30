import { SpecialtySearchPicker } from '../components/ui/SpecialtySearchPicker';
import { AgencyLocationPicker } from '../components/ui/AgencyLocationPicker';
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Stethoscope, 
  Users, 
  FileText, 
  Camera, 
  Cpu, 
  Clock, 
  Award, 
  ChevronRight, 
  ExternalLink, 
  Info, 
  HelpCircle, 
  Building2, 
  Lock, 
  Sparkles,
  MapPin,
  Video,
  FlaskConical,
  Scissors,
  Calendar,
  ThumbsUp,
  Palette,
  Crosshair,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { PageId, Language } from '../types';
import { translations } from '../i18n/translations';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import { PractoDesignSystemModal } from '../components/ui/PractoDesignSystemModal';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, language }) => {
  const t = translations[language];
  const [showDsModal, setShowDsModal] = useState(false);

  // Practo Omni Searchbox state
  const [searchLocation, setSearchLocation] = useState('Araku Valley');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Quick 60-second interactive clinical triage assessment
  const [quizSymptom, setQuizSymptom] = useState<boolean | null>(null);
  const [quizDuration, setQuizDuration] = useState<boolean | null>(null);
  const [quizTobacco, setQuizTobacco] = useState<boolean | null>(null);

  const getTriageRecommendation = () => {
    if (quizSymptom === true && quizDuration === true) {
      return {
        level: 'urgent',
        title: 'Priority Clinical Review Indicated',
        desc: 'A mucosal sore persisting > 14 days meets clinical criteria for in-person dental or oncology examination.',
        badge: 'Category D Criteria',
        badgeVariant: 'danger' as const
      };
    }
    if (quizSymptom === true && quizDuration === false) {
      return {
        level: 'monitor',
        title: 'Observation & Image Screening Advised',
        desc: 'Monitor lesion closely. If not resolved within 14 days, clinical assessment is recommended.',
        badge: 'Category B / Monitoring',
        badgeVariant: 'warning' as const
      };
    }
    if (quizTobacco === true) {
      return {
        level: 'preventive',
        title: 'Routine Preventive Screening Advised',
        desc: 'Tobacco or areca nut usage elevates risk. Periodic mucosal screening ensures early detection.',
        badge: 'Preventive Category A',
        badgeVariant: 'info' as const
      };
    }
    return {
      level: 'routine',
      title: 'Routine Health Maintenance',
      desc: 'Maintain standard 6-month dental checkups and perform monthly oral self-checks.',
      badge: 'Healthy Maintenance',
      badgeVariant: 'success' as const
    };
  };

  const recommendation = getTriageRecommendation();

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setSearchLocation('Visakhapatnam (AMC / KGH Node)');
      setIsDetectingLocation(false);
    }, 800);
  };

  const handlePractoSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation) {
      localStorage.setItem('aarogya_selected_location', searchLocation);
    }
    if (searchQuery) {
      localStorage.setItem('aarogya_search_query', searchQuery);
    }
    onNavigate('find-specialist');
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] font-sans">
      
      {/* 1. Mandatory Clinical Disclaimer Banner */}
      <DisclaimerBanner languageNotice={t.disclaimerNotice} />

      {/* Top Banner with Practo Design Token Inspector Trigger */}
      <div className="bg-[#f0f0f5] border-b border-[#e0e0e5] py-2 px-4 sm:px-8 text-xs flex justify-between items-center text-[#414146]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#199fd9]">Aarogya Drishti Connected Healthcare Architecture</span>
          <span className="hidden sm:inline text-[#737382]">| WCAG 2.2 AA Verified Medical Interface</span>
        </div>
        <button
          type="button"
          onClick={() => setShowDsModal(true)}
          className="inline-flex items-center gap-1.5 font-bold text-[#199fd9] hover:underline"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Design Tokens Inspector</span>
        </button>
      </div>

      {/* 2. Practo Authentic Hero Section with Omni-Searchbox */}
      <section className="bg-gradient-to-b from-[#f0f0f5]/70 via-white to-[#F5FAFA] pt-10 pb-16 border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e0e0e5] shadow-xs text-xs font-semibold text-[#199fd9]">
              <ShieldCheck className="w-4 h-4 text-[#199fd9]" />
              <span>Aarogya Drishti Healthcare Node</span>
            </div>

            {/* Exact hero heading required */}
            <h1 className="text-3xl sm:text-5xl font-black text-[#414146] tracking-tight leading-[1.15] font-heading">
              {t.hero.heading}
            </h1>

            {/* Exact supporting text required */}
            <p className="text-sm sm:text-base text-[#737382] leading-relaxed max-w-2xl mx-auto">
              {t.hero.supportingText}
            </p>
          </div>

          {/* Practo Omni Searchbox Component */}
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handlePractoSearch} className="practo-search-container p-1 sm:p-1.5 flex flex-col sm:flex-row gap-2">
              
              {/* Locality & Agency Hospitals Selector (Left 42%) */}
              <div className="px-3 py-2 border-b sm:border-b-0 sm:border-r border-[#e0e0e5] sm:w-[42%] flex items-center">
                <AgencyLocationPicker
                  value={searchLocation}
                  onChange={setSearchLocation}
                  className="w-full"
                />
              </div>

              {/* Keyword & Specialty Searchbox (Right 58%) */}
              <div className="flex-1 flex items-center px-3 py-2">
                <SpecialtySearchPicker
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSelectSpecialty={(spec) => {
                    setSearchQuery(spec);
                    localStorage.setItem('aarogya_search_query', spec);
                    if (searchLocation) {
                      localStorage.setItem('aarogya_selected_location', searchLocation);
                    }
                    onNavigate('find-specialist');
                  }}
                  className="w-full"
                />
              </div>

              {/* Practo Search Button */}
              <button
                type="submit"
                className="practo-btn-primary shrink-0 sm:self-stretch"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Popular Search Suggestions Strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#737382] mt-3">
              <span className="font-bold text-[#414146]">Popular Searches:</span>
              {[
                'Oral Cavity & Leukoplakia',
                'Instant Video Consult',
                'Tissue Biopsy Specialist',
                'Dr. YSR Aarogyasri Free Care',
                'Dentist Near Me'
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setSearchQuery(chip);
                    onNavigate('find-specialist');
                  }}
                  className="px-2.5 py-1 rounded-full bg-white border border-[#e0e0e5] hover:border-[#199fd9] hover:text-[#199fd9] text-[11px] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Hero Action CTAs */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('screening')}
                className="px-6 py-3 bg-[#199fd9] hover:bg-[#1589bb] text-white font-bold text-sm rounded shadow-sm hover:shadow transition-all flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>{t.hero.primaryBtn}</span>
              </button>

              <button
                onClick={() => onNavigate('warning-signs')}
                className="px-6 py-3 bg-white border border-[#b4b4be] hover:border-[#787887] text-[#414146] font-bold text-sm rounded hover:bg-[#f0f0f5] transition-all flex items-center gap-2"
              >
                <AlertTriangle className="w-4 h-4 text-[#f59e0b]" />
                <span>{t.hero.secondaryBtn}</span>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Practo 5 Top Value Proposition Cards (With Real Images) */}
      <section className="py-14 bg-white border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#199fd9] uppercase tracking-wider block mb-1">
              Aarogya Drishti Healthcare Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#414146] font-heading">
              Healthcare Services for Every Oral Health Need
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            
            {/* Pillar 1: Video Consult */}
            <div 
              onClick={() => onNavigate('video-consult')}
              className="practo-service-card cursor-pointer group flex flex-col justify-between bg-white rounded-2xl border border-[#e0e0e5] hover:border-[#199fd9] shadow-xs hover:shadow-card transition-all overflow-hidden"
            >
              <div className="h-40 overflow-hidden relative bg-[#f0f0f5]">
                <img
                  src="/images/video-consult.jpg"
                  alt="Instant video consultation with oral oncology specialist"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#199fd9] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  ⚡ 60-Sec Connect
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#1e293b] group-hover:text-[#199fd9] transition-colors">
                    Instant Video Consult
                  </h3>
                  <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                    Connect within minutes to verified oral medicine doctors & oncologists.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#199fd9]">
                  <span>Consult Online</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Pillar 2: Find Doctors */}
            <div 
              onClick={() => onNavigate('find-specialist')}
              className="practo-service-card cursor-pointer group flex flex-col justify-between bg-white rounded-2xl border border-[#e0e0e5] hover:border-[#199fd9] shadow-xs hover:shadow-card transition-all overflow-hidden"
            >
              <div className="h-40 overflow-hidden relative bg-[#f0f0f5]">
                <img
                  src="/images/find-doctors.jpg"
                  alt="Find oral specialists near you"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  ✓ Verified Clinics
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#1e293b] group-hover:text-[#199fd9] transition-colors">
                    Find Doctors
                  </h3>
                  <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                    Book in-person visits with verified MDS specialists in Agency & Vizag.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#199fd9]">
                  <span>Book Clinic Visit</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Pillar 3: Medicines (NEW) */}
            <div 
              onClick={() => onNavigate('medicines')}
              className="practo-service-card cursor-pointer group flex flex-col justify-between bg-white rounded-2xl border border-[#e0e0e5] hover:border-[#199fd9] shadow-xs hover:shadow-card transition-all overflow-hidden"
            >
              <div className="h-40 overflow-hidden relative bg-[#f0f0f5]">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"
                  alt="Oral health medicines and Jan Aushadhi generic substitutes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#087F8C] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  💊 Doorstep Delivery
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#1e293b] group-hover:text-[#199fd9] transition-colors">
                    Medicines & Pharmacy
                  </h3>
                  <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                    Oral ulcer pastes, OSMF antioxidants, NRT & generic substitutes up to 66% off.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#199fd9]">
                  <span>Order Medicines</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Pillar 4: Lab Tests & Biopsy */}
            <div 
              onClick={() => onNavigate('lab-tests')}
              className="practo-service-card cursor-pointer group flex flex-col justify-between bg-white rounded-2xl border border-[#e0e0e5] hover:border-[#199fd9] shadow-xs hover:shadow-card transition-all overflow-hidden"
            >
              <div className="h-40 overflow-hidden relative bg-[#f0f0f5]">
                <img
                  src="/images/lab-tests.jpg"
                  alt="Diagnostic biopsy and laboratory tests"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#f59e0b] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  🔬 NABL Certified
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#1e293b] group-hover:text-[#199fd9] transition-colors">
                    Lab Tests & Biopsy
                  </h3>
                  <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                    Incisional & punch biopsy histopathology and full body health checkups.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#199fd9]">
                  <span>Book Lab Tests</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Pillar 5: Surgeries (Real photo) */}
            <div 
              onClick={() => onNavigate('surgeries')}
              className="practo-service-card cursor-pointer group flex flex-col justify-between bg-white rounded-2xl border border-[#e0e0e5] hover:border-[#199fd9] shadow-xs hover:shadow-card transition-all overflow-hidden"
            >
              <div className="h-40 overflow-hidden relative bg-[#f0f0f5]">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=500&auto=format&fit=crop&q=80"
                  alt="Surgical oncology care operating theatre"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-[#10b981] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  Aarogyasri ₹0
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#1e293b] group-hover:text-[#199fd9] transition-colors">
                    Surgeries
                  </h3>
                  <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                    Free lesion excision, biopsy & reconstruction with dedicated care experts.
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs font-bold text-[#199fd9]">
                  <span>View Surgeries</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Practo "Consult Top Doctors Online for Any Health Concern" Specialities Grid */}
      <section className="py-16 bg-[#f0f0f5]/50 border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#414146] font-heading">
                Consult Top Doctors Online for Any Oral Concern
              </h2>
              <p className="text-xs text-[#737382] mt-1">
                Private online consultations with verified dental and oncology specialists
              </p>
            </div>
            <button
              onClick={() => onNavigate('find-specialist')}
              className="text-xs font-bold text-[#199fd9] hover:underline flex items-center gap-1"
            >
              <span>View All Specialities</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            
            <div 
              onClick={() => onNavigate('screening')}
              className="bg-white p-4 rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#e6f4f6] text-[#087F8C] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-bold text-[#414146] group-hover:text-[#199fd9]">Oral Pre-Cancer (OPMD)</h4>
              <p className="text-[11px] text-[#737382]">₹0 Free Screening</p>
            </div>

            <div 
              onClick={() => onNavigate('find-specialist')}
              className="bg-white p-4 rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#f0f9ff] text-[#199fd9] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-bold text-[#414146] group-hover:text-[#199fd9]">Oral Medicine & Biopsy</h4>
              <p className="text-[11px] text-[#059669] font-bold">Consult Now</p>
            </div>

            <div 
              onClick={() => onNavigate('find-specialist')}
              className="bg-white p-4 rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#fdf2f8] text-[#db2777] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Scissors className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-bold text-[#414146] group-hover:text-[#199fd9]">Head & Neck Surgery</h4>
              <p className="text-[11px] text-[#059669] font-bold">Consult Now</p>
            </div>

            <div 
              onClick={() => onNavigate('warning-signs')}
              className="bg-white p-4 rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#fffbeb] text-[#d97706] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-bold text-[#414146] group-hover:text-[#199fd9]">14-Day Tongue Ulcers</h4>
              <p className="text-[11px] text-[#d97706] font-bold">High Priority</p>
            </div>

            <div 
              onClick={() => onNavigate('education')}
              className="bg-white p-4 rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#fef2f2] text-[#dc2626] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-bold text-[#414146] group-hover:text-[#199fd9]">Gutka & OSMF Relief</h4>
              <p className="text-[11px] text-[#737382]">Self-Guide</p>
            </div>

            <div 
              onClick={() => onNavigate('find-specialist')}
              className="bg-white p-4 rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] transition-all cursor-pointer space-y-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-bold text-[#414146] group-hover:text-[#199fd9]">Govt Hospital OPDs</h4>
              <p className="text-[11px] text-[#059669] font-bold">Aarogyasri Free</p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Validated Result Categories & 60-Second Risk Screener */}
      <section className="py-16 bg-white border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Validated Categories Card */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-[#e0e0e5] shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-[#e0e0e5] pb-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-[#199fd9]" />
                  <h3 className="font-bold text-base text-[#414146]">
                    Standardized Clinical Screening Categories
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#10b981] bg-[#def7ec] px-2 py-0.5 rounded">
                  Non-Diagnostic
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#e8f5e9] border border-[#c8e6c9] rounded-lg">
                  <strong className="text-[#237a57] block font-bold">Category A: No suspicious feature detected</strong>
                  <span className="text-[#335c45]">Uniform oral mucosa observed. Regular oral hygiene advised; does not replace manual physical exam.</span>
                </div>
                <div className="p-3 bg-[#fff8e1] border border-[#ffe082] rounded-lg">
                  <strong className="text-[#a96a12] block font-bold">Category B: Visible abnormality detected</strong>
                  <span className="text-[#5c4520]">Surface hyperkeratosis or redness observed. In-person clinical dental consultation recommended within 1-2 weeks.</span>
                </div>
                <div className="p-3 bg-[#eceff1] border border-[#cfd8dc] rounded-lg">
                  <strong className="text-[#546e7a] block font-bold">Category C: Image inconclusive</strong>
                  <span className="text-[#37474f]">Sub-optimal lighting, motion blur, or salivary glare. Model refuses prediction to avoid false reassurance.</span>
                </div>
                <div className="p-3 bg-[#ffebee] border border-[#ffcdd2] rounded-lg">
                  <strong className="text-[#b42332] block font-bold">Category D: Urgent clinical review recommended</strong>
                  <span className="text-[#5c1d24]">High-risk visual lesion characteristics meeting clinical referral criteria. Urgent specialist exam urged.</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive 60-Second Triage Screener */}
            <div className="lg:col-span-6 bg-[#f0f0f5]/70 rounded-2xl p-6 sm:p-8 border border-[#e0e0e5] shadow-card space-y-4">
              <div>
                <span className="text-[10px] font-bold text-[#199fd9] uppercase tracking-wider block">
                  Quick Patient Assessment
                </span>
                <h3 className="text-xl font-bold text-[#414146] mt-0.5">
                  60-Second Oral Health Checker
                </h3>
                <p className="text-xs text-[#737382]">
                  Check if your symptoms warrant an immediate image screening or doctor consult.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#e0e0e5] space-y-2 text-xs">
                  <p className="font-bold text-[#414146]">1. Sore or red/white patch inside mouth?</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setQuizSymptom(true)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${quizSymptom === true ? 'bg-[#199fd9] text-white' : 'bg-[#f0f0f5] text-[#414146]'}`}
                    >
                      Yes, sore present
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setQuizSymptom(false);
                        setQuizDuration(false);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${quizSymptom === false ? 'bg-[#10b981] text-white' : 'bg-[#f0f0f5] text-[#414146]'}`}
                    >
                      No sores
                    </button>
                  </div>
                </div>

                {quizSymptom === true && (
                  <div className="bg-white p-3.5 rounded-xl border border-[#e0e0e5] space-y-2 text-xs animate-fadeIn">
                    <p className="font-bold text-[#414146]">2. Has it lasted more than 14 days?</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setQuizDuration(true)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${quizDuration === true ? 'bg-[#ef4444] text-white' : 'bg-[#f0f0f5] text-[#414146]'}`}
                      >
                        Yes, &gt; 14 days
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuizDuration(false)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${quizDuration === false ? 'bg-[#f59e0b] text-white' : 'bg-[#f0f0f5] text-[#414146]'}`}
                      >
                        Recent (&lt; 14 days)
                      </button>
                    </div>
                  </div>
                )}

                <div className="bg-white p-3.5 rounded-xl border border-[#e0e0e5] space-y-2 text-xs">
                  <p className="font-bold text-[#414146]">3. History of gutka, areca nut, or tobacco?</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setQuizTobacco(true)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${quizTobacco === true ? 'bg-[#28328c] text-white' : 'bg-[#f0f0f5] text-[#414146]'}`}
                    >
                      Yes, tobacco use
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuizTobacco(false)}
                      className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${quizTobacco === false ? 'bg-[#10b981] text-white' : 'bg-[#f0f0f5] text-[#414146]'}`}
                    >
                      No, never
                    </button>
                  </div>
                </div>
              </div>

              {/* Instant Triage Output */}
              <div className="p-4 bg-white rounded-xl border border-[#e0e0e5] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#414146]">Triage Result:</span>
                  <Badge variant={recommendation.badgeVariant} size="sm">{recommendation.badge}</Badge>
                </div>
                <p className="text-xs text-[#737382]">{recommendation.desc}</p>
                <button
                  onClick={() => onNavigate('screening')}
                  className="w-full mt-2 practo-btn-primary"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Start AI Image Screening</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. Practo Healthcare Articles Feed */}
      <section className="py-16 bg-[#f0f0f5]/40 border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#414146] font-heading">
                Read Top Health Articles from Oral Oncology Specialists
              </h2>
              <p className="text-xs text-[#737382] mt-1">
                Evidence-based oral hygiene, pre-cancer recognition, and prevention guides
              </p>
            </div>
            <button
              onClick={() => onNavigate('education')}
              className="text-xs font-bold text-[#199fd9] hover:underline flex items-center gap-1"
            >
              <span>See All Articles</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div 
              onClick={() => onNavigate('warning-signs')}
              className="bg-white rounded-xl border border-[#e0e0e5] overflow-hidden hover:shadow-card transition-shadow cursor-pointer"
            >
              <div className="h-44 bg-[#ffebee] flex items-center justify-center p-6 text-center">
                <Clock className="w-12 h-12 text-[#ef4444] mb-2" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#ef4444] uppercase tracking-wider">Clinical Consensus</span>
                <h3 className="font-bold text-sm text-[#414146] hover:text-[#199fd9]">
                  Why the 14-Day Rule is Critical for Oral Ulcers
                </h3>
                <p className="text-xs text-[#737382] line-clamp-2">
                  Learn why benign sores heal within two weeks and how persistent ulcers indicate early dysplasia.
                </p>
                <div className="pt-2 text-xs font-bold text-[#199fd9] flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('education')}
              className="bg-white rounded-xl border border-[#e0e0e5] overflow-hidden hover:shadow-card transition-shadow cursor-pointer"
            >
              <div className="h-44 bg-[#e6f4ea] flex items-center justify-center p-6 text-center">
                <ShieldCheck className="w-12 h-12 text-[#10b981] mb-2" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-wider">Early Detection</span>
                <h3 className="font-bold text-sm text-[#414146] hover:text-[#199fd9]">
                  Leukoplakia vs Normal White Patches: What to Check
                </h3>
                <p className="text-xs text-[#737382] line-clamp-2">
                  Recognizing non-scrapable plaques, homogeneous versus speckled lesions, and biopsy protocols.
                </p>
                <div className="pt-2 text-xs font-bold text-[#199fd9] flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('education')}
              className="bg-white rounded-xl border border-[#e0e0e5] overflow-hidden hover:shadow-card transition-shadow cursor-pointer"
            >
              <div className="h-44 bg-[#f0f9ff] flex items-center justify-center p-6 text-center">
                <Stethoscope className="w-12 h-12 text-[#199fd9] mb-2" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold text-[#199fd9] uppercase tracking-wider">Preventive Care</span>
                <h3 className="font-bold text-sm text-[#414146] hover:text-[#199fd9]">
                  How to Perform a 2-Minute Monthly Oral Self-Check
                </h3>
                <p className="text-xs text-[#737382] line-clamp-2">
                  Step-by-step mirror examination of gums, cheek mucosa, tongue borders, and floor of mouth.
                </p>
                <div className="pt-2 text-xs font-bold text-[#199fd9] flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Practo Patient Testimonials & Stories */}
      <section className="py-16 bg-white border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-[#414146] font-heading">
              What Our Patients Have to Say
            </h2>
            <p className="text-xs text-[#737382] mt-1">
              Real stories of timely detection, telemedicine consultations, and specialist care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-[#e0e0e5] bg-white shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#199fd9] text-white font-bold flex items-center justify-center text-sm">
                  RB
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#414146]">Ramesh Babu</h4>
                  <p className="text-[10px] text-[#737382]">Visakhapatnam, Andhra Pradesh</p>
                </div>
              </div>
              <p className="text-xs text-[#414146] leading-relaxed">
                "Had a white patch on my cheek for 3 weeks. Did the AI screening, which flagged it as Category B. Booked Dr. Srinivas Rao through the portal under Aarogyasri. Biopsy confirmed mild dysplasia and treatment started early."
              </p>
              <div className="pt-2 text-[11px] text-[#10b981] font-bold flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> Recommends Dr. Srinivas Rao (KGH)
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#e0e0e5] bg-white shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#087F8C] text-white font-bold flex items-center justify-center text-sm">
                  LS
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#414146]">Lakshmi Somulu</h4>
                  <p className="text-[10px] text-[#737382]">Paderu, ITDA Tribal Region</p>
                </div>
              </div>
              <p className="text-xs text-[#414146] leading-relaxed">
                "In our agency village, specialist visits usually require traveling 120km to Vizag. The ASHA worker used Aarogya Drishti and Dr. Ananya Varma conducted a video call directly from Paderu District Hospital."
              </p>
              <div className="pt-2 text-[11px] text-[#10b981] font-bold flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> Recommends Telemedicine Care
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[#e0e0e5] bg-white shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#28328c] text-white font-bold flex items-center justify-center text-sm">
                  PK
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#414146]">Prashant Kumar</h4>
                  <p className="text-[10px] text-[#737382]">Secunderabad, Telangana</p>
                </div>
              </div>
              <p className="text-xs text-[#414146] leading-relaxed">
                "Transparent results without fear-mongering. The screening report clearly distinguished preliminary image screening from final medical biopsy. Dr. Radhika Varma was reassuring and professional."
              </p>
              <div className="pt-2 text-[11px] text-[#10b981] font-bold flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" /> Recommends Osmania Dental Hospital
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Practo Design System Modal */}
      <PractoDesignSystemModal isOpen={showDsModal} onClose={() => setShowDsModal(false)} />

    </div>
  );
};
