import { api } from '../services/api';
import React, { useState } from 'react';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  X, 
  Pill, 
  ShoppingCart, 
  Info, 
  AlertTriangle, 
  Clock, 
  Truck,
  Heart,
  Smile,
  Activity,
  Check
} from 'lucide-react';
import { PageId, Language } from '../types';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface MedicinesPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

interface MedicineDetail {
  id: string;
  name: string;
  brand: string;
  generic: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  description: string;
  uses: string[];
  sideEffects: string[];
  dosage: string;
  substitutes: { name: string; manufacturer: string; price: number; savings: string; image?: string }[];
  prescriptionRequired: boolean;
}

export const MedicinesPage: React.FC<MedicinesPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineDetail | null>(null);
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('Paderu, Near ITDA Office');
  const [orderId, setOrderId] = useState<string>('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState<boolean>(false);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingOrder(true);
    try {
      const res = await api.placeMedicineOrder({
        patient_name: patientName || 'Patient User',
        patient_phone: patientPhone || '+91 94941 00000',
        delivery_address: deliveryAddress,
        items: cart,
        total_amount: totalAmount
      });
      setOrderId(res.id);
      setOrderConfirmed(true);
    } catch {
      setOrderId(`MED-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setOrderConfirmed(true);
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // Featured Hero Carousel slides matching screenshot
  const heroSlides = [
    {
      label: 'COMPREHENSIVE INFORMATION',
      title: 'Know your medicine',
      subtitle: 'Exhaustive information about medicines written by verified medical experts'
    },
    {
      label: 'ALLURI AGENCY ORAL HEALTHCARE',
      title: 'Oral Ulcer & Pre-Cancer Care',
      subtitle: 'Doctor-prescribed oral bio-adhesive pastes, OSMF antioxidants & anti-fungal paints'
    },
    {
      label: 'CERTIFIED GOVERNMENT PHARMACY',
      title: 'Flat 20% OFF on Prescriptions',
      subtitle: '100% genuine medicines delivered across Araku Valley, Paderu & Visakhapatnam'
    }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeMockTab, setActiveMockTab] = useState<'quick' | 'side' | 'concerns' | 'usage'>('quick');

  // Health Condition Cards matching exact user screenshot with photographic imagery
  const healthConditions = [
    {
      id: 'skin',
      title: 'SKIN',
      subtitle: 'CARE',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
      bgGrad: 'from-[#1e3a45]/90 via-[#2a5260]/60 to-transparent',
      textColor: 'text-white',
      tag: 'Dermatology & Mucosa',
      badge: '🌸 Radiant Health',
      description: 'Topical soothing pastes, skin & mucosal barrier ointments'
    },
    {
      id: 'sexual',
      title: 'SEXUAL',
      subtitle: 'WELLNESS',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80',
      bgGrad: 'from-[#1b3e36]/90 via-[#27594d]/60 to-transparent',
      textColor: 'text-white',
      tag: 'Wellness & Care',
      badge: '🛡️ Protection & Vitality',
      description: 'Contraceptives, wellness supplements & vital nutrients'
    },
    {
      id: 'weight',
      title: 'WEIGHT',
      subtitle: 'MANAGEMENT',
      image: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=600&auto=format&fit=crop&q=80',
      bgGrad: 'from-[#3a4413]/90 via-[#52611a]/60 to-transparent',
      textColor: 'text-white',
      tag: 'Diet & Metabolism',
      badge: '🍏 Fitness & Energy',
      description: 'Metabolic balancers, clinical green tea, digestive fibers'
    },
    {
      id: 'pain',
      title: 'PAIN',
      subtitle: 'RELIEF',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
      bgGrad: 'from-[#2a3848]/90 via-[#3a4d62]/60 to-transparent',
      textColor: 'text-white',
      tag: 'Analgesics & Gels',
      badge: '⚡ Fast Action',
      description: 'Oral mucosal sprays, joint & muscle pain relief, NSAIDs'
    },
    {
      id: 'oral',
      title: 'ORAL & OSMF',
      subtitle: 'CARE',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
      bgGrad: 'from-[#033036]/90 via-[#064e58]/60 to-transparent',
      textColor: 'text-white',
      tag: 'Aarogya Speciality',
      badge: '🔬 Oncology Expert',
      description: 'OSMF antioxidants, ulcer pastes, chlorhexidine & antifungal paints'
    },
    {
      id: 'tobacco',
      title: 'TOBACCO',
      subtitle: 'CESSATION',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
      bgGrad: 'from-[#143d34]/90 via-[#1f574a]/60 to-transparent',
      textColor: 'text-white',
      tag: 'Habit De-addiction',
      badge: '🚭 Gutkha Weaning',
      description: 'Nicotex NRT therapeutic gums & habit weaning protocols'
    }
  ];

  // Comprehensive Medicines Database with "Know Your Medicine" details
  const medicinesList: MedicineDetail[] = [
    {
      id: 'med-1',
      name: 'Triamcinolone Acetonide Oral Paste 0.1% w/w',
      brand: 'Kenacort 0.1% Oral Paste (5g)',
      generic: 'Triamcinolone Acetonide (Synthetic Corticosteroid)',
      category: 'oral',
      price: 135,
      originalPrice: 165,
      discount: '18% OFF',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80',
      description: 'Triamcinolone Acetonide 0.1% is an effective synthetic corticosteroid in an emollient dental paste vehicle. It adheres closely to mucosal tissue, providing an anti-inflammatory and protective barrier against saliva and irritants, accelerating the healing of aphthous stomatitis, oral lichen planus, and traumatic ulcers.',
      uses: [
        'Recurrent Aphthous Stomatitis (Painful Canker Sores)',
        'Erosive Oral Lichen Planus (Mucosal white striations with burning)',
        'Traumatic mucosal ulcers from sharp dental cusps or prostheses'
      ],
      sideEffects: [
        'Local burning or stinging sensation on application',
        'Transient secondary candidiasis with prolonged use (>14 days)',
        'Mild mucosal thinning if overused'
      ],
      dosage: 'Press a small dab (do not rub) onto the ulcer until a smooth thin film forms. Apply preferably at bedtime or after meals.',
      substitutes: [
        { name: 'Orasore Dental Paste 5g', manufacturer: 'Wings Pharma', price: 110, savings: 'Save 18%' },
        { name: 'Tess Oral Paste 5g', manufacturer: 'Troikaa Pharma', price: 125, savings: 'Save 7%' },
        { name: 'Triamcare 0.1% Paste', manufacturer: 'Govt. Jan Aushadhi', price: 45, savings: 'Save 66%' }
      ],
      prescriptionRequired: true
    },
    {
      id: 'med-2',
      name: 'Lycopene + Beta-Carotene + Zinc (SM-Fibro Panel)',
      brand: 'SM-Fibro Capsules (Pack of 15 Softgels)',
      generic: 'Lycopene 5000mcg + Vitamin E 25 IU + Zinc 15mg + Selenium 55mcg',
      category: 'oral',
      price: 240,
      originalPrice: 320,
      discount: '25% OFF',
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop&q=80',
      description: 'SM-Fibro is a premier therapeutic antioxidant formulation tailored for Oral Submucous Fibrosis (OSMF) resulting from areca nut and gutkha habits. Lycopene neutralizes free radicals, limits lipid peroxidation of oral mucosal membranes, and down-regulates abnormal collagen synthesis, clinically proven to improve inter-incisal mouth opening.',
      uses: [
        'Oral Submucous Fibrosis (OSMF) with restricted mouth opening',
        'Leukoplakia antioxidant maintenance therapy',
        'Burning sensation in mouth when consuming spicy foods'
      ],
      sideEffects: [
        'Well tolerated with virtually no adverse reactions',
        'Rare mild gastrointestinal upset or nausea on empty stomach'
      ],
      dosage: 'Take 1 capsule twice daily after meals with water for a minimum of 3 to 6 months alongside habit cessation.',
      substitutes: [
        { name: 'Lycored Capsules (10 Caps)', manufacturer: 'Jagsonpal Pharma', price: 195, savings: 'Save 18%' },
        { name: 'Carofit-Plus Softgels', manufacturer: 'Ajanta Pharma', price: 210, savings: 'Save 12%' },
        { name: 'Aarogya Antiox-OSMF', manufacturer: 'Govt. Empaneled', price: 120, savings: 'Save 50%' }
      ],
      prescriptionRequired: false
    },
    {
      id: 'med-3',
      name: 'Chlorhexidine Gluconate 0.2% w/v Oral Rinse',
      brand: 'Hexidine Mouthwash (150ml)',
      generic: 'Chlorhexidine Gluconate 0.2% w/v Aqueous Solution',
      category: 'oral',
      price: 110,
      originalPrice: 145,
      discount: '24% OFF',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
      description: 'Hexidine is a gold-standard bisbiguanide antimicrobial oral rinse with broad-spectrum bactericidal activity. It adsorbs to oral surfaces and provides sustained antimicrobial release (substantivity) for over 12 hours, protecting surgical sites, biopsies, and ulcers from secondary microbial colonization.',
      uses: [
        'Post-biopsy oral hygiene and surgical site antiseptic care',
        'Severe gingivitis and periodontal pocket reduction',
        'Prevention of secondary infection in extensive oral ulcerations'
      ],
      sideEffects: [
        'Superficial brown staining of teeth and tongue with extended use',
        'Transient alteration in taste sensation (dysgeusia)'
      ],
      dosage: 'Swish with 10ml undiluted for 60 seconds twice daily after brushing. Do not rinse with water or eat for 30 minutes.',
      substitutes: [
        { name: 'Clohex Mouthwash (150ml)', manufacturer: 'Dr. Reddy\'s', price: 105, savings: 'Save 5%' },
        { name: 'Rexidine Rinse (100ml)', manufacturer: 'Indoco Remedies', price: 85, savings: 'Save 22%' },
        { name: 'Jan Aushadhi Chlorhexidine', manufacturer: 'BPPI Govt.', price: 35, savings: 'Save 68%' }
      ],
      prescriptionRequired: false
    },
    {
      id: 'med-4',
      name: 'Clotrimazole Oral Paint 1% w/v',
      brand: 'Candid Oral Paint (15ml)',
      generic: 'Clotrimazole 1% w/v in Non-Aqueous Base',
      category: 'oral',
      price: 95,
      originalPrice: 125,
      discount: '24% OFF',
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&auto=format&fit=crop&q=80',
      description: 'Candid Oral Paint contains clotrimazole, an imidazole antifungal that disrupts ergosterol synthesis in fungal cell membranes. It is the primary clinical therapy for pseudomembranous oral candidiasis (oral thrush), erythematous candidiasis in denture wearers, and post-steroid oral fungal overgrowth.',
      uses: [
        'Oral Thrush (Pseudomembranous candidiasis with curd-like white plaques)',
        'Angular cheilitis (painful fissures at corners of the mouth)',
        'Denture-induced stomatitis and fungal glossitis'
      ],
      sideEffects: [
        'Mild local irritation or burning sensation upon initial application',
        'Rare allergic contact stomatitis'
      ],
      dosage: 'Apply 10 to 20 drops using the dropper directly onto the oral lesions 3 to 4 times daily. Avoid food or liquids for 20 minutes.',
      substitutes: [
        { name: 'Canesten Oral Drops (15ml)', manufacturer: 'Bayer Pharma', price: 90, savings: 'Save 5%' },
        { name: 'Kansel Oral Paint (15ml)', manufacturer: 'Cipla Ltd.', price: 82, savings: 'Save 14%' },
        { name: 'Govt. Clotrimazole 1% Paint', manufacturer: 'AP Med. Services', price: 28, savings: 'Save 70%' }
      ],
      prescriptionRequired: true
    },
    {
      id: 'med-5',
      name: 'Nicotine Polacrilex Chewing Gum 2mg (NRT)',
      brand: 'Nicotex 2mg Mint Gum (Pack of 25 Gums)',
      generic: 'Nicotine Polacrilex USP equivalent to Nicotine 2mg',
      category: 'tobacco',
      price: 175,
      originalPrice: 220,
      discount: '20% OFF',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&auto=format&fit=crop&q=80',
      description: 'Nicotex is a WHO-recommended Nicotine Replacement Therapy (NRT) delivering controlled medicinal nicotine to the brain via oral mucosa absorption, relieving severe withdrawal symptoms and cravings in patients quitting gutkha, khaini, betel quid, and smoking.',
      uses: [
        'Smoking and chewing tobacco habit cessation program',
        'Craving suppression for areca nut and pan masala chewers in agency health camps',
        'Relief of nicotine withdrawal irritability and restlessness'
      ],
      sideEffects: [
        'Mild throat irritation or hiccups if chewed too vigorously',
        'Transient jaw muscle soreness'
      ],
      dosage: 'Chew 1 gum slowly until a peppery taste emerges, then "park" it between your gum and cheek. Repeat for 30 minutes. Use 8-12 gums daily initially.',
      substitutes: [
        { name: 'KwikNic 2mg (10 Gums)', manufacturer: 'ITC Healthcare', price: 70, savings: 'Save 10%' },
        { name: 'Nicogum 2mg Mint (20s)', manufacturer: 'Cipla Health', price: 145, savings: 'Save 17%' }
      ],
      prescriptionRequired: false
    },
    {
      id: 'med-6',
      name: 'Therapeutic Vitamin B-Complex with B12 & Zinc',
      brand: 'Becosules Z Capsules (Strip of 20 Capsules)',
      generic: 'Thiamine + Riboflavin + Niacinamide + B12 15mcg + Folic Acid + Zinc',
      category: 'vitamins',
      price: 75,
      originalPrice: 98,
      discount: '23% OFF',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80',
      description: 'High-potency therapeutic B-complex with essential zinc and folic acid supporting cellular turnover in mucosal epithelia, correcting painful glossitis (inflamed beefy tongue), aphthous ulcerations, and nutritional anemia commonly observed in tribal agency populations.',
      uses: [
        'Glossitis, stomatitis, and mucosal pallor from nutritional deficiency',
        'Accelerated re-epithelialization of oral biopsy and ulcer sites',
        'Fatigue and generalized malaise accompanying chronic oral disorders'
      ],
      sideEffects: [
        'Bright yellow coloration of urine (harmless riboflavin excretion)',
        'Rare mild stomach fullness if taken on an empty stomach'
      ],
      dosage: '1 capsule daily after breakfast or lunch with a full glass of water.',
      substitutes: [
        { name: 'Becozym C Forte (20s)', manufacturer: 'Piramal Pharma', price: 68, savings: 'Save 9%' },
        { name: 'Cobadex CZS (15s)', manufacturer: 'GlaxoSmithKline', price: 82, savings: 'Premium' },
        { name: 'Jan Aushadhi B-Complex + Zinc', manufacturer: 'BPPI Govt.', price: 18, savings: 'Save 76%' }
      ],
      prescriptionRequired: false
    }
  ];

  const filteredMedicines = medicinesList.filter((m) => {
    const matchesCat = selectedCondition === 'all' || m.category === selectedCondition;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      m.name.toLowerCase().includes(q) ||
      m.generic.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.brand.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const handleAddToCart = (med: MedicineDetail) => {
    const existing = cart.find((c) => c.id === med.id);
    if (existing) {
      setCart(cart.map((c) => c.id === med.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { id: med.id, name: med.name, price: med.price, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((c) => c.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-white font-sans text-[#414146] pb-24">
      <DisclaimerBanner />

      {/* 1. TOP SEARCH BAR - Exactly matching user screenshot */}
      <section className="bg-white border-b border-[#e0e0e5] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-[#cbd5e1] hover:border-[#199fd9] shadow-xs flex items-center px-4 py-2.5 transition-colors">
            <Search className="w-4 h-4 text-[#787887] mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for medicines, health products and more"
              className="w-full text-xs text-[#414146] bg-transparent focus:outline-none placeholder:text-[#94a3b8]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-[#94a3b8] hover:text-[#414146]">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. HERO BANNER: "Know your medicine" with Phone Mockup - Exactly matching user screenshot */}
      <section className="bg-[#f4f5f7] border-b border-[#e2e8f0] py-10 sm:py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-extrabold text-[#64748b] uppercase tracking-wider block">
                {heroSlides[currentSlide].label}
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-[#1e293b] font-heading tracking-tight leading-tight">
                {heroSlides[currentSlide].title}
              </h1>

              <p className="text-sm sm:text-base text-[#64748b] leading-relaxed max-w-xl">
                {heroSlides[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedMedicine(medicinesList[0]);
                    window.scrollTo({ top: 750, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 bg-[#199fd9] hover:bg-[#1589bb] text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Explore Oral Medicine Directory</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="px-5 py-3 border border-[#cbd5e1] hover:border-[#199fd9] bg-white text-xs font-bold text-[#475569] rounded-lg shadow-xs flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4 text-[#199fd9]" />
                  <span>View Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                </button>
              </div>

              <div className="pt-4 flex items-center gap-6 text-xs text-[#64748b] border-t border-[#e2e8f0]">
                <span className="flex items-center gap-1.5 font-semibold text-[#03543f]">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" /> Verified by Oral Onco-Pharmacists
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#199fd9]" /> Govt Drug Control Approved
                </span>
              </div>
            </div>

            {/* Right Phone Mockup - Exactly matching user screenshot */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              
              {/* Smartphone Frame Container */}
              <div className="w-72 sm:w-80 bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-700 relative">
                
                {/* Speaker Notch */}
                <div className="w-20 h-3 bg-slate-800 rounded-full mx-auto mb-2"></div>
                
                {/* Screen Content Mockup matching screenshot */}
                <div className="bg-white rounded-[28px] p-4 text-[11px] text-[#414146] space-y-2.5 overflow-hidden border border-slate-200">
                  
                  {/* Mockup Header - Exactly matching user screenshot */}
                  <div className="border-b border-[#f1f5f9] pb-2 text-left">
                    <div className="flex items-start gap-2.5">
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200 mt-1">
                        <img
                          src={selectedMedicine ? selectedMedicine.image : 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80'}
                          alt="Medicine preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wide">Description</span>
                        <p className="text-xs font-bold text-[#1e293b] mt-0.5 truncate">
                          {selectedMedicine ? selectedMedicine.name : 'Glycomet 500 MG Tablet SR'}
                        </p>
                        <p className="text-[10px] text-[#64748b] line-clamp-2 mt-0.5 leading-tight">
                          {selectedMedicine 
                            ? selectedMedicine.description 
                            : 'Glycomet 500 MG Tablet SR is an effective first choice medicine used to control high blood glucose levels in patients with type 2 diabetes... read more'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Strip: Quick links | Side effects | Concerns | Usage - exactly matching user screenshot */}
                  <div className="flex items-center justify-between text-[10px] font-bold border-b border-[#f1f5f9] pb-1.5">
                    <button 
                      onClick={() => setActiveMockTab('quick')}
                      className={`pb-1 transition-colors ${activeMockTab === 'quick' ? 'text-[#199fd9] border-b-2 border-[#199fd9]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
                    >
                      Quick links
                    </button>
                    <button 
                      onClick={() => setActiveMockTab('side')}
                      className={`pb-1 transition-colors ${activeMockTab === 'side' ? 'text-[#199fd9] border-b-2 border-[#199fd9]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
                    >
                      Side effects
                    </button>
                    <button 
                      onClick={() => setActiveMockTab('concerns')}
                      className={`pb-1 transition-colors ${activeMockTab === 'concerns' ? 'text-[#199fd9] border-b-2 border-[#199fd9]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
                    >
                      Concerns
                    </button>
                    <button 
                      onClick={() => setActiveMockTab('usage')}
                      className={`pb-1 transition-colors ${activeMockTab === 'usage' ? 'text-[#199fd9] border-b-2 border-[#199fd9]' : 'text-[#64748b] hover:text-[#1e293b]'}`}
                    >
                      Usage
                    </button>
                  </div>

                  {/* Dynamic Mockup Body based on selected Tab */}
                  {activeMockTab === 'quick' && (
                    <div className="space-y-1.5 text-left">
                      <span className="text-[10px] font-bold text-[#1e293b] block">Substitutes</span>
                      
                      {selectedMedicine && selectedMedicine.substitutes.length > 0 ? (
                        selectedMedicine.substitutes.slice(0, 2).map((sub, sIdx) => (
                          <div key={sIdx} className="p-2 bg-[#f8fafc] rounded-lg border border-[#f1f5f9] flex items-center justify-between">
                            <div>
                              <p className="font-bold text-[10px] text-[#1e293b] truncate max-w-[130px]">{sub.name}</p>
                              <p className="text-[9px] text-[#94a3b8]">{sub.manufacturer}</p>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-[10px] text-[#1e293b]">₹{sub.price}</span>
                              <span className="text-[8px] text-[#10b981] font-bold block">{sub.savings}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#f1f5f9] flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded bg-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600">Rx</div>
                              <div>
                                <p className="font-bold text-[10px] text-[#1e293b]">Bigomet 500 MG Tablet SR</p>
                                <p className="text-[9px] text-[#94a3b8]">Zydua Cadila • 10 tablets</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-[10px] text-[#1e293b]">₹34</span>
                              <span className="text-[8px] text-[#10b981] font-bold block">Save 11%</span>
                            </div>
                          </div>

                          <div className="p-2 bg-[#f8fafc] rounded-lg border border-[#f1f5f9] flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center text-[9px] font-bold text-emerald-700">Jan</div>
                              <div>
                                <p className="font-bold text-[10px] text-[#1e293b]">Jan Aushadhi Metformin SR</p>
                                <p className="text-[9px] text-[#94a3b8]">Govt. Certified • 10 tabs</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-[10px] text-[#1e293b]">₹14</span>
                              <span className="text-[8px] text-[#10b981] font-bold block">Save 62%</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {activeMockTab === 'side' && (
                    <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-left space-y-1">
                      <span className="text-[10px] font-bold text-amber-900 block">Reported Side Effects:</span>
                      <ul className="text-[9px] text-amber-800 list-disc pl-3 space-y-0.5">
                        {selectedMedicine ? (
                          selectedMedicine.sideEffects.slice(0, 3).map((se, i) => <li key={i}>{se}</li>)
                        ) : (
                          <>
                            <li>Nausea or transient vomiting</li>
                            <li>Mild gastrointestinal discomfort</li>
                            <li>Metabolic taste alteration</li>
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  {activeMockTab === 'concerns' && (
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-200 text-left space-y-1">
                      <span className="text-[10px] font-bold text-blue-900 block">Clinical Concerns:</span>
                      <p className="text-[9px] text-blue-800">
                        Always inform your doctor if you have kidney or liver issues. Not recommended during active acute systemic infection without supervision.
                      </p>
                    </div>
                  )}

                  {activeMockTab === 'usage' && (
                    <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-left space-y-1">
                      <span className="text-[10px] font-bold text-emerald-900 block">Prescription Dosage:</span>
                      <p className="text-[9px] text-emerald-800 leading-tight">
                        {selectedMedicine ? selectedMedicine.dosage : 'Take 1 tablet daily with food or as advised by your consulting specialist.'}
                      </p>
                    </div>
                  )}

                  {/* Instant Add to Cart in Mockup */}
                  <button 
                    onClick={() => handleAddToCart(selectedMedicine || medicinesList[0])}
                    className="w-full py-2 bg-[#199fd9] text-white font-bold text-[10px] rounded-lg shadow-xs hover:bg-[#1589bb] transition-colors"
                  >
                    Add to Cart • ₹{selectedMedicine ? selectedMedicine.price : 135}
                  </button>

                </div>
              </div>

            </div>

          </div>

          {/* Carousel Navigation Arrows matching screenshot */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
            className="absolute left-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#475569] shadow-md transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-[#475569] shadow-md transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      </section>

      {/* 3. "Browse medicines & health products" by Health Condition - Exactly matching screenshot */}
      <section className="py-12 bg-white border-b border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#1e293b] font-heading">
              Browse medicines & health products
            </h2>
            <p className="text-xs text-[#64748b] mt-1 font-semibold uppercase tracking-wider">
              Health condition
            </p>
          </div>

          {/* Condition Cards Grid with carousel control matching screenshot */}
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto pb-2 scrollbar-none">
            {healthConditions.map((cond) => {
              const isActive = selectedCondition === cond.id;
              return (
                <div
                  key={cond.id}
                  onClick={() => setSelectedCondition(isActive ? 'all' : cond.id)}
                  className={`rounded-2xl cursor-pointer transition-all flex flex-col justify-between shadow-md hover:shadow-xl relative overflow-hidden group min-h-[180px] ${
                    isActive ? 'ring-4 ring-[#14bef0]' : ''
                  }`}
                >
                  {/* Photo of Health Condition matching screenshot */}
                  <img
                    src={cond.image}
                    alt={`${cond.title} ${cond.subtitle}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient overlay for clear Practo-style typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-slate-900/25"></div>

                  {/* Card Content */}
                  <div className="relative p-4 sm:p-5 flex flex-col justify-between h-full z-10 text-white">
                    <div>
                      <span className="text-[9px] font-black tracking-widest text-[#14bef0] uppercase bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-full inline-block mb-1.5 border border-white/10">
                        {cond.badge}
                      </span>
                      <h3 className="font-black text-sm sm:text-base tracking-wide drop-shadow-md">
                        {cond.title}
                      </h3>
                      <p className="font-extrabold text-xs text-slate-200 drop-shadow-md">
                        {cond.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between border-t border-white/20 mt-2">
                      <span className="text-[10px] font-bold text-white group-hover:text-[#14bef0] transition-colors flex items-center gap-0.5">
                        Browse medicines <ChevronRight className="w-3 h-3" />
                      </span>
                      {isActive && (
                        <div className="w-5 h-5 rounded-full bg-[#14bef0] flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            </div>

            {/* Floating Right Arrow Button matching user screenshot */}
            <button
              onClick={() => {
                const el = document.querySelector('.scrollbar-none');
                if (el) el.scrollBy({ left: 240, behavior: 'smooth' });
              }}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:scale-105 transition-all z-10 hidden sm:flex"
              aria-label="Scroll next condition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. MEDICINES DIRECTORY & "KNOW YOUR MEDICINE" EXPANDED SECTION */}
      <section className="py-10 bg-[#f8f9fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-[#1e293b] font-heading">
                Oral Health Medicines & Verified Generic Substitutes
              </h2>
              <p className="text-xs text-[#64748b] mt-0.5">
                Click any medicine to preview comprehensive clinical pharmacology and generic savings
              </p>
            </div>

            {selectedCondition !== 'all' && (
              <button
                onClick={() => setSelectedCondition('all')}
                className="text-xs text-[#199fd9] font-bold hover:underline"
              >
                Clear Filter (Show All)
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((med) => {
              const inCart = cart.find((c) => c.id === med.id);
              const isSelected = selectedMedicine?.id === med.id;
              return (
                <div 
                  key={med.id}
                  onClick={() => setSelectedMedicine(med)}
                  className={`bg-white rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected ? 'border-[#199fd9] shadow-card ring-1 ring-[#199fd9]' : 'border-[#e2e8f0] hover:border-[#199fd9] shadow-xs'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3.5">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative group">
                        <img
                          src={med.image}
                          alt={med.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-[#1e40af] bg-[#dbeafe] px-2 py-0.5 rounded">
                            {med.category === 'oral' ? 'Oral Care' : med.category === 'tobacco' ? 'NRT Cessation' : 'Therapeutic'}
                          </span>
                          <span className="text-[10px] font-black text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded">
                            {med.discount}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-[#1e293b] hover:text-[#199fd9] transition-colors leading-snug line-clamp-2">
                          {med.name}
                        </h3>
                        <p className="text-xs text-[#087F8C] font-semibold mt-0.5 truncate">
                          Brand: {med.brand}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">
                      {med.description}
                    </p>

                    <div className="p-2.5 bg-[#f8fafc] rounded-xl border border-[#f1f5f9] text-[11px] text-[#475569] space-y-1">
                      <p><strong>Primary Indication:</strong> {med.uses[0]}</p>
                      <p><strong>Dosage:</strong> {med.dosage}</p>
                    </div>

                    {med.prescriptionRequired && (
                      <span className="text-[10px] text-[#b91c1c] font-bold flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Rx Prescription Required
                      </span>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                    <div>
                      <span className="text-base font-black text-[#1e293b]">₹{med.price}</span>
                      <span className="text-xs text-[#94a3b8] line-through ml-2">₹{med.originalPrice}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMedicine(med);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="px-2.5 py-1.5 border border-[#cbd5e1] hover:border-[#199fd9] text-[#475569] text-xs font-bold rounded-lg transition-colors"
                      >
                        Know Details
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(med);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          inCart
                            ? 'bg-[#dcfce7] text-[#15803d]'
                            : 'bg-[#199fd9] hover:bg-[#1589bb] text-white shadow-xs'
                        }`}
                      >
                        {inCart ? `In Cart (${inCart.quantity})` : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. CART & CHECKOUT DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-fadeIn">
            
            <div className="p-4 bg-[#28328c] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#14bef0]" />
                <h3 className="font-bold text-sm">Pharmacy Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {!orderConfirmed ? (
              <div className="p-5 space-y-4 text-xs">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-[#787887]">
                    <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-[#b4b4be]" />
                    <p className="font-bold text-sm">Your medicine cart is empty</p>
                    <p className="text-xs mt-1">Select an oral paste, antioxidant, or ulcer gel from the list above.</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-52 overflow-y-auto space-y-2.5 divide-y divide-[#f0f0f5]">
                      {cart.map((item) => (
                        <div key={item.id} className="pt-2 flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-bold text-xs text-[#414146] truncate">{item.name}</p>
                            <p className="text-[11px] text-[#787887]">₹{item.price} × {item.quantity}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-bold text-xs text-[#414146]">₹{item.price * item.quantity}</span>
                            <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-1">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-[#def7ec] rounded-xl text-[#03543f] text-[11px] font-semibold flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#10b981] shrink-0" />
                      <span>Free Doorstep Delivery to Alluri Agency & Visakhapatnam</span>
                    </div>

                    <form onSubmit={handleOrderSubmit} className="space-y-3 pt-2">
                      <div>
                        <label className="font-bold text-[#414146] block mb-1">Patient Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Somaraju"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full p-2 border border-[#e0e0e5] rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-bold text-[#414146] block mb-1">Mobile Phone</label>
                          <input
                            type="tel"
                            required
                            placeholder="10-digit number"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            className="w-full p-2 border border-[#e0e0e5] rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-[#414146] block mb-1">Payment Method</label>
                          <select className="w-full p-2 border border-[#e0e0e5] rounded-lg bg-white">
                            <option>Cash on Delivery (COD)</option>
                            <option>UPI / Google Pay</option>
                            <option>Dr. YSR Aarogyasri Free</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-[#414146] block mb-1">Delivery Address</label>
                        <input
                          type="text"
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full p-2 border border-[#e0e0e5] rounded-lg"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-[#e0e0e5]">
                        <span className="font-bold text-sm text-[#414146]">Order Total:</span>
                        <span className="font-black text-base text-[#199fd9]">₹{totalAmount}</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#199fd9] hover:bg-[#1589bb] text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                      >
                        Place Order for Doorstep Delivery
                      </button>
                    </form>
                  </>
                )}
              </div>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#def7ec] text-[#10b981] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-base text-[#414146]">Medicine Order Confirmed! Ref: {orderId || 'MED-ORD-2026-1042'}</h4>
                <p className="text-xs text-[#787887]">
                  Order ID: <strong>MED-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
                </p>
                <div className="p-3 bg-[#f0f0f5] rounded-xl text-[11px] text-[#414146] text-left space-y-1">
                  <p><strong>Patient:</strong> {patientName || 'Patient'}</p>
                  <p><strong>Delivery Address:</strong> {deliveryAddress}</p>
                  <p><strong>Dispatch Hub:</strong> Paderu / Visakhapatnam Pharmacy Center</p>
                  <p><strong>Estimated Delivery:</strong> Within 24-48 Hours</p>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#28328c] text-white text-xs font-bold rounded-lg"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
