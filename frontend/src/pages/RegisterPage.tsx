import React, { useState } from 'react';
import { UserCheck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId, Language, UserRole } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface RegisterPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<'patient' | 'clinician'>('patient');
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ageRange: '36-50',
    councilNumber: '',
    hospital: '',
    agreedToTerms: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      <main className="max-w-md mx-auto px-4 mt-12">
        <Card className="p-8 bg-white shadow-soft">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#087F8C] text-white flex items-center justify-center mx-auto mb-3">
              <UserCheck className="w-6 h-6 text-[#B8E7D0]" />
            </div>
            <h1 className="text-2xl font-black text-[#18313B] font-heading">
              Create an Account
            </h1>
            <p className="text-xs text-[#647681] mt-1">
              Join Aarogya Drishti as a Patient or Authorized Healthcare Professional
            </p>
          </div>

          <div className="flex bg-[#F5FAFA] p-1 rounded-xl border border-[#DCE8E9] mb-6">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'patient' ? 'bg-white text-[#087F8C] shadow-xs' : 'text-[#647681]'
              }`}
            >
              Patient Registration
            </button>
            <button
              type="button"
              onClick={() => setRole('clinician')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'clinician' ? 'bg-white text-[#2563A6] shadow-xs' : 'text-[#647681]'
              }`}
            >
              Clinician Registration
            </button>
          </div>

          {registered ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#237A57] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#18313B]">
                Account Created Successfully
              </h3>
              <p className="text-xs text-[#647681]">
                {role === 'clinician'
                  ? 'Your medical/dental council registration is submitted for administrator review.'
                  : 'Your patient reference account is active.'}
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('signin')}
                  className="w-full"
                >
                  Proceed to Sign In
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@email.com"
                  className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                />
              </div>

              {role === 'clinician' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Dental / Medical Council Reg. No. *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.councilNumber}
                      onChange={(e) => setFormData({ ...formData, councilNumber: e.target.value })}
                      placeholder="e.g. DCI-AP-2015-8941"
                      className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#2563A6] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                      Hospital / Institution Affiliation
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.hospital}
                      onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                      placeholder="e.g. Osmania Dental Hospital"
                      className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#2563A6] focus:bg-white"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                    Age Bracket
                  </label>
                  <select
                    value={formData.ageRange}
                    onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
                    className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                  >
                    <option value="18-35">18 - 35 years</option>
                    <option value="36-50">36 - 50 years</option>
                    <option value="51-65">51 - 65 years</option>
                    <option value="65+">65+ years</option>
                  </select>
                </div>
              )}

              <div className="p-3 bg-[#FFFBF0] rounded-xl border border-[#FFE6A5] text-[11px] text-[#3A3323]">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreedToTerms}
                    onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                    className="mt-0.5 rounded text-[#087F8C]"
                  />
                  <span>
                    I agree to the Terms of Use and understand that Aarogya Drishti provides screening assistance, not a final medical cancer diagnosis.
                  </span>
                </label>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={!formData.agreedToTerms}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Complete Registration
                </Button>
              </div>

              <div className="text-center pt-2 text-xs text-[#647681]">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('signin')}
                  className="text-[#087F8C] font-bold hover:underline"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

        </Card>
      </main>
    </div>
  );
};
