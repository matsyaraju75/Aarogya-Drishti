export type Language = 'en' | 'te' | 'hi';

export type PageId =
  | 'home'
  | 'surgeries'
  | 'medicines'
  | 'lab-tests'
  | 'video-consult'
  | 'how-it-works'
  | 'screening'
  | 'education'
  | 'warning-signs'
  | 'find-specialist'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'signin'
  | 'register'
  | 'patient-dashboard'
  | 'clinician-dashboard'
  | 'admin-dashboard';

export type UserRole = 'patient' | 'clinician' | 'admin';

export type ResultCategory = 'A' | 'B' | 'C' | 'D';

export interface PatientInfo {
  patientReferenceId: string;
  ageRange: string;
  reportLanguage: Language;
  symptoms: string[];
  durationOfSymptoms: string;
  previousEvaluation: 'none' | 'dentist' | 'general_physician' | 'specialist';
  consentAcknowledged: boolean;
}

export interface ImageQualityCheck {
  lightingOk: boolean;
  blurOk: boolean;
  coverageOk: boolean;
  glareOk: boolean;
  formatOk: boolean;
  sizeOk: boolean;
  overallPassed: boolean;
  reasons: string[];
}

export interface AIScreeningResult {
  screeningRef: string;
  timestamp: string;
  modelVersion: string;
  isDemonstrationMode: boolean;
  category: ResultCategory;
  categoryTitle: string;
  categoryDescription: string;
  findings: string[];
  uncertaintyEstimate: string;
  imageQualityScore: string;
  limitations: string[];
  recommendedNextSteps: string[];
  clinicalReviewStatus: 'Pending Review' | 'Reviewed' | 'Escalated';
  clinicianNotes?: string;
  reviewedBy?: string;
  biopsyOrdered?: boolean;
  confirmedStage?: string;
}

export interface DoctorSpecialist {
  id: string;
  name: string;
  title: string;
  qualification: string;
  hospital: string;
  city: string;
  state: string;
  experienceYears: number;
  speciality: string;
  languages: string[];
  consultationType: 'In-person' | 'Tele-consultation' | 'Both';
  phone: string;
}

export interface ScreeningRecord {
  id: string;
  patientRef: string;
  date: string;
  category: ResultCategory;
  symptomSummary: string;
  imageThumbnail: string;
  clinicalStatus: 'Pending Review' | 'Reviewed' | 'Escalated' | 'Biopsy Scheduled';
  reviewedBy?: string;
  notes?: string;
  urgency: 'Routine' | 'Moderate' | 'Urgent' | 'Indeterminate';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FLAGGED' | 'VERIFIED';
}
