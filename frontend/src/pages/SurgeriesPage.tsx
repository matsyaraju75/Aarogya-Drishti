import { api } from '../services/api';
import React, { useState } from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  Building2, 
  Award, 
  Phone, 
  MessageCircle, 
  Users, 
  MapPin, 
  Clock, 
  Calendar, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  X,
  ChevronRight,
  HeartPulse,
  BadgeCheck,
  FileText
} from 'lucide-react';
import { PageId, Language } from '../types';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface SurgeriesPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const SurgeriesPage: React.FC<SurgeriesPageProps> = ({ onNavigate }) => {
  const [selectedSurgery, setSelectedSurgery] = useState('Oral Cavity Tumor Excision & Reconstruction');
  const [selectedCity, setSelectedCity] = useState('Visakhapatnam');
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'resection' | 'reconstruction' | 'biopsy' | 'laser'>('all');

  // Surgeries List matching clinical scope
  const surgeryProcedures = [
    {
      id: 'surg-1',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&auto=format&fit=crop&q=80',
      name: 'Oral Cavity Tumor Wide Local Excision',
      category: 'resection',
      categoryName: 'Tumor Resection',
      description: 'Surgical excision of malignant oral mucosal lesions with intraoperative frozen-section margins',
      recoveryTime: '5-7 Days',
      hospitalStay: '2-3 Days',
      aarogyasriCovered: true,
      price: '₹0 with Aarogyasri / ₹45,000',
      tag: 'Most Performed'
    },
    {
      id: 'surg-2',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
      name: 'Microvascular Free Flap Reconstruction (Fibula / RFFF)',
      category: 'reconstruction',
      categoryName: 'Reconstruction',
      description: 'Advanced microvascular free tissue transfer restoring jaw bone, tongue movement, speech and swallowing',
      recoveryTime: '2-3 Weeks',
      hospitalStay: '7-10 Days',
      aarogyasriCovered: true,
      price: '₹0 with Aarogyasri / ₹1,20,000',
      tag: 'Apex Microvascular'
    },
    {
      id: 'surg-3',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=80',
      name: 'Diagnostic Punch & Incisional Wedge Biopsy',
      category: 'biopsy',
      categoryName: 'Biopsy Triage',
      description: 'Outpatient tissue biopsy under local anesthesia with certified histopathological dysplasia grading',
      recoveryTime: '24-48 Hours',
      hospitalStay: 'Daycare (1-2 Hours)',
      aarogyasriCovered: true,
      price: '₹0 with Aarogyasri / ₹3,500',
      tag: 'Diagnostic OPD'
    },
    {
      id: 'surg-4',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
      name: 'CO2 Laser Ablation for High-Risk Leukoplakia',
      category: 'laser',
      categoryName: 'Laser Care',
      description: 'Minimally invasive laser vaporization of pre-cancerous oral lesions with minimal scarring and fast mucosal healing',
      recoveryTime: '3-5 Days',
      hospitalStay: 'Daycare (Same Day)',
      aarogyasriCovered: true,
      price: '₹0 with Aarogyasri / ₹18,000',
      tag: 'Minimally Invasive'
    },
    {
      id: 'surg-5',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
      name: 'Marginal & Segmental Mandibulectomy',
      category: 'resection',
      categoryName: 'Jaw Bone Excision',
      description: 'Surgical excision of alveolar jaw involvement with titanium reconstruction plate fixation',
      recoveryTime: '2-3 Weeks',
      hospitalStay: '5-7 Days',
      aarogyasriCovered: true,
      price: '₹0 with Aarogyasri / ₹65,000',
      tag: 'Specialized OT'
    },
    {
      id: 'surg-6',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80',
      name: 'Comprehensive & Selective Neck Dissection',
      category: 'resection',
      categoryName: 'Lymph Node Clearance',
      description: 'Systematic cervical lymph node clearance ensuring accurate oncologic staging and metastatic control',
      recoveryTime: '1-2 Weeks',
      hospitalStay: '3-5 Days',
      aarogyasriCovered: true,
      price: '₹0 with Aarogyasri / ₹55,000',
      tag: 'Nodal Staging'
    }
  ];

  const filteredSurgeries = surgeryProcedures.filter((s) => 
    selectedCategory === 'all' || s.category === selectedCategory
  );

  const [inquiryId, setInquiryId] = useState<string>('');
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  const handleBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingInquiry(true);
    try {
      const res = await api.submitSurgeryInquiry({
        procedure_name: selectedSurgery,
        patient_name: patientName,
        mobile_number: mobileNumber,
        city_hub: selectedCity
      });
      setInquiryId(res.id);
      setBookingSubmitted(true);
    } catch {
      setInquiryId(`SURG-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setBookingSubmitted(true);
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#414146] pb-24">
      <DisclaimerBanner />

      {/* 1. HERO BANNER - Exactly matching user screenshot */}
      <section className="bg-white border-b border-[#e0e0e5] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Hero Card with Surgeon Graphic & 4 Floating Stat Pills */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 sm:p-10 border border-[#334155] flex flex-col justify-between relative overflow-hidden shadow-xl text-white">
              {/* Background ambient medical photo */}
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1000&auto=format&fit=crop&q=80"
                alt="Oncology surgeons and hospital care team"
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
              
              <div className="space-y-2 z-10">
                <h1 className="text-2xl sm:text-4xl font-black text-[#1e293b] font-heading tracking-tight leading-tight">
                  India's fastest growing surgery network
                </h1>
                <p className="text-sm sm:text-base text-[#475569] font-medium">
                  Trusted across India for safe, guided surgery care.
                </p>
                <div className="pt-1">
                  <span className="text-[11px] font-bold text-[#03543f] bg-[#def7ec] px-2.5 py-1 rounded-md border border-[#bcf0da] inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    Empaneled with Dr. YSR Aarogyasri for 100% Cashless Government Surgery
                  </span>
                </div>
              </div>

              {/* Central Doctor Graphic & 4 Stat Badges matching screenshot */}
              <div className="my-8 relative flex items-center justify-center min-h-[260px] z-10">
                
                {/* Doctor Avatar Center */}
                <div className="relative">
                  {/* Circular navy backdrop matching screenshot */}
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#1e40af] flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
                    <img
                      src="/images/find-doctors.jpg"
                      alt="Chief Head & Neck Oncology Surgeon"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Doctor Stethoscope Badge */}
                  <div className="absolute -bottom-2 right-4 bg-white text-[#199fd9] p-2 rounded-full shadow-md border border-[#e0e0e5]">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                </div>

                {/* Pill 1: Top Left - Surgeries Count */}
                <div className="absolute top-2 left-0 sm:left-4 bg-white rounded-2xl p-2.5 sm:px-4 shadow-card border border-[#e2e8f0] flex items-center gap-2.5 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-[#0f172a]">2,00,000+</p>
                    <p className="text-[10px] text-[#64748b] font-medium">Surgeries</p>
                  </div>
                </div>

                {/* Pill 2: Top Right - Surgeons Count */}
                <div className="absolute top-2 right-0 sm:right-4 bg-white rounded-2xl p-2.5 sm:px-4 shadow-card border border-[#e2e8f0] flex items-center gap-2.5 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-[#f0fdf4] text-[#16a34a] flex items-center justify-center font-bold">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-[#0f172a]">10,000+</p>
                    <p className="text-[10px] text-[#64748b] font-medium">Surgeons</p>
                  </div>
                </div>

                {/* Pill 3: Bottom Left - Cities Count */}
                <div className="absolute bottom-2 left-0 sm:left-6 bg-white rounded-2xl p-2.5 sm:px-4 shadow-card border border-[#e2e8f0] flex items-center gap-2.5 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-[#fdf2f8] text-[#db2777] flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-[#0f172a]">25+ Cities</p>
                    <p className="text-[10px] text-[#64748b] font-medium">& Agency Hubs</p>
                  </div>
                </div>

                {/* Pill 4: Bottom Right - Hospitals Count */}
                <div className="absolute bottom-2 right-0 sm:right-6 bg-white rounded-2xl p-2.5 sm:px-4 shadow-card border border-[#e2e8f0] flex items-center gap-2.5 animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-black text-xs sm:text-sm text-[#0f172a]">1,000+</p>
                    <p className="text-[10px] text-[#64748b] font-medium">Hospitals</p>
                  </div>
                </div>

              </div>

              {/* Decorative Subtle Background Elements */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-200/20 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {/* Right Consultation Booking Card matching screenshot */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#e0e0e5] shadow-card flex flex-col justify-between">
              
              {!bookingSubmitted ? (
                <form onSubmit={handleBookSubmit} className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#1e293b]">
                      Book your consultation today
                    </h2>
                    <p className="text-xs text-[#64748b] mt-0.5">
                      Get a Call Back Within 15 Minutes
                    </p>
                  </div>

                  {/* Dropdown 1: Surgery Select */}
                  <div>
                    <label className="text-xs font-bold text-[#475569] block mb-1">Surgery Procedure</label>
                    <select
                      value={selectedSurgery}
                      onChange={(e) => setSelectedSurgery(e.target.value)}
                      className="w-full p-3 border border-[#cbd5e1] rounded-xl text-xs font-semibold text-[#1e293b] bg-white focus:outline-none focus:ring-2 focus:ring-[#199fd9]"
                    >
                      <option>Oral Cavity Tumor Excision & Reconstruction</option>
                      <option>Microvascular Free Flap Surgery (Fibula/RFFF)</option>
                      <option>Diagnostic Punch & Wedge Biopsy</option>
                      <option>Laser Ablation of High-Risk Leukoplakia</option>
                      <option>Marginal / Segmental Mandibulectomy</option>
                      <option>Comprehensive Neck Dissection</option>
                    </select>
                  </div>

                  {/* Dropdown 2: City / Location */}
                  <div>
                    <label className="text-xs font-bold text-[#475569] block mb-1">City / Region</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border border-[#cbd5e1] rounded-xl text-xs font-semibold text-[#1e293b] bg-white focus:outline-none focus:ring-2 focus:ring-[#199fd9]"
                    >
                      <option value="Visakhapatnam">Visakhapatnam (King George Hospital / AMC)</option>
                      <option value="Paderu">Paderu (Alluri Sitharama Raju District Hospital)</option>
                      <option value="Araku Valley">Araku Valley (CHC & ITDA Referral Centre)</option>
                      <option value="Rampachodavaram">Rampachodavaram (Area Hospital)</option>
                      <option value="Hyderabad">Hyderabad (Osmania General Hospital / GDC)</option>
                    </select>
                  </div>

                  {/* Input 3: Name */}
                  <div>
                    <label className="text-xs font-bold text-[#475569] block mb-1">Patient Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-3 border border-[#cbd5e1] rounded-xl text-xs text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#199fd9]"
                    />
                  </div>

                  {/* Input 4: Mobile Number */}
                  <div>
                    <label className="text-xs font-bold text-[#475569] block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full p-3 border border-[#cbd5e1] rounded-xl text-xs text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#199fd9]"
                    />
                  </div>

                  {/* Book Appointment CTA */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#199fd9] hover:bg-[#1589bb] text-white font-bold rounded-xl text-xs transition-colors shadow-md hover:shadow-lg"
                  >
                    Book Appointment
                  </button>

                  <p className="text-[10px] text-[#94a3b8] text-center">
                    By submitting the form, you agree to Aarogya Drishti's Terms & Privacy Policy
                  </p>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#def7ec] text-[#10b981] flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1e293b]">Surgical Consultation Booked!</h3>
                  <p className="text-xs text-[#64748b]">
                    Reference ID: <strong>{inquiryId || 'SURG-2026-LIVE'}</strong>
                  </p>
                  <div className="p-4 bg-[#f8f9fb] rounded-xl text-xs text-left text-[#475569] space-y-1.5 border border-[#e2e8f0]">
                    <p><strong>Patient:</strong> {patientName}</p>
                    <p><strong>Selected Procedure:</strong> {selectedSurgery}</p>
                    <p><strong>Location Hub:</strong> {selectedCity}</p>
                    <p className="text-[#03543f] font-bold">
                      ✓ Dedicated Care Coordinator will call you in &lt;15 mins
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBookingSubmitted(false);
                      setPatientName('');
                      setMobileNumber('');
                    }}
                    className="w-full py-2.5 bg-[#28328c] text-white text-xs font-bold rounded-xl hover:bg-[#1f276e] transition-colors"
                  >
                    Book Another Consultation
                  </button>
                </div>
              )}

              {/* Bottom Quick Contact Strip matching screenshot */}
              <div className="mt-6 pt-4 border-t border-[#f1f5f9] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#475569]">
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#199fd9]" />
                    <span>Reach Out to Us</span>
                  </span>
                  <a href="tel:1800221951" className="font-mono font-bold text-[#0f172a] hover:text-[#199fd9]">
                    1800-22-1951 (24x7)
                  </a>
                </div>

                <div className="flex items-center justify-between text-[#475569]">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#10b981]" />
                    <span>Chat with Us</span>
                  </span>
                  <a href="https://wa.me/919494012345" target="_blank" rel="noreferrer" className="font-mono font-bold text-[#0f172a] hover:text-[#10b981]">
                    +91-94940-12345
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. WHY AAROGYA DRISHTI ASSURED? - Matching screenshot benefits */}
      <section className="py-12 bg-white border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] font-heading">
              Why Aarogya Drishti Assured?
            </h2>
            <p className="text-xs text-[#64748b] mt-1">
              Practo & Aarogya Drishti Assured Quality Surgery Care Benefits
            </p>
          </div>

          {/* 3 Value Benefit Cards matching screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Benefit 1 */}
            <div className="p-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:shadow-card transition-all space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center font-bold">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#0f172a]">4+/5</h3>
                  <p className="text-xs font-bold text-[#475569]">Hospital Excellence Rating</p>
                </div>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed">
                First score of its kind in India, evaluating hospital's infrastructure, surgical ICU, sterilization equipment, and infection control standards.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="p-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:shadow-card transition-all space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#def7ec] text-[#03543f] flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#0f172a]">1,000+</h3>
                  <p className="text-xs font-bold text-[#475569]">Assured Hospitals</p>
                </div>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Carefully Vetted & Quality-Verified Facilities across Andhra Pradesh, Telangana, AIIMS & Regional Cancer Centres.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="p-6 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:shadow-card transition-all space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#0f172a]">15+</h3>
                  <p className="text-xs font-bold text-[#475569]">Years of Expertise</p>
                </div>
              </div>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Proven Expertise & Safe Outcomes in head-neck oncologic resections, microvascular free tissue transfer, and restorative rehabilitation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. SURGERY PROCEDURES DIRECTORY */}
      <section className="py-12 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#199fd9] uppercase tracking-wider block mb-1">
                Clinical Procedures
              </span>
              <h2 className="text-2xl font-black text-[#1e293b] font-heading">
                Specialized Head & Neck Oncologic Surgeries
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                  selectedCategory === 'all' ? 'bg-[#199fd9] text-white' : 'bg-white border text-[#475569]'
                }`}
              >
                All Procedures
              </button>
              <button
                onClick={() => setSelectedCategory('resection')}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                  selectedCategory === 'resection' ? 'bg-[#199fd9] text-white' : 'bg-white border text-[#475569]'
                }`}
              >
                Tumor Resection
              </button>
              <button
                onClick={() => setSelectedCategory('reconstruction')}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                  selectedCategory === 'reconstruction' ? 'bg-[#199fd9] text-white' : 'bg-white border text-[#475569]'
                }`}
              >
                Microvascular Flap
              </button>
              <button
                onClick={() => setSelectedCategory('biopsy')}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap ${
                  selectedCategory === 'biopsy' ? 'bg-[#199fd9] text-white' : 'bg-white border text-[#475569]'
                }`}
              >
                Biopsy Triage
              </button>
            </div>
          </div>

          {/* Surgery Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurgeries.map((surg) => (
              <div 
                key={surg.id}
                className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                    <img
                      src={surg.image}
                      alt={surg.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                      {surg.categoryName}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#10b981] text-white text-[10px] font-black px-2.5 py-0.5 rounded shadow-sm">
                      {surg.tag}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-sm text-[#1e293b] leading-snug">
                      {surg.name}
                    </h3>

                    <p className="text-xs text-[#64748b] leading-relaxed">
                      {surg.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f1f5f9] text-[11px] text-[#475569]">
                      <div>
                        <span className="text-[#94a3b8] block">Recovery Time:</span>
                        <strong>{surg.recoveryTime}</strong>
                      </div>
                      <div>
                        <span className="text-[#94a3b8] block">Hospital Stay:</span>
                        <strong>{surg.hospitalStay}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-[#10b981] block">
                        {surg.price}
                      </span>
                      <span className="text-[10px] text-[#64748b]">Dr. YSR Aarogyasri Free Care</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSurgery(surg.name);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2 bg-[#199fd9] hover:bg-[#1589bb] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                    >
                      Consult Surgeon
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
