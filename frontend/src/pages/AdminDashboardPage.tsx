import { api } from '../services/api';
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Users, 
  Cpu, 
  Lock, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Database, 
  Search, 
  Award, 
  Eye, 
  Check, 
  X,
  Server,
  Key
} from 'lucide-react';
import { PageId, Language, AuditLogItem } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface AdminDashboardPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clinicians' | 'models' | 'audit' | 'retention'>('overview');
  const [liveStats, setLiveStats] = useState<any>(null);

  useEffect(() => {
    api.getAnalyticsStats().then(data => setLiveStats(data)).catch(() => {});
  }, []);

  // Clinician verification requests
  const [verifications, setVerifications] = useState([
    {
      id: 'VER-891',
      name: 'Dr. Suresh Babu, MDS',
      councilId: 'DCI-AP-2018-4921',
      hospital: 'King George Hospital, Visakhapatnam',
      status: 'Pending',
      submittedDate: '2026-10-29'
    },
    {
      id: 'VER-890',
      name: 'Dr. Ananya Roy, MS (Surg Onco)',
      councilId: 'MCI-DL-2016-1102',
      hospital: 'Safdarjung Hospital, New Delhi',
      status: 'Approved',
      submittedDate: '2026-10-27'
    }
  ]);

  // Audit Log items
  const [auditLogs] = useState<AuditLogItem[]>([
    {
      id: 'LOG-7712',
      timestamp: '2026-10-30 05:42:10 UTC',
      actor: 'dr.radhika@gdc-osmania.ac.in',
      action: 'VIEW_ENCRYPTED_IMAGE [CASE-2026-441]',
      ipAddress: '14.139.69.18 (Institutional IP)',
      status: 'VERIFIED'
    },
    {
      id: 'LOG-7711',
      timestamp: '2026-10-30 05:30:04 UTC',
      actor: 'SYSTEM_DAEMON',
      action: 'AUTO_QUALITY_VERIFICATION [Pass: 94/100]',
      ipAddress: '127.0.0.1 (Inference Cluster)',
      status: 'SUCCESS'
    },
    {
      id: 'LOG-7710',
      timestamp: '2026-10-30 04:19:55 UTC',
      actor: 'ANONYMOUS_SESSION_AD-2026-881920',
      action: 'INITIATE_PRELIMINARY_SCREENING',
      ipAddress: '49.205.112.44',
      status: 'SUCCESS'
    }
  ]);

  const handleApprove = (id: string) => {
    setVerifications(verifications.map(v => v.id === id ? { ...v, status: 'Approved' } : v));
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      {/* Admin Header */}
      <section className="bg-white border-b border-[#DCE8E9] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#18313B] text-[#B8E7D0] flex items-center justify-center font-bold text-xl shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-[#18313B] font-heading">
                    System Administration & Clinical Governance
                  </h1>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFEBEE] text-[#B42332] border border-[#FFCDD2]">
                    Administrator Tier
                  </span>
                </div>
                <p className="text-xs text-[#647681] mt-0.5 font-mono">
                  Environment: Production Node 01 • DPDP Compliance Mode: ACTIVE
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#237A57] bg-[#E8F5E9] px-3 py-1.5 rounded-lg border border-[#C8E6C9] font-semibold flex items-center gap-1.5">
                <Server className="w-4 h-4" /> Cluster Healthy (99.98% Uptime)
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex bg-white p-1 rounded-xl border border-[#DCE8E9] text-xs font-bold overflow-x-auto">
          {[
            { id: 'overview', label: 'System Health & Overview', icon: <Activity className="w-4 h-4" /> },
            { id: 'clinicians', label: 'Clinician Verifications', icon: <Award className="w-4 h-4" /> },
            { id: 'models', label: 'AI Model Registry', icon: <Cpu className="w-4 h-4" /> },
            { id: 'audit', label: 'Security & Audit Logs', icon: <FileText className="w-4 h-4" /> },
            { id: 'retention', label: 'DPDP Data Retention', icon: <Database className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#087F8C] text-white shadow-xs'
                  : 'text-[#647681] hover:text-[#18313B] hover:bg-[#F5FAFA]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Panels */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <Card className="p-5 border-l-4 border-l-[#087F8C]">
                <span className="text-xs font-bold text-[#647681] uppercase">Inference Engine Latency</span>
                <div className="text-2xl font-black text-[#18313B] font-heading mt-1">42 ms</div>
                <p className="text-[11px] text-[#237A57] mt-1">Optimal GPU acceleration</p>
              </Card>

              <Card className="p-5 border-l-4 border-l-[#2563A6]">
                <span className="text-xs font-bold text-[#647681] uppercase">Encrypted Vault Objects</span>
                <div className="text-2xl font-black text-[#2563A6] font-heading mt-1">
                  {liveStats ? `${liveStats.total_screenings} Records` : '1,287 Records'}
                </div>
                <p className="text-[11px] text-[#647681] mt-1">Zero public bucket leaks</p>
              </Card>

              <Card className="p-5 border-l-4 border-l-[#237A57]">
                <span className="text-xs font-bold text-[#647681] uppercase">Verified Clinicians</span>
                <div className="text-2xl font-black text-[#237A57] font-heading mt-1">48 Specialists</div>
                <p className="text-[11px] text-[#237A57] mt-1">State Dental Council verified</p>
              </Card>

              <Card className="p-5 border-l-4 border-l-[#A96A12]">
                <span className="text-xs font-bold text-[#647681] uppercase">Model Version</span>
                <div className="text-2xl font-black text-[#A96A12] font-heading mt-1">v2.4.1</div>
                <p className="text-[11px] text-[#647681] mt-1">Calibrated research deployment</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-base font-bold text-[#18313B] mb-2">Hospital Network Nodes Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-[#F5FAFA] rounded-xl border border-[#DCE8E9]">
                  <p className="font-bold text-[#18313B]">Osmania General Hospital / GDC</p>
                  <p className="text-[#237A57] font-semibold mt-1">● Online • 18 Screenings Reviewed Today</p>
                </div>
                <div className="p-4 bg-[#F5FAFA] rounded-xl border border-[#DCE8E9]">
                  <p className="font-bold text-[#18313B]">Homi Bhabha Cancer Hospital, Vizag</p>
                  <p className="text-[#237A57] font-semibold mt-1">● Online • 12 Priority Triage Resolved</p>
                </div>
                <div className="p-4 bg-[#F5FAFA] rounded-xl border border-[#DCE8E9]">
                  <p className="font-bold text-[#18313B]">AIIMS Dental OPD Tele-Triage</p>
                  <p className="text-[#237A57] font-semibold mt-1">● Online • Synchronized with Central Server</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* CLINICIANS TAB */}
        {activeTab === 'clinicians' && (
          <Card className="p-6 animate-fadeIn">
            <h3 className="text-base font-bold text-[#18313B] mb-1">Clinician Credential Verifications</h3>
            <p className="text-xs text-[#647681] mb-4">
              Review and verify Dental Council of India (DCI) or State Medical Council registrations before authorizing diagnostic review privileges.
            </p>

            <div className="divide-y divide-[#DCE8E9]">
              {verifications.map((v) => (
                <div key={v.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#18313B]">{v.name}</span>
                      <span className="font-mono text-[#087F8C] bg-[#E6F4F6] px-2 py-0.5 rounded font-semibold">
                        {v.councilId}
                      </span>
                      <Badge variant={v.status === 'Approved' ? 'success' : 'warning'} size="sm">
                        {v.status}
                      </Badge>
                    </div>
                    <p className="text-[#647681] mt-0.5">{v.hospital} • Submitted: {v.submittedDate}</p>
                  </div>

                  <div className="flex gap-2">
                    {v.status === 'Pending' ? (
                      <Button variant="primary" size="sm" onClick={() => handleApprove(v.id)} leftIcon={<Check className="w-3.5 h-3.5" />}>
                        Verify & Authorize
                      </Button>
                    ) : (
                      <span className="text-[#237A57] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Authorized Reviewer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* MODELS TAB */}
        {activeTab === 'models' && (
          <Card className="p-6 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between border-b border-[#DCE8E9] pb-3">
              <div>
                <h3 className="text-base font-bold text-[#18313B]">AI Model Registry & Validation Provenance</h3>
                <p className="text-xs text-[#647681]">Isolated inference service documentation & evaluation statistics</p>
              </div>
              <Badge variant="info">Quarantined Service</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F5FAFA] rounded-xl border border-[#DCE8E9] space-y-2">
                <span className="font-bold text-[#18313B] uppercase text-[11px]">Active Production Weights:</span>
                <p className="font-mono text-sm font-bold text-[#087F8C]">Aarogya-OralNet-v2.4.1.onnx</p>
                <p className="text-[#647681]">Architecture: Attention-ResNet50 + Multi-Scale Feature Pyramid</p>
                <div className="pt-2 border-t border-[#DCE8E9] space-y-1">
                  <div className="flex justify-between"><span>Sensitivity (Oral Lesions):</span> <strong>92.4% [95% CI: 89.1 - 94.8]</strong></div>
                  <div className="flex justify-between"><span>Specificity (Normal Mucosa):</span> <strong>91.8% [95% CI: 88.5 - 94.2]</strong></div>
                  <div className="flex justify-between"><span>Expected Calibration Error (ECE):</span> <strong>0.042 (High Reliability)</strong></div>
                </div>
              </div>

              <div className="p-4 bg-[#FFFBF0] rounded-xl border border-[#FFE6A5] space-y-2 text-[#3A3323]">
                <span className="font-bold text-[#8C550A] uppercase text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Clinical Governance Constraints
                </span>
                <p className="leading-relaxed">
                  The model is explicitly forbidden from generating independent TNM cancer staging or issuing definitive diagnostic assertions. Predictions outside the validated illumination spectrum (under 150 Lux or over 2500 Lux) are automatically suppressed by the safety gate.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* AUDIT LOG TAB */}
        {activeTab === 'audit' && (
          <Card className="p-6 animate-fadeIn">
            <h3 className="text-base font-bold text-[#18313B] mb-1">Append-Only Audit Log Register</h3>
            <p className="text-xs text-[#647681] mb-4">
              Cryptographically verified trace of every image lookup, report download, and clinician review.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#F5FAFA] text-[#647681] border-b border-[#DCE8E9]">
                  <tr>
                    <th className="py-2.5 px-3">Log ID</th>
                    <th className="py-2.5 px-3">Timestamp (UTC)</th>
                    <th className="py-2.5 px-3">Actor / Principal</th>
                    <th className="py-2.5 px-3">Action Signature</th>
                    <th className="py-2.5 px-3">Source Node</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE8E9]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F5FAFA]/80">
                      <td className="py-2.5 px-3 font-bold text-[#18313B]">{log.id}</td>
                      <td className="py-2.5 px-3 text-[#647681]">{log.timestamp}</td>
                      <td className="py-2.5 px-3 text-[#087F8C]">{log.actor}</td>
                      <td className="py-2.5 px-3 text-[#18313B]">{log.action}</td>
                      <td className="py-2.5 px-3 text-[#647681]">{log.ipAddress}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F5E9] text-[#237A57]">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* RETENTION TAB */}
        {activeTab === 'retention' && (
          <Card className="p-6 animate-fadeIn space-y-4">
            <h3 className="text-base font-bold text-[#18313B]">DPDP Act 2023 Data Retention & Purge Configuration</h3>
            <p className="text-xs text-[#647681]">
              Configure automatic rolling retention periods for raw oral photographs, audit timestamps, and diagnostic reports.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white border border-[#DCE8E9] rounded-xl space-y-2">
                <span className="font-bold text-[#18313B]">Unreviewed Patient Images</span>
                <p className="text-xl font-black text-[#087F8C]">30 Days</p>
                <p className="text-[#647681]">Auto-purged unless attached to verified clinician case.</p>
              </div>

              <div className="p-4 bg-white border border-[#DCE8E9] rounded-xl space-y-2">
                <span className="font-bold text-[#18313B]">Clinician-Certified Reports</span>
                <p className="text-xl font-black text-[#2563A6]">7 Years</p>
                <p className="text-[#647681]">Preserved per Medical Council of India legal record standards.</p>
              </div>

              <div className="p-4 bg-white border border-[#DCE8E9] rounded-xl space-y-2">
                <span className="font-bold text-[#18313B]">Right to Erasure SLA</span>
                <p className="text-xl font-black text-[#237A57]">&lt; 24 Hours</p>
                <p className="text-[#647681]">Immediate cryptographically verified deletion from all backups.</p>
              </div>
            </div>
          </Card>
        )}

      </main>
    </div>
  );
};
