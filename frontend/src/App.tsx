import React, { useState, useEffect } from 'react';
import { PageId, Language } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ScreeningPage } from './pages/ScreeningPage';
import { OralHealthEducationPage } from './pages/OralHealthEducationPage';
import { WarningSignsPage } from './pages/WarningSignsPage';
import { FindSpecialistPage } from './pages/FindSpecialistPage';
import { VideoConsultPage } from './pages/VideoConsultPage';
import { LabTestsPage } from './pages/LabTestsPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { SurgeriesPage } from './pages/SurgeriesPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { SignInPage } from './pages/SignInPage';
import { RegisterPage } from './pages/RegisterPage';

// Specialized Clinical & Role Dashboards
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { ClinicianDashboardPage } from './pages/ClinicianDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('en');

  // Smooth scroll to top when changing views
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5FAFA] text-[#18313B]">
      {/* Universal Top Navigation with Active Role Indicators */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Dynamic Page Content */}
      <div className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'how-it-works' && <HowItWorksPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'screening' && <ScreeningPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'education' && <OralHealthEducationPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'warning-signs' && <WarningSignsPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'find-specialist' && <FindSpecialistPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'video-consult' && <VideoConsultPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'lab-tests' && <LabTestsPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'medicines' && <MedicinesPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'surgeries' && <SurgeriesPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'privacy' && <PrivacyPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'terms' && <TermsPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'signin' && <SignInPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'register' && <RegisterPage onNavigate={handleNavigate} language={language} />}

        {/* Dashboards */}
        {currentPage === 'patient-dashboard' && <PatientDashboardPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'clinician-dashboard' && <ClinicianDashboardPage onNavigate={handleNavigate} language={language} />}
        {currentPage === 'admin-dashboard' && <AdminDashboardPage onNavigate={handleNavigate} language={language} />}
      </div>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} language={language} />
    </div>
  );
};

export default App;
