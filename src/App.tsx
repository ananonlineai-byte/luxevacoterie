import React, { useState, useEffect, useCallback } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navigation } from './components/Navigation';
import { PledgeTopBand } from './components/PledgeTopBand';
import { HeroPinnedStage } from './components/HeroPinnedStage';
import { ServicesArchwaysStage } from './components/ServicesArchwaysStage';
import { SterilizationChamberStage } from './components/SterilizationChamberStage';
import { OrganiqueApothecaryBand } from './components/OrganiqueApothecaryBand';
import { BookingConsoleBand } from './components/BookingConsoleBand';
import { SafetyComparisonBand } from './components/SafetyComparisonBand';
import { FaqBand } from './components/FaqBand';
import { Footer } from './components/Footer';
import { LineQrModal } from './components/LineQrModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { ServiceCategory } from './types';
import { Sparkles, ArrowUp, MessageCircle } from 'lucide-react';

function SanctuaryApp() {
  const { content, isAdminOpen, setIsAdminOpen } = useCms();
  const { language } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>([]);
  const [isLineQrOpen, setIsLineQrOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Initialize selected service if empty
  useEffect(() => {
    if (selectedServices.length === 0 && content.services.length > 0) {
      setSelectedServices([content.services[0]]);
    }
  }, [content.services, selectedServices.length]);

  // Handle high-precision scroll calculations
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const globalProgress = docHeight > 0 ? scrollY / docHeight : 0;
    setScrollProgress(globalProgress);
    setShowBackToTop(scrollY > 400);

    // Hero Section Pinned Progress (approx 280svh height)
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const rect = heroEl.getBoundingClientRect();
      const heroHeight = heroEl.offsetHeight - window.innerHeight;
      if (heroHeight > 0) {
        const p = Math.min(1, Math.max(0, -rect.top / heroHeight));
        setHeroProgress(p);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for staggered animations
    const revElements = document.querySelectorAll('[data-rev]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    revElements.forEach((el) => {
      observer.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('is-revealed');
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [handleScroll]);

  // Quick scroll helper
  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Service toggle handler
  const handleToggleService = (service: ServiceCategory) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-[#FBF8F3] text-[#1E1718] selection:bg-[#63222D] selection:text-[#EBDCB9]">
      
      {/* Top Fixed Luxury Navigation (Streamlined & Clean) */}
      <Navigation
        scrollProgress={scrollProgress}
        onOpenBooking={scrollToBooking}
        onOpenLineQr={() => setIsLineQrOpen(true)}
      />

      <main>
        {/* 1. Quality & Safety Pledge Header Plate (From flyer top) */}
        <PledgeTopBand />

        {/* 2. Hero Pinned Stage (300svh scroll typography: "Elevate your Elegance" + "30% OFF") */}
        <HeroPinnedStage
          progress={heroProgress}
          onOpenBooking={scrollToBooking}
          onOpenLineQr={() => setIsLineQrOpen(true)}
        />

        {/* 3. The 4 Core Signature Arches Stage (Manicures, Pedicures, Hand Spas, Foot Spas) */}
        <ServicesArchwaysStage
          onSelectService={(s) => {
            handleToggleService(s);
            scrollToBooking();
          }}
          onOpenBooking={scrollToBooking}
        />

        {/* 4. Hospital-Grade Sterilization Chamber Priority Stage */}
        <SterilizationChamberStage />

        {/* 5. Safe. Organic. Imported from Korea ("The Organique" Product Line) */}
        <OrganiqueApothecaryBand />

        {/* 6. Interactive VIP Booking System & LINE QR Connect */}
        <BookingConsoleBand
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onOpenLineQr={() => setIsLineQrOpen(true)}
        />

        {/* 7. Safety Comparison Table */}
        <SafetyComparisonBand />

        {/* 8. Frequently Asked Questions */}
        <FaqBand />
      </main>

      {/* Luxury Footer matching flyer bottom */}
      <Footer
        onOpenBooking={scrollToBooking}
        onOpenLineQr={() => setIsLineQrOpen(true)}
      />

      {/* LINE QR Code Modal */}
      <LineQrModal
        isOpen={isLineQrOpen}
        onClose={() => setIsLineQrOpen(false)}
      />

      {/* Admin CMS Backoffice Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Floating Bottom Left Tools: Privilege Promo Banner */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2">
        {/* Month Promo Badge */}
        <div
          className="flex items-center gap-2.5 bg-[#63222D] text-[#FBF8F3] px-3.5 py-2 rounded-full border border-[#C5A059]/60 shadow-lg hover:scale-105 transition-transform cursor-pointer"
          onClick={scrollToBooking}
          title="Click to claim monthly discount"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#EBDCB9]" />
          <span className="font-cinzel text-[11px] font-bold tracking-wider text-[#EBDCB9]">
            {content.hero.headlineMonth.toUpperCase()}: {content.hero.discountPercent} OFF
          </span>
        </div>
      </div>

      {/* Floating Bottom Right: Floating LINE Concierge Button & Back To Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Back To Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#C5A059]/60 text-[#63222D] shadow-md flex items-center justify-center hover:bg-[#63222D] hover:text-[#EBDCB9] transition-all cursor-pointer"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Floating LINE Concierge Quick Button */}
        <button
          onClick={() => setIsLineQrOpen(true)}
          className="flex items-center gap-2.5 bg-[#06C755] hover:bg-[#05963E] text-white px-4 py-2.5 rounded-full shadow-xl hover:scale-105 transition-all cursor-pointer border border-white/20 group"
          title="Chat with Concierge on LINE"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-300 rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-[9px] uppercase tracking-wider text-emerald-100 font-medium leading-none">
              {language === 'th' ? 'แชทนัดหมายด่วน' : 'CONCIERGE CHAT'}
            </div>
            <div className="text-xs font-bold leading-tight">
              LINE {content.brand.lineId}
            </div>
          </div>
        </button>
      </div>

    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <CmsProvider>
        <SanctuaryApp />
      </CmsProvider>
    </LanguageProvider>
  );
}

export default App;
