import React from 'react';
import { Calendar, Sparkles, Heart, ArrowDown } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroPinnedStageProps {
  progress: number;
  onOpenBooking: () => void;
  onOpenLineQr: () => void;
}

export const HeroPinnedStage: React.FC<HeroPinnedStageProps> = ({
  progress,
  onOpenBooking,
  onOpenLineQr,
}) => {
  const { content } = useCms();
  const { language, t } = useLanguage();

  // Parallax transform calculations
  const p = Math.min(1, Math.max(0, progress));
  const scale = 1.0 + p * 0.08;
  const translateY = p * -12;
  const contentOpacity = Math.max(0, 1 - p * 1.6);
  const promoScale = 1 + Math.sin(p * Math.PI) * 0.05;

  // Extract number and text from discountPercent e.g. "30% OFF" -> 30, "%", "OFF"
  const discountStr = content.hero.discountPercent || '30% OFF';
  const match = discountStr.match(/(\d+)(.*)/);
  const numPart = match ? match[1] : '30';
  const restPart = match ? match[2].trim() : '% OFF';

  return (
    <section
      id="hero"
      className="relative w-full h-[280svh] bg-[#FBF8F3]"
      style={{ willChange: 'transform' }}
    >
      {/* Sticky Inner Viewport */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden flex flex-col justify-between p-4 sm:p-8 md:p-12 select-none">
        
        {/* Parallax Background Spa & Silk Texture with Soft Vignette */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img
            src={content.hero.heroBgImage}
            alt="Luxury Korean Spa Atmosphere"
            className="w-full h-full object-cover transition-transform will-change-transform opacity-30"
            style={{
              transform: `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}%)`,
              transformOrigin: 'center center',
            }}
            loading="eager"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Ambient Radial Mask */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#FBF8F3]/60 to-[#FBF8F3]" />
        </div>

        {/* Ambient Watermark Background Monogram */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
          <span className="font-didone text-[28vw] font-light tracking-[0.2em] uppercase text-[#C5A059]/[0.04] translate-y-[-5%]">
            {content.brand.salonName.split(' ')[0] || 'LUXEVA'}
          </span>
        </div>

        {/* Top Furniture Anchor */}
        <div className="relative z-10 w-full flex items-center justify-between border-b border-[#63222D]/10 pb-3">
          <div className="editorial-furniture text-[#63222D] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            {language === 'th' ? 'เปิดจองคิวพิเศษฉลองสาขาใหม่' : 'GRAND OPENING RESERVATIONS'}
          </div>
          <div className="editorial-furniture text-[#63222D]/70 hidden sm:block">
            {language === 'th' ? 'สปาดูแลเล็บสไตล์เกาหลีระดับพรีเมียม' : 'AUTHENTIC KOREAN SPA SANCTUARY'}
          </div>
          <div className="editorial-furniture text-[#63222D]">
            {language === 'th' 
              ? `รับจำกัดเดือน ${content.hero.headlineMonth}` 
              : `LIMITED ${content.hero.headlineMonth} ALLOCATIONS`}
          </div>
        </div>

        {/* Centerpiece Hero Composition */}
        <div
          className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4"
          style={{
            opacity: contentOpacity,
            transform: `scale(${promoScale})`,
          }}
        >
          {/* Script Calligraphy Tagline: "Elevate your Elegance" */}
          <div className="mb-2 sm:mb-3">
            <span className="script-accent text-3xl sm:text-5xl md:text-6xl text-[#63222D] font-normal tracking-wide drop-shadow-xs">
              {language === 'th' ? (content.hero.eyebrow || t.hero.eyebrow) : (content.hero.eyebrow || t.hero.eyebrow)}
            </span>
          </div>

          {/* Sub-headline: BOOK YOUR APPOINTMENT IN */}
          <div className="editorial-furniture text-[#1E1718] text-xs sm:text-sm md:text-base tracking-[0.24em] sm:tracking-[0.3em] font-semibold uppercase mb-1 sm:mb-2">
            {language === 'th' ? t.hero.headlinePrefix : content.hero.headlinePrefix}
          </div>

          {/* Monumental Month Title: AUGUST / สิงหาคม */}
          <h1 className="font-didone text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#63222D] uppercase leading-none select-none">
            {language === 'th' && content.hero.headlineMonth === 'AUGUST' ? 'สิงหาคม' : content.hero.headlineMonth}
          </h1>

          {/* Subtitle: TO RECEIVE / รับสิทธิ์พิเศษ */}
          <div className="editorial-furniture text-[#63222D]/80 text-xs sm:text-sm tracking-[0.28em] font-semibold uppercase my-2">
            {language === 'th' ? 'รับสิทธิพิเศษทันที' : 'TO RECEIVE'}
          </div>

          {/* The Heroic 30% OFF Display with circular "WHEN WE OPEN!" Badge */}
          <div className="relative inline-flex items-center justify-center my-1 sm:my-2">
            
            {/* Sparkle Left */}
            <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-[#C5A059] animate-bounce mr-2 hidden sm:inline" />

            {/* Discount Giant Typography */}
            <div className="font-didone text-7xl sm:text-9xl md:text-[11rem] font-black text-[#63222D] tracking-tighter leading-none flex items-baseline">
              <span>{numPart}</span>
              <div className="flex flex-col text-left ml-1 sm:ml-2">
                <span className="font-didone text-4xl sm:text-6xl md:text-7xl font-bold leading-none text-[#C5A059]">
                  %
                </span>
                <span className="font-cinzel text-xl sm:text-3xl md:text-4xl font-bold tracking-widest text-[#63222D] leading-none">
                  {language === 'th' ? 'ลดทันที' : (restPart.replace('%', '').trim() || 'OFF')}
                </span>
              </div>
            </div>

            {/* Sparkle Right */}
            <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-[#C5A059] animate-bounce ml-2 hidden sm:inline" />

            {/* Circular Floating Badge: "WHEN WE OPEN!" */}
            <div className="absolute -top-4 -right-12 sm:-top-6 sm:-right-20 md:-top-8 md:-right-24 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#8B3A4A] text-[#FBF8F3] p-2 flex flex-col items-center justify-center shadow-lg border-2 border-[#EBDCB9] transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <span className="text-[7px] sm:text-[9px] font-cinzel tracking-widest text-[#EBDCB9] uppercase">
                {language === 'th' ? 'ฉลองเปิดร้าน' : 'EXCLUSIVE'}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs md:text-sm font-bold tracking-wider uppercase text-center leading-tight">
                {language === 'th' ? 'สาขาใหม่!' : content.hero.badgeText}
              </span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#EBDCB9] fill-current mt-0.5" />
            </div>

          </div>

          {/* Under-title: OUR SERVICES */}
          <div className="editorial-furniture text-[#1E1718] text-xs sm:text-sm tracking-[0.35em] font-semibold uppercase mt-3">
            {language === 'th' ? '4 บริการซิกเนเจอร์' : 'OUR SIGNATURE SERVICES'}
          </div>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-6 sm:mt-8">
            <button
              onClick={onOpenBooking}
              className="editorial-furniture px-6 sm:px-8 py-3 bg-[#63222D] text-[#FBF8F3] hover:bg-[#46161F] hover:shadow-lg transition-all rounded-sm flex items-center gap-2 cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-[#EBDCB9] group-hover:scale-110 transition-transform" />
              <span>{language === 'th' ? `จองคิวรับส่วนลด ${content.hero.discountPercent}` : `CLAIM ${content.hero.discountPercent} DISCOUNT`}</span>
            </button>
            <button
              onClick={onOpenLineQr}
              className="editorial-furniture px-5 sm:px-7 py-3 border border-[#63222D]/30 bg-white/80 hover:bg-[#FAF6F0] text-[#63222D] transition-all rounded-sm flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{language === 'th' ? `ติดต่อทาง LINE (${content.brand.lineId})` : `CONNECT VIA LINE`}</span>
            </button>
          </div>

        </div>

        {/* Base Bar with Scroll Invitation */}
        <div className="relative z-10 w-full flex items-center justify-between border-t border-[#63222D]/10 pt-3">
          <div className="editorial-furniture text-[#63222D]/70 text-[9px] sm:text-[10px]">
            {language === 'th' ? 'ปลอดภัย · ออร์แกนิก · ฆ่าเชื้อระดับเครื่องมือแพทย์' : 'SAFE · ORGANIC · HOSPITAL-GRADE STERILIZED'}
          </div>

          {/* Animated Scroll Down Indicator */}
          <a
            href="#services"
            className="flex items-center gap-2 text-[#63222D] hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <span className="editorial-furniture text-[9px] sm:text-[10px]">
              {language === 'th' ? 'ดูบริการทั้งหมด' : 'EXPLORE SERVICES'}
            </span>
            <div className="w-4 h-4 rounded-full border border-[#63222D]/30 flex items-center justify-center animate-bounce">
              <ArrowDown className="w-2.5 h-2.5" />
            </div>
          </a>

          <div className="editorial-furniture text-[#63222D]/70 text-[9px] sm:text-[10px] hidden sm:block">
            SEOUL &amp; BANGKOK
          </div>
        </div>

      </div>
    </section>
  );
};

