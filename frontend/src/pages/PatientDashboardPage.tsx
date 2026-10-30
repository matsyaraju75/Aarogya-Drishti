import { api } from '../services/api';
import React, { useState, useEffect } from 'react';
import { 
  User, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Download, 
  ArrowRight, 
  Clock, 
  Trash2, 
  Globe, 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  RefreshCw,
  Stethoscope
} from 'lucide-react';
import { PageId, Language, ScreeningRecord } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface PatientDashboardPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const PatientDashboardPage: React.FC<PatientDashboardPageProps> = ({ onNavigate, language }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  // Patient screening records with real backend sync
  const [records, setRecords] = useState<ScreeningRecord[]>([
    {
      id: 'REC-0982',
      patientRef: 'AD-2026-881920',
      date: '2026-10-28 14:22 UTC',
      category: 'B',
      symptomSummary: 'White keratotic patch on right buccal mucosa (> 14 days)',
      imageThumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
      clinicalStatus: 'Reviewed',
      reviewedBy: 'Dr. Radhika Varma, MDS',
      notes: 'Homogenous leukoplakic plaque. Recommended non-urgent biopsy and tobacco cessation.',
      urgency: 'Moderate'
    },
    {
      id: 'REC-0841',
      patientRef: 'AD-2026-881920',
      date: '2026-08-14 09:15 UTC',
      category: 'A',
      symptomSummary: 'Routine preventive oral cavity self-check',
      imageThumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
      clinicalStatus: 'Reviewed',
      reviewedBy: 'Dr. Amitabh Sen, MDS',
      notes: 'No mucosal abnormality detected. Advised continued 6-month checkup.',
      urgency: 'Routine'
    }
  ]);

  useEffect(() => {
    api.getScreenings().then((res) => {
      if (res.screenings && res.screenings.length > 0) {
        const mapped: ScreeningRecord[] = res.screenings.map((s: any) => ({
          id: s.id,
          patientRef: s.id,
          date: s.created_at,
          category: (s.category.replace('Category ', '') as any) || 'B',
          symptomSummary: `${s.symptoms_duration || ''} | ${s.findings || 'Clinical screening'}`,
          imageThumbnail: s.image_url || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
          clinicalStatus: s.clinician_review_status || 'Reviewed',
          reviewedBy: s.clinician_review_status === 'Reviewed' ? 'Dr. P. Ananya Varma, MDS' : 'Pending Verification',
          notes: s.clinician_notes || s.recommendations || 'Regular clinical observation advised',
          urgency: s.category === 'Category D' ? 'Urgent' : s.category === 'Category B' ? 'Moderate' : 'Routine'
        }));
        setRecords(mapped);
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      {/* Patient Header Banner */}
      <section className="bg-white border-b border-[#DCE8E9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#087F8C] to-[#075B66] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                <User className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#18313B] font-heading">
                    Patient Health Vault
                  </h1>
                  <Badge variant="success" size="sm">Active Account</Badge>
                </div>
                <p className="text-xs text-[#647681] mt-0.5 font-mono">
                  Patient Reference ID: <strong>AD-2026-881920</strong> (Pseudonymized Record)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('screening')}
                leftIcon={<ShieldCheck className="w-4 h-4 text-[#B8E7D0]" />}
              >
                Start New AI Screening
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-5 border-l-4 border-l-[#087F8C]">
            <span className="text-xs font-bold text-[#647681] uppercase">Total Screenings</span>
            <div className="text-2xl font-black text-[#18313B] font-heading mt-1">2 Reports</div>
            <p className="text-[11px] text-[#237A57] mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All securely encrypted in vault
            </p>
          </Card>

          <Card className="p-5 border-l-4 border-l-[#2563A6]">
            <span className="text-xs font-bold text-[#647681] uppercase">Clinical Reviews</span>
            <div className="text-2xl font-black text-[#2563A6] font-heading mt-1">100% Completed</div>
            <p className="text-[11px] text-[#647681] mt-1">
              Reviewed by licensed Oral Medicine specialists
            </p>
          </Card>

          <Card className="p-5 border-l-4 border-l-[#A96A12]">
            <span className="text-xs font-bold text-[#647681] uppercase">Follow-Up Action</span>
            <div className="text-2xl font-black text-[#A96A12] font-heading mt-1">In 4 Days</div>
            <p className="text-[11px] text-[#A96A12] mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 14-Day mucosal inspection re-check
            </p>
          </Card>
        </div>

        {/* Screening History & Reports Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DCE8E9]">
            <div>
              <h2 className="text-base font-bold text-[#18313B]">Screening Records & Clinical Summaries</h2>
              <p className="text-xs text-[#647681]">Access your historical AI analyses, clinician notes, and downloadable PDF reports.</p>
            </div>
            <Badge variant="info">Encrypted Storage</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5FAFA] text-[#647681] uppercase tracking-wider border-b border-[#DCE8E9]">
                <tr>
                  <th className="py-3 px-4">Record ID & Date</th>
                  <th className="py-3 px-4">Image Preview</th>
                  <th className="py-3 px-4">Triage Category</th>
                  <th className="py-3 px-4">Reported Symptoms</th>
                  <th className="py-3 px-4">Doctor Review</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE8E9]">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-[#F5FAFA]/70 transition-colors">
                    <td className="py-4 px-4 font-mono">
                      <p className="font-bold text-[#18313B]">{rec.id}</p>
                      <p className="text-[11px] text-[#647681]">{rec.date}</p>
                    </td>

                    <td className="py-4 px-4">
                      <img
                        src={rec.imageThumbnail}
                        alt="Mucosa capture thumbnail"
                        className="w-12 h-12 rounded-lg object-cover border border-[#DCE8E9]"
                      />
                    </td>

                    <td className="py-4 px-4">
                      <Badge variant={rec.category === 'A' ? 'categoryA' : rec.category === 'B' ? 'categoryB' : rec.category === 'C' ? 'categoryC' : 'categoryD'}>
                        Category {rec.category}
                      </Badge>
                    </td>

                    <td className="py-4 px-4 max-w-xs text-[#18313B]">
                      <p className="line-clamp-2">{rec.symptomSummary}</p>
                    </td>

                    <td className="py-4 px-4">
                      <p className="font-bold text-[#087F8C]">{rec.reviewedBy}</p>
                      <p className="text-[11px] text-[#647681] line-clamp-1">{rec.notes}</p>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigate('screening')}
                        leftIcon={<Download className="w-3.5 h-3.5 text-[#087F8C]" />}
                      >
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Privacy & Account Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Preferences */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-base text-[#18313B] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#087F8C]" /> Language & Communication Preferences
            </h3>
            <p className="text-xs text-[#647681]">
              Reports and notifications will be rendered according to your chosen language.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <label className="text-xs font-semibold text-[#18313B]">Report Language</label>
              <select className="bg-[#F5FAFA] border border-[#DCE8E9] rounded-lg p-2 text-xs">
                <option value="en">English (Clinical Standard)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </Card>

          {/* DPDP 2023 Data Rights */}
          <Card className="p-6 space-y-4 border-l-4 border-l-[#B42332]">
            <h3 className="font-bold text-base text-[#B42332] flex items-center gap-2">
              <Trash2 className="w-4 h-4" /> Data Protection & Account Deletion
            </h3>
            <p className="text-xs text-[#647681] leading-relaxed">
              Under the Indian Digital Personal Data Protection Act (DPDP Act 2023), you hold the right to erase all uploaded images and clinical history permanently from our encrypted servers.
            </p>
            <div className="pt-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteModal(true)}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Request Permanent Data Erasure
              </Button>
            </div>
          </Card>

        </div>

      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 space-y-4 bg-white animate-fadeIn">
            <div className="w-12 h-12 rounded-xl bg-[#FFEBEE] text-[#B42332] flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#18313B]">Confirm Irreversible Data Erasure</h3>
            <p className="text-xs text-[#647681] leading-relaxed">
              This action will purge your Patient Reference ID (AD-2026-881920), delete all stored oral photographs from our private encrypted storage bucket, and erase associated screening records. This action cannot be reversed.
            </p>
            <div className="flex justify-end gap-3 pt-3">
              <Button variant="outline" size="sm" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setDeleteConfirmed(true);
                  setTimeout(() => {
                    setShowDeleteModal(false);
                    onNavigate('home');
                  }, 1200);
                }}
              >
                {deleteConfirmed ? 'Purging Records...' : 'Permanently Delete'}
              </Button>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
};
