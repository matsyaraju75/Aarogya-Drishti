export interface LocationItem {
  id: string;
  name: string;
  district: string;
  category: 'mandal' | 'hospital' | 'chc' | 'referral';
  details: string;
  typeBadge: string;
}

// 1. Primary Agency Towns sorted in strict alphabetical order:
//    - Araku Valley
//    - Paderu
//    - Visakhapatnam
export const AGENCY_PRIMARY_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-araku',
    name: 'Araku Valley',
    district: 'Alluri Sitharama Raju',
    category: 'mandal',
    details: 'ITDA Agency Division, Alluri Sitharama Raju District',
    typeBadge: 'Agency Division'
  },
  {
    id: 'loc-paderu',
    name: 'Paderu',
    district: 'Alluri Sitharama Raju',
    category: 'mandal',
    details: 'District Headquarters, Alluri Sitharama Raju District',
    typeBadge: 'District HQ'
  },
  {
    id: 'loc-vizag',
    name: 'Visakhapatnam',
    district: 'Visakhapatnam',
    category: 'referral',
    details: 'Apex Regional Tertiary Referral Hub (KGH / AMC)',
    typeBadge: 'Apex Referral Hub'
  }
];

// 2. All Government Agency Hospitals & Health Centres in Alluri Sitharama Raju (ASR) District
//    Sorted in alphabetical order
export const ALLURI_AGENCY_HOSPITALS: LocationItem[] = [
  {
    id: 'hosp-asr-dh-paderu',
    name: 'Alluri Sitharama Raju District Hospital, Paderu',
    district: 'Alluri Sitharama Raju',
    category: 'hospital',
    details: '100-Bedded District Hospital & ITDA Referral Centre, Paderu',
    typeBadge: 'District Hospital'
  },
  {
    id: 'hosp-ah-rampa',
    name: 'Area Hospital, Rampachodavaram',
    district: 'Alluri Sitharama Raju',
    category: 'hospital',
    details: 'Agency Area Hospital, Rampachodavaram Sub-Division',
    typeBadge: 'Area Hospital'
  },
  {
    id: 'chc-ananthagiri',
    name: 'Community Health Centre (CHC), Ananthagiri',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Government CHC, Ananthagiri Mandal, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-araku',
    name: 'Community Health Centre (CHC), Araku Valley',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: '30-Bedded Community Health Centre, Araku Valley',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-chintapalli',
    name: 'Community Health Centre (CHC), Chintapalli',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Tribal Area CHC, Chintapalli Mandal, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-dumbriguda',
    name: 'Community Health Centre (CHC), Dumbriguda',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Agency CHC, Dumbriguda Mandal, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-gkveedhi',
    name: 'Community Health Centre (CHC), G.K. Veedhi',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Community Health Centre, Gudem Kotha Veedhi, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-hukumpeta',
    name: 'Community Health Centre (CHC), Hukumpeta',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Agency CHC, Hukumpeta Mandal, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-koyyuru',
    name: 'Community Health Centre (CHC), Koyyuru',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Community Health Centre, Koyyuru Mandal, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-maredumilli',
    name: 'Community Health Centre (CHC), Maredumilli',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Agency CHC, Maredumilli Forest Division, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-munchingiputtu',
    name: 'Community Health Centre (CHC), Munchingiputtu',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Border Agency CHC, Munchingiputtu Mandal, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-pedabayalu',
    name: 'Community Health Centre (CHC), Pedabayalu',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Tribal Agency CHC, Pedabayalu Mandal, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'chc-rajavommangi',
    name: 'Community Health Centre (CHC), Rajavommangi',
    district: 'Alluri Sitharama Raju',
    category: 'chc',
    details: 'Community Health Centre, Rajavommangi Mandal, ASR District',
    typeBadge: 'CHC'
  },
  {
    id: 'hosp-itda-mobile-paderu',
    name: 'ITDA Mobile Screening & Tele-Oncology Unit, Paderu',
    district: 'Alluri Sitharama Raju',
    category: 'referral',
    details: 'Alluri Sitharama Raju Tribal Agency Mobile Screening Van',
    typeBadge: 'Mobile Van'
  },
  {
    id: 'hosp-itda-mobile-rampa',
    name: 'ITDA Mobile Screening & Tele-Oncology Unit, Rampachodavaram',
    district: 'Alluri Sitharama Raju',
    category: 'referral',
    details: 'Rampachodavaram Agency Division Telemedicine Unit',
    typeBadge: 'Mobile Van'
  },
  {
    id: 'hosp-kgh-vizag',
    name: 'King George Hospital (KGH - Apex Referral Oncology), Visakhapatnam',
    district: 'Visakhapatnam',
    category: 'referral',
    details: 'Apex Regional Cancer Referral Centre for North Coastal & ASR Agency',
    typeBadge: 'Apex Hospital'
  },
  {
    id: 'hosp-vims-vizag',
    name: 'Visakha Institute of Medical Sciences (VIMS), Visakhapatnam',
    district: 'Visakhapatnam',
    category: 'referral',
    details: 'Multi-Speciality Government Hospital & Oncology Care',
    typeBadge: 'Govt Institute'
  }
];
