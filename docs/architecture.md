# Aarogya Drishti: System Architecture & Data Flow

## 1. Architectural Philosophy

The Aarogya Drishti platform is designed with three strict non-negotiable principles:
1. **Separation of Screening and Diagnosis**: The AI model operates exclusively as a preliminary screening triage engine. Medical diagnoses, biopsies, and histological staging remain under the exclusive authority of verified healthcare professionals.
2. **Decoupled Machine Learning Service**: The inference engine is maintained as an isolated microservice (`ai-service/`), preventing unvalidated model changes from affecting web routing, and allowing model versioning (`AD-OralNet-v2.4.1`) to be audited independently.
3. **Privacy by Design**: Sensitive oral photographs are never exposed via public URLs. Images are encrypted in flight and at rest, referenced only by pseudonymous Patient Reference IDs (`AD-YYYY-XXXXXX`).

---

## 2. Component Topology

```text
+-------------------------------------------------------------------+
|                        Client Web Application                     |
|                 (React 18 + TypeScript + Tailwind CSS)            |
|       - 12 Public & Clinical Pages                                 |
|       - Multilingual Engine (English, Telugu, Hindi)              |
|       - Guided Camera Capture & Pre-Flight Quality Check          |
+---------------------------------+---------------------------------+
                                  | HTTPS / TLS 1.3
                                  v
+-------------------------------------------------------------------+
|                     Backend Gateway (FastAPI)                     |
|       - Role-Based Access Control (Patient, Clinician, Admin)     |
|       - Audit Logging & Rate Limiting                             |
|       - PDF Report Generation Engine                              |
+-------------------+-----------------------------+-----------------+
                    |                             |
      Pre-Signed    |                             | JSON RPC / REST
     Encrypted I/O  v                             v
+-----------------------+           +-------------------------------+
|  Private Vault (S3)   |           |    Isolated AI Service        |
|  - Zero Public URLs   |           |    (PyTorch / ONNX Runtime)   |
|  - AES-256 Encryption |           |    - Color Normalization      |
|  - Pre-signed tokens  |           |    - Mucosa Segmentation      |
+-----------------------+           |    - Calibrated Uncertainty   |
                                    |    - Standard Tiers (A,B,C,D) |
                                    +-------------------------------+
```

---

## 3. Screening Result Tiers

- **Category A**: No suspicious feature detected in the submitted image. Routine dental review.
- **Category B**: Visible abnormality detected; professional assessment recommended.
- **Category C**: Image inconclusive; repeat imaging or seek professional assessment.
- **Category D**: Urgent clinical review recommended according to validated referral criteria.
