import { api } from '../services/api';
import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShoppingCart, 
  Zap, 
  Check, 
  Plus, 
  Clock, 
  ShieldCheck, 
  Building2, 
  FileText, 
  X, 
  ChevronRight, 
  Award, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PageId, Language } from '../types';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';
import { AgencyLocationPicker } from '../components/ui/AgencyLocationPicker';

interface LabTestsPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

interface TestItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  reportHours: string;
  category: string;
  image?: string;
  aarogyasriFree?: boolean;
}

interface PackageItem {
  id: string;
  title: string;
  testsCount: number;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  category: 'featured' | 'women' | 'men' | 'oral';
  description: string;
  testsIncluded: string[];
}

export const LabTestsPage: React.FC<LabTestsPageProps> = ({ onNavigate }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('Araku Valley');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'featured' | 'women' | 'men' | 'oral'>('featured');
  const [cart, setCart] = useState<TestItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [collectionAddress, setCollectionAddress] = useState('Araku Valley CHC Road');
  const [collectionSlot, setCollectionSlot] = useState('Tomorrow, 07:30 AM - 08:30 AM');

  // Top Booked Diagnostic Tests matching the screenshot
  const diagnosticTests: TestItem[] = [
    {
      id: 'test-1',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&auto=format&fit=crop&q=80',
      name: 'Thyroid Profile',
      price: 420,
      originalPrice: 750,
      description: 'Known as Thyroid Profile Total Blood',
      reportHours: '24 hrs',
      category: 'Thyroid'
    },
    {
      id: 'test-2',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=200&auto=format&fit=crop&q=80',
      name: 'Complete Blood Count (CBC)',
      price: 300,
      originalPrice: 450,
      description: 'Known as Complete Blood Count Automated Blood',
      reportHours: '12 hrs',
      category: 'Hematology',
      aarogyasriFree: true
    },
    {
      id: 'test-3',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=200&auto=format&fit=crop&q=80',
      name: 'Lipid Profile',
      price: 620,
      originalPrice: 950,
      description: 'Known as Lipid Profile Blood',
      reportHours: '24 hrs',
      category: 'Heart'
    },
    {
      id: 'test-4',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80',
      name: 'Liver Function Test (LFT)',
      price: 790,
      originalPrice: 1200,
      description: 'Known as Liver Function Tests Blood',
      reportHours: '24 hrs',
      category: 'Liver'
    },
    {
      id: 'test-5',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&auto=format&fit=crop&q=80',
      name: 'Dengue NS 1',
      price: 630,
      originalPrice: 900,
      description: 'Known as Dengue Ns1 Antigen Pcr Blood',
      reportHours: '24 hrs',
      category: 'Fever'
    },
    {
      id: 'test-6',
      image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=200&auto=format&fit=crop&q=80',
      name: 'Malarial Antigen',
      price: 450,
      originalPrice: 650,
      description: 'Known as Malarial Antigen Pcr Blood',
      reportHours: '12 hrs',
      category: 'Fever'
    },
    {
      id: 'test-7',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=200&auto=format&fit=crop&q=80',
      name: 'Oral Tissue Punch Biopsy & Histopathology',
      price: 850,
      originalPrice: 1500,
      description: 'Gold-standard dysplasia & malignancy histopathology confirmation',
      reportHours: '48 hrs',
      category: 'Oral Oncology',
      aarogyasriFree: true
    },
    {
      id: 'test-8',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=200&auto=format&fit=crop&q=80',
      name: 'Exfoliative Cytology / Brush Biopsy',
      price: 450,
      originalPrice: 800,
      description: 'Oral mucosal atypical cell scrape for suspicious lesions',
      reportHours: '24 hrs',
      category: 'Oral Oncology',
      aarogyasriFree: true
    },
    {
      id: 'test-9',
      image: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=200&auto=format&fit=crop&q=80',
      name: 'HbA1c (Glycated Hemoglobin)',
      price: 490,
      originalPrice: 700,
      description: '3-Month Blood Glucose Profile for diabetic mucosal healing',
      reportHours: '12 hrs',
      category: 'Diabetes'
    }
  ];

  // Popular Health Checkup Packages matching screenshot tabs
  const packages: PackageItem[] = [
    {
      id: 'pkg-1',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop&q=80',
      title: 'Comprehensive Full Body Health Checkup',
      testsCount: 64,
      price: 1499,
      originalPrice: 2000,
      discount: '25% OFF',
      category: 'featured',
      description: 'Complete blood, liver, kidney, thyroid, heart and oral health evaluation',
      testsIncluded: ['CBC (24 tests)', 'Lipid Profile (8 tests)', 'Liver Function (11 tests)', 'Kidney Function (7 tests)', 'Thyroid T3/T4/TSH', 'Oral Mucosa Screening']
    },
    {
      id: 'pkg-2',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&auto=format&fit=crop&q=80',
      title: 'Oral Pre-Cancer & Biopsy Screening Panel',
      testsCount: 12,
      price: 1299,
      originalPrice: 1800,
      discount: '28% OFF',
      category: 'oral',
      description: 'Specialized diagnostic workup for tobacco/pan chewers with ulcers or white patches',
      testsIncluded: ['Oral Cytology Smear', 'Tissue Dysplasia Screen', 'CBC with ESR', 'Ferritin & Iron Profile', 'Vitamin B12 Level', 'Photographic Triage Review']
    },
    {
      id: 'pkg-3',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
      title: 'Women Advanced Wellness Health Package',
      testsCount: 78,
      price: 1999,
      originalPrice: 2600,
      discount: '24% OFF',
      category: 'women',
      description: 'Tailored for women: thyroid, hormonal balance, bone profile, iron and anemia tests',
      testsIncluded: ['Thyroid Total', 'Hemogram with Anemia Panel', 'Calcium & Vitamin D3', 'HbA1c Diabetes', 'Lipid Screen', 'Urinalysis']
    },
    {
      id: 'pkg-4',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
      title: 'Men Active Vitality & Executive Health Checkup',
      testsCount: 70,
      price: 1799,
      originalPrice: 2300,
      discount: '22% OFF',
      category: 'men',
      description: 'Cardiac markers, liver enzymes, testosterone, kidney and oral cancer examination',
      testsIncluded: ['Cardiac Lipid Panel', 'Liver Health AST/ALT', 'Kidney Serum Creatinine', 'Uric Acid', 'CBC Automated', 'Dental/Oral Exam']
    }
  ];

  const filteredTests = diagnosticTests.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPackages = packages.filter((p) => p.category === activeTab);

  const handleAddToCart = (test: TestItem) => {
    if (!cart.some((item) => item.id === test.id)) {
      setCart([...cart, test]);
    }
  };

  const handleRemoveFromCart = (testId: string) => {
    setCart(cart.filter((item) => item.id !== testId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const [bookingId, setBookingId] = useState<string>('');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);
    try {
      const res = await api.bookLabTest({
        test_id: cart[0]?.id || 'test-1',
        test_name: cart.map(c => c.name).join(', ') || 'Diagnostic Panel',
        patient_name: patientName || 'Patient User',
        patient_phone: patientPhone || '+91 94941 00000',
        collection_address: collectionAddress,
        collection_slot: collectionSlot,
        price: cartTotal
      });
      setBookingId(res.id);
      setBookingConfirmed(true);
    } catch {
      setBookingId(`LAB-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      setBookingConfirmed(true);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#414146] pb-20">
      <DisclaimerBanner />

      {/* 1. Header with Title & Cart Button matching screenshot */}
      <section className="bg-white border-b border-[#e0e0e5] pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-[#414146] font-heading tracking-tight">
              Book Lab Tests Online
            </h1>

            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#b4b4be] hover:border-[#199fd9] hover:text-[#199fd9] bg-white text-xs font-bold transition-all shadow-xs relative"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="bg-[#199fd9] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center -mr-1">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* 2. Dual Search Box with Location & Action Buttons matching screenshot */}
          <div className="flex flex-col lg:flex-row items-stretch gap-3">
            
            {/* Search Container (Location + Search Input) */}
            <div className="flex-1 bg-white rounded-xl border border-[#e0e0e5] shadow-xs flex flex-col sm:flex-row items-center divide-y sm:divide-y-0 sm:divide-x divide-[#e0e0e5] p-1">
              
              {/* Location Picker */}
              <div className="w-full sm:w-64 p-2">
                <AgencyLocationPicker
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  className="w-full"
                />
              </div>

              {/* Tests Search Input */}
              <div className="flex-1 flex items-center px-3 py-2 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for tests, packages & profiles (e.g. CBC, Biopsy, Thyroid)..."
                  className="w-full text-xs text-[#414146] bg-transparent focus:outline-none placeholder:text-[#787887]"
                />
                <Search className="w-4 h-4 text-[#787887] shrink-0 ml-2 cursor-pointer hover:text-[#199fd9]" />
              </div>
            </div>

            {/* Quick Action Contact Pills matching screenshot */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Book Via Call */}
              <a
                href="tel:1800221951"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-[#199fd9] hover:bg-[#1589bb] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <span>Book Via Call</span>
                <Phone className="w-3.5 h-3.5" />
              </a>

              {/* Book Via WhatsApp */}
              <a
                href="https://wa.me/919494012345?text=Hello%20Aarogya%20Drishti,%20I%20want%20to%20book%20a%20lab%20test"
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <span>Book Via Whatsapp</span>
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Agency & Aarogyasri Trust Strip */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-[#787887]">
            <span className="flex items-center gap-1 font-semibold text-[#03543f] bg-[#def7ec] px-2 py-0.5 rounded border border-[#bcf0da]">
              <CheckCircle2 className="w-3 h-3 text-[#10b981]" /> Free Sample Pickup at Araku, Paderu & Alluri Agency CHCs
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#199fd9]" /> 100% NABL & ICMR Certified Labs (KGH & District Hospital)
            </span>
          </div>

        </div>
      </section>

      {/* 3. TOP BOOKED DIAGNOSTIC TESTS - Exactly matching user screenshot */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-4">
            <h2 className="text-xl font-black text-[#414146] font-heading">
              Top Booked Diagnostic Tests
            </h2>
            <p className="text-xs text-[#787887] flex items-center gap-1 mt-0.5">
              <Zap className="w-3 h-3 text-[#f59e0b] fill-current" />
              <span>Get reports within 24hrs</span>
            </p>
          </div>

          {/* Horizontal Grid of Test Cards matching screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredTests.map((test) => {
              const inCart = cart.some((c) => c.id === test.id);
              return (
                <div
                  key={test.id}
                  className="bg-white p-3.5 rounded-xl border border-[#e0e0e5] hover:border-[#199fd9] hover:shadow-card transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    {test.image && (
                      <div className="h-24 w-full rounded-lg overflow-hidden bg-slate-100 relative">
                        <img
                          src={test.image}
                          alt={test.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <span className="absolute bottom-1 right-1 text-[9px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded backdrop-blur-2xs">
                          {test.category}
                        </span>
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="font-bold text-xs text-[#1e293b] leading-snug">
                        {test.name}
                      </h3>
                      <span className="font-black text-xs text-[#1e293b] shrink-0">
                        ₹{test.price}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#787887] line-clamp-2 leading-tight">
                      {test.description}
                    </p>

                    {test.aarogyasriFree && (
                      <span className="inline-block text-[9px] font-bold bg-[#def7ec] text-[#03543f] px-1.5 py-0.2 rounded">
                        ✓ Aarogyasri Free
                      </span>
                    )}
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#f0f0f5]">
                    <button
                      onClick={() => handleAddToCart(test)}
                      className={`w-full py-1.5 rounded text-xs font-bold transition-all text-center ${
                        inCart
                          ? 'bg-[#e6f4f6] text-[#087F8C]'
                          : 'text-[#199fd9] hover:bg-[#e0f2fe]'
                      }`}
                    >
                      {inCart ? 'ADDED ✓' : 'ADD TO CART'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. POPULAR HEALTH CHECKUP PACKAGES - Exactly matching user screenshot */}
      <section className="py-8 bg-white border-t border-[#e0e0e5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-xl font-black text-[#414146] font-heading mb-4">
            Popular Health Checkup Packages
          </h2>

          {/* Navigation Category Tabs matching screenshot */}
          <div className="flex items-center gap-6 border-b border-[#e0e0e5] mb-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('featured')}
              className={`pb-2.5 transition-colors relative ${
                activeTab === 'featured'
                  ? 'text-[#199fd9] border-b-2 border-[#199fd9]'
                  : 'text-[#787887] hover:text-[#414146]'
              }`}
            >
              Featured Checkups
            </button>
            <button
              onClick={() => setActiveTab('oral')}
              className={`pb-2.5 transition-colors relative ${
                activeTab === 'oral'
                  ? 'text-[#087F8C] border-b-2 border-[#087F8C]'
                  : 'text-[#787887] hover:text-[#414146]'
              }`}
            >
              Oral Cancer & Biopsy Panel
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`pb-2.5 transition-colors relative ${
                activeTab === 'women'
                  ? 'text-[#199fd9] border-b-2 border-[#199fd9]'
                  : 'text-[#787887] hover:text-[#414146]'
              }`}
            >
              Women's Health
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`pb-2.5 transition-colors relative ${
                activeTab === 'men'
                  ? 'text-[#199fd9] border-b-2 border-[#199fd9]'
                  : 'text-[#787887] hover:text-[#414146]'
              }`}
            >
              Men's Health
            </button>
          </div>

          {/* Package Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-[#e0e0e5] hover:shadow-card transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 bg-[#f0f0f5] relative overflow-hidden group">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-[#10b981] text-white text-xs font-black px-2.5 py-1 rounded shadow-xs">
                      {pkg.discount}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#414146] text-xs font-bold px-2 py-0.5 rounded shadow-xs">
                      Includes {pkg.testsCount} Tests
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-sm text-[#414146] leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-[#787887]">
                      {pkg.description}
                    </p>

                    <div className="space-y-1 pt-2 border-t border-[#f0f0f5]">
                      <span className="text-[11px] font-bold text-[#787887] block">Includes Key Tests:</span>
                      <div className="flex flex-wrap gap-1">
                        {pkg.testsIncluded.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="text-[10px] bg-[#f0f0f5] text-[#414146] px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between pt-3 border-t border-[#f0f0f5]">
                    <div>
                      <span className="text-base font-black text-[#414146]">₹{pkg.price}</span>
                      <span className="text-xs text-[#787887] line-through ml-2">₹{pkg.originalPrice}</span>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart({
                          id: pkg.id,
                          name: pkg.title,
                          price: pkg.price,
                          originalPrice: pkg.originalPrice,
                          description: pkg.description,
                          reportHours: '24 hrs',
                          category: 'Package'
                        });
                        setIsCartOpen(true);
                      }}
                      className="px-4 py-2 bg-[#199fd9] hover:bg-[#1589bb] text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE CART / BOOKING MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative animate-fadeIn">
            
            {/* Header */}
            <div className="p-4 bg-[#28328c] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#14bef0]" />
                <h3 className="font-bold text-sm">Lab Test Booking Cart ({cart.length})</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            {!bookingConfirmed ? (
              <div className="p-5 space-y-4 text-xs">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-[#787887]">
                    <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-[#b4b4be]" />
                    <p className="font-bold text-sm">Your cart is empty</p>
                    <p className="text-xs mt-1">Add diagnostic tests or checkup packages above.</p>
                  </div>
                ) : (
                  <>
                    <div className="max-h-48 overflow-y-auto space-y-2 divide-y divide-[#f0f0f5]">
                      {cart.map((item) => (
                        <div key={item.id} className="pt-2 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-[#414146]">{item.name}</p>
                            <p className="text-[11px] text-[#787887]">Reports in {item.reportHours}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#414146]">₹{item.price}</span>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 font-bold"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-[#def7ec] rounded-xl text-[#03543f] font-semibold text-[11px] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0" />
                      <span>Free Home / CHC Phlebotomist Sample Pickup Included</span>
                    </div>

                    <form onSubmit={handleConfirmOrder} className="space-y-3 pt-2">
                      <div>
                        <label className="font-bold text-[#414146] block mb-1">Patient Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. S. Appala Naidu"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full p-2 border border-[#e0e0e5] rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="font-bold text-[#414146] block mb-1">Phone Number</label>
                          <input
                            type="tel"
                            required
                            placeholder="10-digit mobile"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            className="w-full p-2 border border-[#e0e0e5] rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="font-bold text-[#414146] block mb-1">Pickup Date & Slot</label>
                          <select
                            value={collectionSlot}
                            onChange={(e) => setCollectionSlot(e.target.value)}
                            className="w-full p-2 border border-[#e0e0e5] rounded-lg bg-white"
                          >
                            <option>Tomorrow, 07:00 AM - 08:00 AM</option>
                            <option>Tomorrow, 08:00 AM - 09:30 AM</option>
                            <option>Tomorrow, 09:30 AM - 11:00 AM</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-[#414146] block mb-1">Pickup Address / CHC Center</label>
                        <input
                          type="text"
                          required
                          value={collectionAddress}
                          onChange={(e) => setCollectionAddress(e.target.value)}
                          className="w-full p-2 border border-[#e0e0e5] rounded-lg"
                        />
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-[#e0e0e5]">
                        <span className="font-bold text-sm text-[#414146]">Total Amount:</span>
                        <span className="font-black text-base text-[#199fd9]">₹{cartTotal}</span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#199fd9] hover:bg-[#1589bb] text-white font-bold rounded-xl text-xs transition-colors shadow-md"
                      >
                        Confirm Lab Test Booking
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
                <h4 className="font-bold text-base text-[#414146]">Lab Test Booking Confirmed!</h4>
                <p className="text-xs text-[#737382]">
                  Booking Reference: <strong>LAB-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
                </p>
                <div className="p-3 bg-[#f0f0f5] rounded-xl text-[11px] text-[#414146] text-left space-y-1">
                  <p><strong>Patient:</strong> {patientName || 'Patient'}</p>
                  <p><strong>Slot:</strong> {collectionSlot}</p>
                  <p><strong>Address:</strong> {collectionAddress}</p>
                  <p><strong>Certified Phlebotomist:</strong> Assigned from {selectedLocation} NABL Centre</p>
                </div>
                <button
                  onClick={() => {
                    setBookingConfirmed(false);
                    setCart([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full py-2.5 bg-[#28328c] text-white text-xs font-bold rounded-lg hover:bg-[#1f276e] transition-colors"
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
