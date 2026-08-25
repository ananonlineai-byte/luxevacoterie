import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

export const PledgeTopBand: React.FC = () => {
  const { content } = useCms();
  const { language, t } = useLanguage();

  return (
    <section id="pledge" className="pt-28 sm:pt-32 pb-6 px-4 sm:px-8 bg-[#FBF8F3]">
      <div className="max-w-6xl mx-auto">
        {/* Top Header Plate matching the flyer structure */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-[#C5A059]/40 bg-[#FAF6F0] p-4 sm:p-7 md:p-9 shadow-sm overflow-hidden">
          
          {/* Subtle Golden Inner Border Accent */}
          <div className="absolute inset-1.5 sm:inset-2.5 rounded-xl sm:rounded-2xl border border-[#C5A059]/20 pointer-events-none" />

          {/* Top Pill: QUALITY AND SAFETY PLEDGE */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="bg-[#D9C4A6]/40 border border-[#C5A059]/40 px-5 sm:px-8 py-1.5 rounded-full shadow-xs">
              <span className="editorial-furniture text-[#63222D] text-[11px] sm:text-xs font-semibold tracking-[0.24em] flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#63222D]" />
                {language === 'th' ? 'พันธสัญญาแห่งคุณภาพและความสะอาดปลอดภัย' : (content.pledge.title || 'QUALITY AND SAFETY PLEDGE')}
              </span>
            </div>
          </div>

          {/* 3 Columns: Korea Import Badge | Center Monogram | Sterilization Chamber */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center text-center">
            
            {/* Left: Authentic Korea Import Badge */}
            <div className="flex items-center justify-center md:justify-start gap-4 p-2">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#C5A059]/50 bg-white p-2 flex items-center justify-center shadow-xs flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xs">
                  <circle cx="50" cy="50" r="45" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
                  <path d="M 50 15 A 35 35 0 0 1 50 85 A 17.5 17.5 0 0 0 50 50 A 17.5 17.5 0 0 1 50 15 Z" fill="#C62828" />
                  <path d="M 50 85 A 35 35 0 0 1 15 50 A 17.5 17.5 0 0 0 50 50 A 17.5 17.5 0 0 1 50 85 Z" fill="#1565C0" />
                  <rect x="12" y="38" width="6" height="24" rx="1" fill="#111827" />
                  <rect x="22" y="38" width="6" height="24" rx="1" fill="#111827" />
                  <rect x="72" y="38" width="6" height="24" rx="1" fill="#111827" />
                  <rect x="82" y="38" width="6" height="24" rx="1" fill="#111827" />
                </svg>
                <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              </div>

              <div className="text-left">
                <div className="font-cinzel text-xs sm:text-sm font-bold text-[#63222D] tracking-wide leading-tight">
                  {language === 'th' ? 'นำเข้าแท้ 100%\nจากประเทศเกาหลีใต้' : (content.brand.originText.split('FROM').join('FROM\n') || 'AUTHENTICALLY\nIMPORTED FROM KOREA')}
                </div>
                <div className="text-[10px] text-[#63222D]/70 font-medium tracking-wider mt-1 uppercase">
                  {language === 'th' ? 'ผ่านมาตรฐานความปลอดภัยระดับสากล' : 'GLOBAL SAFE STANDARDS COMPLIANT'}
                </div>
              </div>
            </div>

            {/* Center: Brand Monogram & Crest */}
            <div className="flex flex-col items-center justify-center">
              <div className="font-didone text-4xl sm:text-5xl font-light text-[#C5A059] tracking-tight leading-none mb-1 select-none">
                {content.brand.monogram || 'LC'}
              </div>
              <h2 className="font-didone text-2xl sm:text-3xl font-semibold tracking-[0.14em] text-[#63222D] uppercase leading-none">
                {content.brand.salonName.split(' ')[0] || 'LUXEVA'}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-[1px] bg-[#C5A059]" />
                <span className="editorial-furniture text-[10px] tracking-[0.35em] text-[#C5A059]">
                  {content.brand.salonName.split(' ').slice(1).join(' ') || 'COTERIE'}
                </span>
                <div className="w-6 h-[1px] bg-[#C5A059]" />
              </div>
            </div>

            {/* Right: Sterilization Chamber Medical Badge */}
            <div className="flex items-center justify-center md:justify-end gap-4 p-2">
              <div className="text-right hidden md:block">
                <div className="font-cinzel text-xs sm:text-sm font-bold text-[#63222D] tracking-wide leading-tight">
                  {language === 'th' ? 'ห้องปลอดเชื้อ\nมาตรฐานเครื่องมือแพทย์' : <>STERILIZATION<br />CHAMBER</>}
                </div>
                <div className="text-[10px] text-[#63222D]/70 font-medium tracking-wider mt-1 uppercase">
                  {language === 'th' ? 'ฆ่าเชื้อด้วยระบบสุญญากาศ CLASS-B' : <>THOROUGH STERILIZATION PRIORITY<br />HOSPITAL-GRADE PROTOCOLS</>}
                </div>
              </div>

              {/* Autoclave Medical Chamber Icon Box */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#C5A059]/50 bg-white p-2 flex items-center justify-center shadow-xs flex-shrink-0">
                <div className="w-full h-full border border-[#D9C4A6] rounded-xl bg-[#F8F4EE] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-8 h-8 rounded-full border-2 border-[#63222D] flex items-center justify-center bg-white shadow-inner">
                    <ShieldCheck className="w-4 h-4 text-[#63222D]" />
                  </div>
                  <span className="text-[7px] font-mono font-bold text-[#63222D] mt-0.5 tracking-tighter">
                    {content.sterilization.chamberTemp} / {content.sterilization.chamberPressure}
                  </span>
                  <div className="absolute top-1.5 right-1.5 flex flex-col gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-[#C5A059]" />
                  </div>
                </div>
              </div>

              <div className="text-left md:hidden">
                <div className="font-cinzel text-xs font-bold text-[#63222D] tracking-wide">
                  {language === 'th' ? 'ห้องปลอดเชื้อมาตรฐานแพทย์' : 'STERILIZATION CHAMBER'}
                </div>
                <div className="text-[9.5px] text-[#63222D]/70 font-medium uppercase">
                  {language === 'th' ? 'มาตรฐานสุญญากาศ CLASS-B' : 'HOSPITAL-GRADE PROTOCOLS'}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

