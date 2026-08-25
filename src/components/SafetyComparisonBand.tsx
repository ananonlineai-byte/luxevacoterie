import React from 'react';
import { ShieldCheck, XCircle, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

export const SafetyComparisonBand: React.FC = () => {
  const { content } = useCms();
  const { language, t } = useLanguage();
  
  const comparisonConfig = content.safetyComparison;
  const comparisons = Array.isArray(comparisonConfig)
    ? comparisonConfig
    : (comparisonConfig?.items || []);

  const defaultTitle = language === 'th' 
    ? 'ทำไม LUXEVA COTERIE จึงสร้างมาตรฐานใหม่' 
    : `Why ${content.brand?.salonName || 'LUXEVA COTERIE'} Sets The Benchmark`;
    
  const defaultSubtitle = language === 'th'
    ? 'สุขภาพและความสบายใจของคุณคือสิ่งที่เราไม่ยอมประนีประนอม นี่คือตารางเปรียบเทียบมาตรฐานความสะอาดของเรากับร้านทั่วไป'
    : 'Your wellness and peace of mind are non-negotiable. Here is how we ensure uncompromising purity.';

  const title = (!Array.isArray(comparisonConfig) && comparisonConfig?.title) || defaultTitle;
  const subtitle = (!Array.isArray(comparisonConfig) && comparisonConfig?.subtitle) || defaultSubtitle;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FBF8F3] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="editorial-furniture text-[#C5A059] flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            {language === 'th' ? 'มาตรฐานการดูแลระดับ LUXEVA' : 'THE COTERIE STANDARD OF CARE'}
          </span>
          <h2 className="font-didone text-3xl sm:text-4xl font-bold text-[#63222D] uppercase">
            {title}
          </h2>
          <p className="font-didone italic text-sm text-[#1E1718]/70 mt-2">
            {subtitle}
          </p>
        </div>

        {/* Comparison Table Plate */}
        <div className="bg-[#FAF6F0] rounded-3xl border border-[#C5A059]/40 overflow-hidden shadow-lg">
          
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#63222D] text-[#FBF8F3] p-4 sm:p-6 font-cinzel text-xs font-bold tracking-wider uppercase">
            <div className="md:col-span-4">{language === 'th' ? 'เกณฑ์ด้านสุขอนามัยและความปลอดภัย' : 'HYGIENE & SAFETY CRITERIA'}</div>
            <div className="md:col-span-4 text-rose-200/80 hidden md:block">{language === 'th' ? 'ร้านทำเล็บทั่วไป' : 'TRADITIONAL NAIL SALONS'}</div>
            <div className="md:col-span-4 text-[#EBDCB9] hidden md:block">{language === 'th' ? 'มาตรฐาน LUXEVA COTERIE' : `${(content.brand?.salonName || 'LUXEVA COTERIE').toUpperCase()} SANCTUARY`}</div>
          </div>

          <div className="divide-y divide-[#C5A059]/20">
            {comparisons.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-6 items-center gap-3 text-xs">
                
                <div className="md:col-span-4 font-cinzel font-bold text-[#63222D]">
                  {item.feature}
                </div>

                <div className="md:col-span-4 flex items-start gap-2 text-rose-900/80 bg-rose-50/50 p-2.5 rounded-lg border border-rose-200/40">
                  <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span>{item.standard}</span>
                </div>

                <div className="md:col-span-4 flex items-start gap-2 text-[#63222D] font-medium bg-[#FBF8F3] p-2.5 rounded-lg border border-[#C5A059]/40 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item.luxeva}</span>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

