import React from 'react';
import { MessageCircle, Heart, X } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

interface LineQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LineQrModal: React.FC<LineQrModalProps> = ({ isOpen, onClose }) => {
  const { content } = useCms();
  const { language } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FBF8F3] max-w-md w-full rounded-3xl border-2 border-[#C5A059] p-6 sm:p-8 shadow-2xl relative text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#63222D]/20 flex items-center justify-center text-[#63222D] hover:bg-[#F4ECE1] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Monogram */}
        <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C5A059] flex items-center justify-center mx-auto mb-3 text-[#63222D] font-didone text-xl font-bold shadow-xs">
          {content.brand.monogram}
        </div>

        <div className="editorial-furniture text-[#C5A059] text-xs">
          {language === 'th' ? 'ติดต่อเรา' : "LET'S CONNECT!"}
        </div>
        <h3 className="font-didone text-2xl sm:text-3xl font-bold text-[#63222D] uppercase mt-1">
          {language === 'th' ? 'สแกน QR Code' : 'Scan QR Code'}
        </h3>
        <p className="text-xs text-[#1E1718]/70 mt-1 font-didone italic">
          {language === 'th' ? `แอด ${content.brand.salonName} บน LINE เพื่อรับสิทธิ์โปรโมชั่นเดือน${content.hero.headlineMonth} ส่วนลด ${content.hero.discountPercent} และการยืนยันคิวด่วน` : `Add ${content.brand.salonName} on LINE to claim your ${content.hero.headlineMonth} ${content.hero.discountPercent} Opening Discount & priority scheduling.`}
        </p>

        {/* QR Code Container */}
        <div className="my-6 p-4 rounded-2xl bg-white border-2 border-[#C5A059]/50 shadow-md inline-block">
          <div className="w-48 h-48 sm:w-52 sm:h-52 relative flex items-center justify-center bg-white p-2">
            {content.brand.qrCodeImage ? (
              <img
                src={content.brand.qrCodeImage}
                alt={`LINE QR code for ${content.brand.salonName}`}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Top-Left Finder */}
                <rect x="5" y="5" width="28" height="28" fill="#1C1514" rx="2" />
                <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" rx="1" />
                <rect x="13" y="13" width="12" height="12" fill="#1C1514" rx="1" />

              {/* Top-Right Finder */}
                <rect x="67" y="5" width="28" height="28" fill="#1C1514" rx="2" />
                <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" rx="1" />
                <rect x="75" y="13" width="12" height="12" fill="#1C1514" rx="1" />

              {/* Bottom-Left Finder */}
                <rect x="5" y="67" width="28" height="28" fill="#1C1514" rx="2" />
                <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" rx="1" />
                <rect x="13" y="75" width="12" height="12" fill="#1C1514" rx="1" />

              {/* QR Pattern Data */}
                <rect x="38" y="10" width="5" height="5" fill="#1C1514" />
              <rect x="48" y="10" width="5" height="5" fill="#1C1514" />
              <rect x="58" y="10" width="5" height="5" fill="#1C1514" />
              <rect x="38" y="20" width="5" height="5" fill="#1C1514" />
              <rect x="50" y="20" width="8" height="5" fill="#1C1514" />
              <rect x="38" y="30" width="5" height="5" fill="#1C1514" />
              <rect x="48" y="30" width="5" height="5" fill="#1C1514" />

              <rect x="10" y="38" width="5" height="5" fill="#1C1514" />
              <rect x="20" y="38" width="5" height="5" fill="#1C1514" />
              <rect x="30" y="38" width="5" height="5" fill="#1C1514" />
              <rect x="70" y="38" width="5" height="5" fill="#1C1514" />
              <rect x="80" y="38" width="5" height="5" fill="#1C1514" />

              <rect x="10" y="48" width="5" height="5" fill="#1C1514" />
              <rect x="20" y="48" width="5" height="5" fill="#1C1514" />
              <rect x="70" y="48" width="5" height="5" fill="#1C1514" />
              <rect x="85" y="48" width="5" height="5" fill="#1C1514" />

              <rect x="38" y="65" width="5" height="5" fill="#1C1514" />
              <rect x="48" y="65" width="5" height="5" fill="#1C1514" />
              <rect x="58" y="65" width="5" height="5" fill="#1C1514" />
              <rect x="70" y="65" width="5" height="5" fill="#1C1514" />
              <rect x="85" y="65" width="5" height="5" fill="#1C1514" />

              {/* Center LINE Badge Emblem */}
                <rect x="36" y="36" width="28" height="28" fill="#06C755" rx="6" />
                <text x="50" y="54" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                  LINE
                </text>
              </svg>
            )}
          </div>
          <div className="font-mono text-sm font-bold text-[#06C755] mt-2">
            LINE ID: {content.brand.lineId}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-[#63222D] font-medium mb-5">
          <Heart className="w-4 h-4 text-[#8B3A4A] fill-current" />
          <span>{language === 'th' ? 'เราพร้อมมอบบริการที่ดีที่สุดให้คุณ!' : "We can't wait to welcome you!"}</span>
        </div>

        <div className="flex gap-2">
          <a
            href="https://line.me"
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 bg-[#06C755] text-white editorial-furniture text-xs hover:bg-[#05963E] transition-colors rounded-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{language === 'th' ? 'เปิดแอปพลิเคชัน LINE' : 'OPEN LINE APP DIRECTLY'}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
