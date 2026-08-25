import React, { useState, useEffect } from 'react';
import { Calendar, Shield, Sparkles, MessageCircle, Sliders, Menu, X, ChevronRight, Phone, Clock, Globe, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

interface NavigationProps {
  scrollProgress: number;
  onOpenBooking: () => void;
  onOpenLineQr: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  scrollProgress,
  onOpenBooking,
  onOpenLineQr,
}) => {
  const { content, setIsAdminOpen } = useCms();
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (anchorId: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-nav"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-xs"
      >
        {/* 1. International Luxury Top Announcement Ribbon */}
        <div className="bg-[#3D141C] text-[#EBDCB9] border-b border-[#C5A059]/30 py-1.5 px-3 sm:px-6 text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping shrink-0" />
              <span className="font-medium tracking-wide">
                {language === 'th'
                  ? `✦ สิทธิพิเศษเปิดตัว (GRAND OPENING): รับส่วนลด ${content.hero.discountPercent} ทุกรายการตลอดเดือน ${content.hero.headlineMonth}`
                  : `✦ GRAND OPENING PRIVILEGE: Enjoy ${content.hero.discountPercent} throughout ${content.hero.headlineMonth} on all Korean rituals`}
              </span>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-1 font-bold text-[#EBDCB9] hover:text-white transition-colors cursor-pointer shrink-0 text-[10px] sm:text-[11px] underline underline-offset-2"
            >
              <span>{language === 'th' ? 'รับสิทธิ์จองคิว' : 'Claim Privilege'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 2. Main Luxury Header Bar */}
        <div className="bg-[#FBF8F3]/95 backdrop-blur-md border-b border-[#63222D]/10 relative">
          
          {/* Scroll Progress Indicator Rail */}
          <div className="w-full h-[2px] bg-[#63222D]/10 absolute top-0 left-0">
            <div
              className="h-full bg-gradient-to-r from-[#63222D] via-[#C5A059] to-[#63222D] transition-all duration-75"
              style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Left: Brand Monogram & Wordmark */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C5A059]/60 bg-[#F4ECE1] flex items-center justify-center text-[#63222D] font-didone font-semibold text-base sm:text-lg group-hover:scale-105 transition-transform shadow-xs">
                {content.brand.monogram || 'LC'}
              </div>
              <div className="flex flex-col">
                <span className="font-didone text-base sm:text-lg font-bold tracking-[0.08em] text-[#63222D] uppercase leading-none">
                  {content.brand.salonName.split(' ')[0] || 'LUXEVA'}
                </span>
                <span className="editorial-furniture text-[8px] sm:text-[9px] tracking-[0.28em] text-[#C5A059] font-medium mt-0.5">
                  {content.brand.salonName.split(' ').slice(1).join(' ') || 'COTERIE'}
                </span>
              </div>
            </a>

            {/* Center: Clean Luxury Nav Links (Desktop - strictly 1 line, responsive spacing) */}
            <nav className="hidden lg:flex items-center justify-center flex-nowrap shrink-0 whitespace-nowrap gap-x-2.5 xl:gap-x-5 2xl:gap-x-7 text-[#1E1718] text-center mx-auto px-1">
              <a
                href="#pledge"
                onClick={(e) => { e.preventDefault(); handleNavClick('pledge'); }}
                className="editorial-furniture text-[10px] xl:text-[11px] text-[#1E1718]/85 hover:text-[#63222D] transition-colors inline-flex items-center justify-center gap-1.5 py-1 whitespace-nowrap shrink-0"
              >
                <Shield className="w-3 h-3 text-[#C5A059] shrink-0" />
                <span>{t.nav.safetyPledge}</span>
              </a>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                className="editorial-furniture text-[10px] xl:text-[11px] text-[#1E1718]/85 hover:text-[#63222D] transition-colors inline-flex items-center justify-center gap-1.5 py-1 whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3 h-3 text-[#C5A059] shrink-0" />
                <span>{t.nav.services}</span>
              </a>
              <a
                href="#sterilization"
                onClick={(e) => { e.preventDefault(); handleNavClick('sterilization'); }}
                className="editorial-furniture text-[10px] xl:text-[11px] text-[#1E1718]/85 hover:text-[#63222D] transition-colors inline-flex items-center justify-center py-1 whitespace-nowrap shrink-0"
              >
                <span>{t.nav.sterilization}</span>
              </a>
              <a
                href="#organique"
                onClick={(e) => { e.preventDefault(); handleNavClick('organique'); }}
                className="editorial-furniture text-[10px] xl:text-[11px] text-[#1E1718]/85 hover:text-[#63222D] transition-colors inline-flex items-center justify-center py-1 whitespace-nowrap shrink-0"
              >
                <span>{t.nav.organique}</span>
              </a>
              <a
                href="#faq"
                onClick={(e) => { e.preventDefault(); handleNavClick('faq'); }}
                className="editorial-furniture text-[10px] xl:text-[11px] text-[#1E1718]/85 hover:text-[#63222D] transition-colors inline-flex items-center justify-center py-1 whitespace-nowrap shrink-0"
              >
                <span>{t.nav.faq}</span>
              </a>
            </nav>

            {/* Right: Streamlined Global Standard Actions [BOOK NOW] -> [TH/EN] -> [CMS] */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

              {/* 1. Primary Booking CTA */}
              <button
                onClick={onOpenBooking}
                className="editorial-furniture inline-flex items-center gap-2 py-2 px-3.5 sm:px-5 bg-[#63222D] text-[#FBF8F3] hover:bg-[#46161F] hover:shadow-md transition-all cursor-pointer rounded-full group shrink-0 text-[11px] sm:text-xs font-semibold tracking-[0.14em]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#EBDCB9] group-hover:rotate-12 transition-transform" />
                <span>{language === 'th' ? 'จองคิวออนไลน์' : 'BOOK NOW'}</span>
              </button>

              {/* 2. Language Switcher Pill (TH / EN placed to the right of BOOK NOW) */}
              <div className="flex items-center bg-[#F4ECE1] border border-[#C5A059]/40 rounded-full p-0.5 shadow-2xs">
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                    language === 'th'
                      ? 'bg-[#63222D] text-[#FBF8F3] shadow-xs'
                      : 'text-[#63222D]/70 hover:text-[#63222D]'
                  }`}
                  title="ภาษาไทย"
                >
                  TH
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#63222D] text-[#FBF8F3] shadow-xs'
                      : 'text-[#63222D]/70 hover:text-[#63222D]'
                  }`}
                  title="English"
                >
                  EN
                </button>
              </div>

              {/* 3. Discreet Staff CMS Button on Header next to Language Switcher */}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 bg-[#FAF6F0] hover:bg-[#63222D] text-[#63222D] hover:text-[#EBDCB9] border border-[#C5A059]/50 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="Open Admin CMS Backoffice"
              >
                <Sliders className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[11px]">CMS</span>
              </button>

              {/* Mobile / Tablet Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#63222D] hover:bg-[#63222D]/5 rounded-md transition-colors cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Navigation Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden pt-24 bg-[#FBF8F3]/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn">
          
          {/* Navigation Links List */}
          <div className="flex flex-col gap-1 py-2">
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between pb-4 mb-2 border-b border-[#63222D]/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#63222D]">
                <Globe className="w-4 h-4 text-[#C5A059]" />
                <span>{language === 'th' ? 'เลือกภาษา / LANGUAGE' : 'SELECT LANGUAGE'}</span>
              </div>
              <div className="flex items-center bg-[#F4ECE1] border border-[#C5A059]/40 rounded-full p-1 shadow-xs">
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                    language === 'th'
                      ? 'bg-[#63222D] text-[#FBF8F3] shadow-xs'
                      : 'text-[#63222D]/70'
                  }`}
                >
                  ไทย (TH)
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                    language === 'en'
                      ? 'bg-[#63222D] text-[#FBF8F3] shadow-xs'
                      : 'text-[#63222D]/70'
                  }`}
                >
                  ENG (EN)
                </button>
              </div>
            </div>

            <div className="editorial-furniture text-[#C5A059] text-[10px] tracking-[0.25em] mb-2 px-3">
              {t.nav.navigationSanctuary}
            </div>

            <button
              onClick={() => handleNavClick('pledge')}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F4ECE1] text-left text-[#1E1718] hover:text-[#63222D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[#C5A059]" />
                <span className="font-didone text-base tracking-wide uppercase font-medium">1. {t.nav.safetyPledge}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavClick('services')}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F4ECE1] text-left text-[#1E1718] hover:text-[#63222D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span className="font-didone text-base tracking-wide uppercase font-medium">2. {t.nav.services}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavClick('sterilization')}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F4ECE1] text-left text-[#1E1718] hover:text-[#63222D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[#C5A059]" />
                <span className="font-didone text-base tracking-wide uppercase font-medium">3. {t.nav.sterilization}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavClick('organique')}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F4ECE1] text-left text-[#1E1718] hover:text-[#63222D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span className="font-didone text-base tracking-wide uppercase font-medium">4. {t.nav.organique}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F4ECE1] text-left text-[#1E1718] hover:text-[#63222D] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="font-didone font-bold text-sm text-[#C5A059]">?</span>
                <span className="font-didone text-base tracking-wide uppercase font-medium">5. {t.nav.faq}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Action Drawer Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-[#63222D]/10">
            {/* Direct Booking CTA */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#63222D] text-[#FBF8F3] font-didone text-base uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#EBDCB9]" />
              <span>{t.nav.reserveAppointment} ({content.hero.discountPercent})</span>
            </button>

            {/* Quick Line Chat */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenLineQr();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 border border-[#06C755]/40 bg-[#06C755]/10 text-[#05963E] font-medium text-sm rounded-xl cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>LINE OFFICIAL ({content.brand.lineId})</span>
            </button>

            {/* Admin CMS Access in Drawer for Salon Staff */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAdminOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#C5A059]/50 bg-[#F4ECE1] text-[#63222D] text-xs font-semibold rounded-xl cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{language === 'th' ? 'ระบบจัดการหลังบ้าน (CMS)' : 'Admin Backoffice (CMS)'}</span>
            </button>

            {/* Salon Info footer */}
            <div className="flex items-center justify-between text-[11px] text-[#63222D]/70 pt-2 px-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#C5A059]" />
                <span>{content.brand?.openingHours || t.nav.hours}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-[#C5A059]" />
                <span>{content.brand?.phone || t.nav.phone}</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
