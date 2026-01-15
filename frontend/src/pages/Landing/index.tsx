import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WelcomePopup from '../../components/WelcomePopup';
import FloatingActions from '../../components/FloatingActions';
import HeroSection from './HeroSection';
import PromoBannerSection from './PromoBannerSection';
import ServicesSection from './ServicesSection';
import DoctorsSection from './DoctorsSection';
import TestimonialsSection from './TestimonialsSection';
import BookingSection from './BookingSection';
import LocationSection from './LocationSection';
import TrustBadgesSection from './TrustBadgesSection';
import FAQSection from './FAQSection';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <WelcomePopup />
      <FloatingActions />
      <HeroSection />
      <TrustBadgesSection />
      <PromoBannerSection />
      <ServicesSection />
      <DoctorsSection />
      <TestimonialsSection />
      <BookingSection />
      <FAQSection />
      <LocationSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
