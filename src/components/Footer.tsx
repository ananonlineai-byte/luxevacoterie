import React from 'react';
import { MessageCircle, Phone, MapPin, Clock, ShieldCheck, Sliders } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenLineQr: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenLineQr }) => {
  const { content, setIsAdminOpen } = useCms();
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#1C1514] text-[#FBF8F3] pt-16 pb-12 px-4 sm:px-8 border-t border-[#C5A059]/30 relative overflow-hidden">
      
      {/* Top Banner Accent matching the flyer bottom banner */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="rounded-2xl border border-[#C5A059]/50 bg-gradient-to-r from-[#63222D] via-[#7A2A37] to-[#63222D] p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="editorial-furniture text-[#EBDCB9] text-[10px] sm:text-xs tracking-[0.3em] uppercase">
                ✦ {language === 'th' ? `ยินดีต้อนรับสู่ ${content.brand.salonName.toUpperCase()}` : `WE CAN'T WAIT TO WELCOME YOU TO ${content.brand.salonName.toUpperCase()}`} ✦
              </span>
              <h3 className="font-didone text-2xl sm:text-3xl font-bold text-white mt-1">
                {language === 'th' ? `สัมผัสประสบการณ์ความงามเหนือระดับในเดือน${content.hero.headlineMonth}` : `Elevate Your Elegance This ${content.hero.headlineMonth}`}
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#EBDCB9] text-[#63222D] editorial-furniture text-xs font-bold hover:bg-white transition-all rounded-sm shadow-md cursor-pointer"
              >
                {language === 'th' ? `จองคิวลด ${content.hero.discountPercent}` : `RESERVE ${content.hero.discountPercent}`}
              </button>
              <button
                onClick={onOpenLineQr}
                className="px-5 py-3 border border-[#EBDCB9]/40 text-[#EBDCB9] editorial-furniture text-xs hover:bg-white/10 transition-all rounded-sm cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>{language === 'th' ? 'แอดไลน์' : 'ADD ON LINE'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-xs">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border border-[#C5A059] bg-[#2D1F21] flex items-center justify-center font-didone text-lg text-[#C5A059] font-bold">
              {content.brand.monogram}
            </div>
            <div>
              <div className="font-didone text-lg font-bold tracking-widest text-[#FBF8F3]">
                {content.brand.salonName.split(' ')[0]}
              </div>
              <div className="editorial-furniture text-[9px] text-[#C5A059]">
                {content.brand.salonName.split(' ').slice(1).join(' ')}
              </div>
            </div>
          </div>
          <p className="text-white/60 font-didone italic leading-relaxed">
            {language === 'th' ? 'สปาและทำเล็บสไตล์เกาหลีระดับพรีเมียม สารสกัดออร์แกนิก ปลอดเชื้อตามมาตรฐานเครื่องมือแพทย์' : `${content.brand.tagline}. Authentically imported from Seoul, certified organic, and hospital-grade sterilized.`}
          </p>
        </div>

        {/* Signature Rituals */}
        <div>
          <div className="font-cinzel text-xs font-bold text-[#C5A059] tracking-wider uppercase mb-3">
            {language === 'th' ? 'บริการแนะนำ' : 'SIGNATURE RITUALS'}
          </div>
          <ul className="space-y-2 text-white/70">
            {content.services.map((service) => (
              <li key={service.id}>
                <a href="#services" className="hover:text-[#C5A059] transition-colors">
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Safety & Sterilization */}
        <div>
          <div className="font-cinzel text-xs font-bold text-[#C5A059] tracking-wider uppercase mb-3">
            {language === 'th' ? 'มาตรฐานความสะอาด' : 'SAFETY & STANDARDS'}
          </div>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              {language === 'th' ? `ตู้อบสุญญากาศทางการแพทย์ Class-B ${content.sterilization.chamberTemp}` : `Class-B Medical Autoclave ${content.sterilization.chamberTemp}`}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              {language === 'th' ? 'ซองซีลปลอดเชื้อแบบใช้ครั้งเดียว' : 'Single-Use Hermetic Pouches'}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              {language === 'th' ? 'เจลออร์แกนิกเกาหลี 10-Free ไร้สารพิษ' : '10-Free Korean Organic Gels'}
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              {language === 'th' ? 'อ่างไม้ฮิโนกิไร้ท่อ ป้องกันแบคทีเรีย' : 'Pipeless Hinoki Basins'}
            </li>
          </ul>
        </div>

        {/* Location & Hours */}
        <div>
          <div className="font-cinzel text-xs font-bold text-[#C5A059] tracking-wider uppercase mb-3">
            {language === 'th' ? 'ข้อมูลติดต่อและสาขา' : 'SANCTUARY CONCIERGE'}
          </div>
          <div className="space-y-2.5 text-white/70">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
              <span>{content.brand.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{content.brand.openingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{content.brand.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-[#06C755]">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>LINE: {content.brand.lineId}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/40">
        <div>
          &copy; {new Date().getFullYear()} {content.brand.salonName}. All rights reserved. Made in Korea imported standards.
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsAdminOpen(true)}
            className="text-[#C5A059] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Sliders className="w-3 h-3" />
            <span>{language === 'th' ? 'ระบบจัดการหลังบ้าน (CMS)' : 'Admin Backoffice (CMS)'}</span>
          </button>
          <span className="hover:text-white transition-colors cursor-pointer">{language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}</span>
          <span className="hover:text-white transition-colors cursor-pointer">{language === 'th' ? 'บันทึกการฆ่าเชื้อ' : 'Sterilization Log'}</span>
          <span className="hover:text-white transition-colors cursor-pointer">{language === 'th' ? 'ข้อกำหนดการให้บริการ' : 'Terms of Service'}</span>
        </div>
      </div>

    </footer>
  );
};

