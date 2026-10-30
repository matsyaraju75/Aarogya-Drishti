import { Language } from '../types';

export const translations: Record<Language, {
  brand: string;
  tagline: string;
  disclaimerNotice: string;
  disclaimerBannerTitle: string;
  disclaimerBannerText: string;
  nav: {
    home: string;
    howItWorks: string;
    screening: string;
    education: string;
    warningSigns: string;
    findSpecialist: string;
    about: string;
    privacy: string;
    terms: string;
    contact: string;
    signIn: string;
    register: string;
  };
  hero: {
    badge: string;
    heading: string;
    supportingText: string;
    primaryBtn: string;
    secondaryBtn: string;
    stat1Label: string;
    stat1Val: string;
    stat2Label: string;
    stat2Val: string;
    stat3Label: string;
    stat3Val: string;
  };
  common: {
    readMore: string;
    getStarted: string;
    consultDoctor: string;
    emergencyCall: string;
    language: string;
    learnMore: string;
    viewAll: string;
    downloadReport: string;
    verifiedDoctor: string;
  };
}> = {
  en: {
    brand: "Aarogya Drishti",
    tagline: "Early Detection. Informed Decisions. Better Oral Health.",
    disclaimerNotice: "IMPORTANT NOTICE: Aarogya Drishti provides AI-assisted screening, NOT a definitive medical diagnosis. A photograph cannot reliably confirm or exclude oral cancer or determine cancer staging. Always consult a qualified dental or medical practitioner.",
    disclaimerBannerTitle: "Preliminary Screening Disclaimer",
    disclaimerBannerText: "This digital screening tool evaluates visible surface abnormalities using image-analysis algorithms. It does not replace physical examination, biopsy, or histopathological examination by an oral oncologist.",
    nav: {
      home: "Home",
      howItWorks: "How It Works",
      screening: "AI Screening",
      education: "Oral Health Education",
      warningSigns: "Warning Signs",
      findSpecialist: "Find a Specialist",
      about: "About Us",
      privacy: "Privacy & Data Protection",
      terms: "Terms of Use",
      contact: "Contact & Support",
      signIn: "Sign In",
      register: "Register"
    },
    hero: {
      badge: "Clinical-Grade Digital Triage & Screening",
      heading: "Your Oral Health Deserves Attention",
      supportingText: "Explore AI-assisted oral health screening designed to help identify visible abnormalities and guide you toward appropriate professional care.",
      primaryBtn: "Start Oral Health Screening",
      secondaryBtn: "Learn About Warning Signs",
      stat1Val: "90%+",
      stat1Label: "Survival rate when detected in early localized stages",
      stat2Val: "6 Steps",
      stat2Label: "Transparent clinical-grade workflow with human review",
      stat3Val: "0% False Claims",
      stat3Label: "Evidence-based, strictly non-diagnostic reassurance"
    },
    common: {
      readMore: "Read Guidance",
      getStarted: "Start Screening",
      consultDoctor: "Find a Specialist",
      emergencyCall: "National Cancer Helpline: 1800-22-1951",
      language: "Language",
      learnMore: "Learn More",
      viewAll: "View All",
      downloadReport: "Download PDF Report",
      verifiedDoctor: "Verified Clinical Specialist"
    }
  },
  te: {
    brand: "ఆరోగ్య దృష్టి",
    tagline: "ముందస్తు గుర్తింపు. సరైన నిర్ణయాలు. మెరుగైన నోటి ఆరోగ్యం.",
    disclaimerNotice: "ముఖ్యమైన గమనిక: ఆరోగ్య దృష్టి కేవలం ఏఐ ఆధారిత స్క్రీనింగ్ మాత్రమే అందిస్తుంది, ఇది వైద్య నిర్ధారణ (డయాగ్నోసిస్) కాదు. ఒక ఫోటో ఆధారంగా క్యాన్సర్‌ను నిర్ధారించడం లేదా మినహాయించడం సాధ్యం కాదు. దయచేసి అర్హత కలిగిన వైద్యుడిని సంప్రదించండి.",
    disclaimerBannerTitle: "ప్రాథమిక స్క్రీనింగ్ నిబంధనలు",
    disclaimerBannerText: "ఈ సాంకేతిక సాధనం కేవలం కనిపించే బాహ్య మార్పులను మాత్రమే పరిశీలిస్తుంది. ఇది దంత లేదా క్యాన్సర్ నిపుణుల భౌతిక పరీక్ష, బయాప్సీకి ప్రత్యామ్నాయం కాదు.",
    nav: {
      home: "హోమ్",
      howItWorks: "ఇది ఎలా పనిచేస్తుంది",
      screening: "ఏఐ స్క్రీనింగ్",
      education: "నోటి ఆరోగ్య సమాచారం",
      warningSigns: "హెచ్చరిక సంకేతాలు",
      findSpecialist: "నిపుణుడిని కనుగొనండి",
      about: "మా గురించి",
      privacy: "గోప్యత & డేటా రక్షణ",
      terms: "నిబంధనలు",
      contact: "సంప్రదించండి",
      signIn: "లాగిన్",
      register: "నమోదు చేసుకోండి"
    },
    hero: {
      badge: "డిజిటల్ ఓరల్ హెల్త్ స్క్రీనింగ్",
      heading: "మీ నోటి ఆరోగ్యం శ్రద్ధ వహించదగినది",
      supportingText: "కనిపించే మార్పులను గుర్తించి, తగిన వైద్యుల సంప్రదింపుల దిశగా మార్గనిర్దేశం చేసే ఏఐ ఆధారిత నోటి ఆరోగ్య స్క్రీనింగ్ పరిశీలించండి.",
      primaryBtn: "నోటి ఆరోగ్య స్క్రీనింగ్ ప్రారంభించండి",
      secondaryBtn: "హెచ్చరిక సంకేతాల గురించి తెలుసుకోండి",
      stat1Val: "90%+",
      stat1Label: "ప్రారంభ దశలో గుర్తిస్తే నయం అయ్యే అవకాశాలు",
      stat2Val: "6 దశలు",
      stat2Label: "వైద్య నిపుణుల సమీక్షతో కూడిన పారదర్శక విధానం",
      stat3Val: "0% అవాస్తవాలు",
      stat3Label: "ఆధారిత వైద్య పరిమితులతో కూడిన రక్షణ"
    },
    common: {
      readMore: "మరింత చదవండి",
      getStarted: "స్క్రీనింగ్ ప్రారంభించండి",
      consultDoctor: "వైద్యుడిని సంప్రదించండి",
      emergencyCall: "హెల్ప్‌లైన్: 1800-22-1951",
      language: "భాష",
      learnMore: "తెలుసుకోండి",
      viewAll: "అన్నీ చూడండి",
      downloadReport: "రిపోర్ట్ డౌన్‌లోడ్ చేసుకోండి",
      verifiedDoctor: "ధృవీకరించబడిన వైద్యులు"
    }
  },
  hi: {
    brand: "आरोग्य दृष्टि",
    tagline: "प्रारंभिक पहचान। सूचित निर्णय। बेहतर मुख स्वास्थ्य।",
    disclaimerNotice: "महत्वपूर्ण सूचना: आरोग्य दृष्टि एआई-सहायक स्क्रीनिंग प्रदान करता है, कोई अंतिम चिकित्सा निदान नहीं। केवल एक तस्वीर के आधार पर मुख कैंसर की पुष्टि या खंडन नहीं किया जा सकता है। कृपया योग्य चिकित्सक से परामर्श लें।",
    disclaimerBannerTitle: "प्रारंभिक स्क्रीनिंग अस्वीकरण (Disclaimer)",
    disclaimerBannerText: "यह डिजिटल स्क्रीनिंग टूल दृश्य असामान्यताओं का मूल्यांकन करता है। यह किसी विशेषज्ञ डॉक्टर की शारीरिक जांच अथवा बायोप्सी का विकल्प नहीं है।",
    nav: {
      home: "होम",
      howItWorks: "यह कैसे कार्य करता है",
      screening: "एआई स्क्रीनिंग",
      education: "मुख स्वास्थ्य शिक्षा",
      warningSigns: "चेतावनी संकेत",
      findSpecialist: "विशेषज्ञ खोजें",
      about: "हमारे बारे में",
      privacy: "गोपनीयता और डेटा सुरक्षा",
      terms: "उपयोग की शर्तें",
      contact: "संपर्क एवं सहायता",
      signIn: "लॉग इन",
      register: "पंजीकरण करें"
    },
    hero: {
      badge: "क्लिनिकल-ग्रेड डिजिटल ओरल स्क्रीनिंग",
      heading: "आपके मुख स्वास्थ्य पर ध्यान देना आवश्यक है",
      supportingText: "दिखने वाली असामान्यताओं की पहचान करने और आपको उचित चिकित्सकीय देखभाल की ओर मार्गदर्शन करने हेतु डिज़ाइन की गई एआई-सहायक मौखिक स्वास्थ्य जांच।",
      primaryBtn: "मौखिक स्वास्थ्य जांच शुरू करें",
      secondaryBtn: "चेतावनी संकेतों के बारे में जानें",
      stat1Val: "90%+",
      stat1Label: "शुरुआती चरण में पहचान होने पर जीवन रक्षा दर",
      stat2Val: "6 चरण",
      stat2Label: "पारदर्शी क्लिनिकल वर्कफ़्लो और डॉक्टर समीक्षा",
      stat3Val: "0% झूठे दावे",
      stat3Label: "साक्ष्य-आधारित एवं सुरक्षित पारदर्शी स्क्रीनिंग"
    },
    common: {
      readMore: "मार्गदर्शन पढ़ें",
      getStarted: "जांच शुरू करें",
      consultDoctor: "विशेषज्ञ से मिलें",
      emergencyCall: "राष्ट्रीय कैंसर हेल्पलाइन: 1800-22-1951",
      language: "भाषा",
      learnMore: "और जानें",
      viewAll: "सभी देखें",
      downloadReport: "पीडीएफ रिपोर्ट डाउनलोड करें",
      verifiedDoctor: "सत्यापित क्लिनिकल विशेषज्ञ"
    }
  }
};
