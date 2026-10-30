import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Building2 } from 'lucide-react';
import { PageId, Language } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      <section className="bg-white border-b border-[#DCE8E9] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="info" className="mb-3">Clinical & Technical Support</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-[#18313B] font-heading">
            Contact & Institutional Support
          </h1>
          <p className="text-[#647681] text-base mt-3 max-w-3xl leading-relaxed">
            Have clinical inquiries, wish to connect a hospital network, or need technical assistance? Our clinical informatics team is here to assist.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 bg-white space-y-6">
              <h3 className="text-lg font-bold text-[#18313B] border-b border-[#DCE8E9] pb-3">
                Emergency & Clinical Inquiries
              </h3>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4F6] text-[#087F8C] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#647681] uppercase">National Cancer Helpline</h4>
                  <p className="text-sm font-bold text-[#18313B] mt-0.5">1800-22-1951 (Toll-Free, 24/7)</p>
                  <p className="text-xs text-[#647681]">Free confidential guidance in multiple Indian languages</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EAF1F9] text-[#2563A6] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#647681] uppercase">Institutional & Technical Email</h4>
                  <p className="text-sm font-bold text-[#18313B] mt-0.5">support@aarogyadrishti.org</p>
                  <p className="text-xs text-[#647681]">Clinical review inquiries & hospital integrations</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EDF9F3] text-[#237A57] flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#647681] uppercase">Research & Development Centers</h4>
                  <p className="text-sm font-bold text-[#18313B] mt-0.5">Digital Health Innovation Wing</p>
                  <p className="text-xs text-[#647681]">New Delhi • Hyderabad • Visakhapatnam • Bengaluru</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-[#087F8C] text-white">
              <h4 className="font-bold text-sm text-[#B8E7D0] uppercase tracking-wider mb-2">Hospital Pilot Inquiries</h4>
              <p className="text-xs leading-relaxed text-white/90">
                Are you a state dental college, district hospital, or oncology research center? Aarogya Drishti supports federated learning and authorized clinical review pilot programs.
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Card className="p-8 bg-white">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] text-[#237A57] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-[#18313B] font-heading">Inquiry Received</h3>
                  <p className="text-sm text-[#647681] max-w-md mx-auto">
                    Thank you for reaching out. Our clinical informatics team will respond within 24 business hours.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-[#18313B] border-b border-[#DCE8E9] pb-3 mb-4">
                    Send an Inquiry or Feedback
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. / Mr. / Ms. Name"
                        className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@hospital.org"
                        className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                        Hospital / Institution
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Government Dental College"
                        className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                        Nature of Inquiry
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                      >
                        <option value="general">General Information</option>
                        <option value="clinical">Clinical Consultation Protocol</option>
                        <option value="pilot">Hospital Pilot / Deployment</option>
                        <option value="technical">Technical Support</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry, institutional requirements, or feedback..."
                      className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl p-3 text-sm focus:border-[#087F8C] focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      leftIcon={<Send className="w-4 h-4 text-[#B8E7D0]" />}
                    >
                      Submit Clinical Inquiry
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
};
