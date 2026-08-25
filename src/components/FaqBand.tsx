import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

export const FaqBand: React.FC = () => {
  const { content } = useCms();
  const { language, t } = useLanguage();
  const faqConfig = content.faq;
  const faqItems = Array.isArray(faqConfig) ? faqConfig : (faqConfig?.items || []);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.id || null);

  const defaultTitle = language === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Answered Questions';
  const defaultSubtitle = language === 'th' ? 'ข้อมูลบริการและมาตรฐานความปลอดภัย' : 'CONCIERGE INQUIRIES & ASSURANCE';

  const title = (!Array.isArray(faqConfig) && faqConfig?.title) || defaultTitle;
  const subtitle = (!Array.isArray(faqConfig) && faqConfig?.subtitle) || defaultSubtitle;

  const toggleFaq = (id: string) => {
    setOpenFaqId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF6F0] relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="editorial-furniture text-[#C5A059] flex items-center justify-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#C5A059]" />
            {subtitle}
          </span>
          <h2 className="font-didone text-3xl sm:text-4xl font-bold text-[#63222D] uppercase">
            {title}
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className="bg-[#FBF8F3] rounded-2xl border border-[#C5A059]/30 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F4ECE1]/40 transition-colors"
                >
                  <span className="font-didone text-base sm:text-lg font-bold text-[#63222D]">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[#63222D] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#63222D] text-[#EBDCB9]' : 'bg-white'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#1E1718]/80 leading-relaxed font-didone italic border-t border-[#C5A059]/20 pt-4 bg-[#FAF6F0]/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

