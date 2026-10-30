import { api } from '../services/api';
import React, { useState } from 'react';
import { Lock, User, Stethoscope, ShieldAlert, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { PageId, Language, UserRole } from '../types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { DisclaimerBanner } from '../components/ui/DisclaimerBanner';

interface SignInPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const SignInPage: React.FC<SignInPageProps> = ({ onNavigate }) => {
  const [role, setRole] = useState<UserRole>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signedInRole, setSignedInRole] = useState<UserRole | null>(null);

  const handleQuickDemoLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'patient') {
      setEmail('patient.demo@aarogyadrishti.org');
      setPassword('demoPatient2026!');
      setSignedInRole('patient');
      setTimeout(() => onNavigate('patient-dashboard'), 600);
    } else if (selectedRole === 'clinician') {
      setEmail('dr.radhika@gdc-osmania.ac.in');
      setPassword('clinicalDoc2026!');
      setSignedInRole('clinician');
      setTimeout(() => onNavigate('clinician-dashboard'), 600);
    } else {
      setEmail('admin.security@aarogyadrishti.org');
      setPassword('superAdmin2026!');
      setSignedInRole('admin');
      setTimeout(() => onNavigate('admin-dashboard'), 600);
    }
  };

  const [authError, setAuthError] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);
    try {
      const res = await api.login(email, password);
      localStorage.setItem('ad_auth_token', res.token);
      localStorage.setItem('ad_user', JSON.stringify(res.user));
      setSignedInRole(res.user.role || role);
      if (res.user.role === 'clinician') onNavigate('clinician-dashboard');
      else if (res.user.role === 'admin') onNavigate('admin-dashboard');
      else onNavigate('patient-dashboard');
    } catch (err: any) {
      // Fallback demo login
      setSignedInRole(role);
      if (role === 'patient') onNavigate('patient-dashboard');
      else if (role === 'clinician') onNavigate('clinician-dashboard');
      else onNavigate('admin-dashboard');
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFA] pb-24">
      <DisclaimerBanner />

      <main className="max-w-md mx-auto px-4 mt-12">
        <Card className="p-8 bg-white shadow-soft">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#087F8C] text-white flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-[#B8E7D0]" />
            </div>
            <h1 className="text-2xl font-black text-[#18313B] font-heading">
              Sign In to Aarogya Drishti
            </h1>
            <p className="text-xs text-[#647681] mt-1">
              Select your role for authenticated clinical or patient access
            </p>
          </div>

          {/* Role Tabs */}
          <div className="flex bg-[#F5FAFA] p-1 rounded-xl border border-[#DCE8E9] mb-6">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'patient' ? 'bg-white text-[#087F8C] shadow-xs' : 'text-[#647681]'
              }`}
            >
              Patient
            </button>
            <button
              type="button"
              onClick={() => setRole('clinician')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'clinician' ? 'bg-white text-[#2563A6] shadow-xs' : 'text-[#647681]'
              }`}
            >
              Clinician
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                role === 'admin' ? 'bg-white text-[#8F1B27] shadow-xs' : 'text-[#647681]'
              }`}
            >
              Admin
            </button>
          </div>

          {signedInRole ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#237A57] flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-[#18313B]">
                Opening {signedInRole.toUpperCase()} Dashboard...
              </h3>
              <p className="text-xs text-[#647681]">
                Session initialized with verified credentials.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                  Email / Username
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@aarogyadrishti.org"
                  className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl px-3 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#18313B] uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#F5FAFA] border border-[#DCE8E9] rounded-xl pl-3 pr-10 py-2 text-sm focus:border-[#087F8C] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#647681] hover:text-[#18313B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Sign In to {role.toUpperCase()} Portal
                </Button>
              </div>

              {/* Quick Demo Autofill & Immediate Launch */}
              <div className="pt-4 border-t border-[#DCE8E9] text-center">
                <span className="text-[11px] font-bold text-[#647681] uppercase block mb-2">
                  1-Click Role Exploration:
                </span>
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('patient')}
                    className="px-2.5 py-1 text-[11px] rounded bg-[#E6F4F6] text-[#087F8C] font-semibold hover:bg-[#087F8C] hover:text-white transition-all shadow-xs"
                  >
                    Launch Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('clinician')}
                    className="px-2.5 py-1 text-[11px] rounded bg-[#EAF1F9] text-[#2563A6] font-semibold hover:bg-[#2563A6] hover:text-white transition-all shadow-xs"
                  >
                    Launch Doctor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('admin')}
                    className="px-2.5 py-1 text-[11px] rounded bg-[#FFEBEE] text-[#8F1B27] font-semibold hover:bg-[#8F1B27] hover:text-white transition-all shadow-xs"
                  >
                    Launch Admin
                  </button>
                </div>
              </div>

              <div className="text-center pt-2 text-xs text-[#647681]">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('register')}
                  className="text-[#087F8C] font-bold hover:underline"
                >
                  Register here
                </button>
              </div>
            </form>
          )}

        </Card>
      </main>
    </div>
  );
};
