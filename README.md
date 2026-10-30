# Aarogya Drishti (ఆరోగ్య దృష్టి / आरोग्य दृष्टि)
> **Early Detection. Informed Decisions. Better Oral Health.**

Aarogya Drishti is an AI-assisted digital oral abnormality screening, triage, and clinical decision support platform engineered for public health networks, dental clinics, and oncology centers across India.

---

## Important Clinical Disclaimer
> **CRITICAL MEDICAL NOTICE:** Aarogya Drishti provides preliminary AI-assisted screening to identify visible oral abnormalities. **It does not provide a definitive medical diagnosis, rule out oral malignancy, or independently assign cancer staging from digital photographs.** A physical examination, tissue biopsy, and histopathological evaluation by a qualified dental professional or head & neck oncologist are strictly required.

---

## Key Platform Features

1. **Multi-Step Clinical Screening Workflow**
   - **Step 1: Patient Information Intake**: Collects non-identifying, privacy-conscious data (age range, symptom duration, prior evaluation, explicit consent).
   - **Step 2: Guided Image Capture**: Evaluates focal sharpness, lighting/exposure, specular glare, and anatomical coverage before analysis.
   - **Step 3: AI Abnormality Analysis Service**: Quarantined inference microservice evaluating mucosal features with calibrated uncertainty.
   - **Step 4: Standardized Result Categories (A through D)**:
     - **Category A**: No suspicious feature detected in the submitted image.
     - **Category B**: Visible abnormality detected; professional assessment recommended.
     - **Category C**: Image inconclusive; repeat imaging or seek professional assessment.
     - **Category D**: Urgent clinical review recommended according to validated referral criteria.
   - **Step 5: Clinician Review & Biopsy Management**: Records physical palpation, histopathology status, and clinician-assigned staging.
   - **Step 6: Cryptographically Signed PDF Reports**: Print-ready and downloadable clinical documentation with unique screening IDs.

2. **Multilingual Support**
   - Native support for **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)** with language-aware UI layouts and clinical terminology.

3. **Public Health & Clinical Modules (12 Dedicated Pages)**
   - `Home`, `How It Works`, `AI Screening`, `Oral Health Education`, `Warning Signs`, `Find a Specialist`, `About`, `Privacy & Data Protection`, `Terms of Use`, `Contact & Support`, `Sign In`, and `Register`.

4. **Security & Privacy by Design**
   - Adherence to the **Digital Personal Data Protection Act (DPDP Act 2023)** and **DISHA** guidelines.
   - Private, air-gapped image storage with zero public URLs.
   - Role-based access control (Patient, Clinician, Administrator).

---

## Directory Structure

```text
aarogya-drishti/
├── frontend/                     # React + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   └── ui/              # Button, Card, Badge, DisclaimerBanner, LanguageSelector
│   │   ├── pages/               # 12 Full application pages
│   │   ├── i18n/                # English, Telugu, Hindi translations
│   │   ├── styles/              # Design tokens and custom CSS
│   │   ├── types/               # TypeScript interfaces
│   │   ├── App.tsx              # Application layout & state routing
│   │   └── main.tsx             # Entry point
│   ├── tailwind.config.js       # Design system color tokens
│   ├── vite.config.ts           # Vite configuration
│   └── package.json
├── backend/                     # Python + FastAPI backend service (Part 4)
├── ai-service/                  # Separated PyTorch/ONNX inference API (Part 5)
├── database/                    # PostgreSQL migrations & seeds
├── docs/                        # Architecture, privacy & validation documentation
├── .env.example
└── README.md
```

---

## Getting Started (Frontend Development)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v22+ supported)
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
cd aarogya-drishti/frontend
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Generates a verified, type-checked bundle in `dist/`.
