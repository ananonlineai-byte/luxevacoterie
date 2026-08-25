import React, { useState } from 'react';
import { Sparkles, Heart, Droplets, Compass, Clock, ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';
import { ServiceCategory } from '../types';

interface ServicesArchwaysStageProps {
  onSelectService: (service: ServiceCategory) => void;
  onOpenBooking: () => void;
}

export const ServicesArchwaysStage: React.FC<ServicesArchwaysStageProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  const { content } = useCms();
  const { language, t } = useLanguage();
  const [activeModalService, setActiveModalService] = useState<ServiceCategory | null>(null);

  // Icon mapper
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C5A059]" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#C5A059]" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-[#C5A059]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#C5A059]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#C5A059]" />;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute top-10 right-10 font-didone text-[14vw] font-light text-[#C5A059]/[0.03] select-none pointer-events-none">
        RITUALS
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="flex justify-center mb-3">
            <span className="editorial-furniture text-[#C5A059] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'th' ? t.services.sectionTag : 'THE SIGNATURE SANCTUARIES'}
            </span>
          </div>
          <h2 className="font-didone text-3xl sm:text-5xl font-bold text-[#63222D] tracking-tight uppercase mb-4">
            {language === 'th' ? '4 ศาสตร์การดูแลเล็บและสปาสไตล์โซลระดับไฮเอนด์' : 'Curated Korean Nail & Spa Rituals'}
          </h2>
          <p className="font-didone italic text-sm sm:text-base text-[#1E1718]/70 max-w-2xl mx-auto leading-relaxed">
            {language === 'th'
              ? 'รังสรรค์ด้วยสารสกัดออร์แกนิกบริสุทธิ์นำเข้าจากเกาหลี ฆ่าเชื้อเครื่องมือตามมาตรฐานโรงพยาบาล และศิลปะการปรนนิบัติมือและเท้าอย่างประณีต'
              : 'Crafted with certified organic Korean botanicals, hospital-grade sterilization protocols, and artisan care for the hands and feet.'}
          </p>
        </div>

        {/* The Signature Arches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {content.services.map((service, index) => {
            return (
              <div
                key={service.id}
                className="group relative flex flex-col bg-[#FBF8F3] rounded-t-full rounded-b-2xl border border-[#C5A059]/30 p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                data-rev
                style={{ '--d': `${index * 120}ms` } as React.CSSProperties}
              >
                {/* Arched Photo Frame */}
                <div className="relative w-full aspect-[4/5] rounded-t-full overflow-hidden border border-[#C5A059]/20 bg-[#F4ECE1] shadow-inner mb-4">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#63222D]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="w-full py-2 bg-[#FBF8F3] text-[#63222D] editorial-furniture text-[10px] rounded-xs shadow-md hover:bg-[#EBDCB9] transition-colors cursor-pointer"
                    >
                      {language === 'th' ? 'ดูรายละเอียดบริการ' : 'VIEW RITUAL DETAILS'}
                    </button>
                  </div>

                  {/* Discount Pill on image corner */}
                  <div className="absolute top-4 right-4 bg-[#63222D] text-[#EBDCB9] text-[9px] font-cinzel font-bold px-2.5 py-1 rounded-full shadow-md border border-[#EBDCB9]/40">
                    {content.hero.discountPercent || '30% OFF'}
                  </div>
                </div>

                {/* Arched Emblem Icon Badge */}
                <div className="flex justify-center -mt-8 mb-2 relative z-10">
                  <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] bg-[#FBF8F3] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:border-[#63222D] transition-all">
                    {renderIcon(service.iconName)}
                  </div>
                </div>

                {/* Title & Korean Subtitle */}
                <div className="text-center px-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-didone text-xl sm:text-2xl font-bold tracking-wide text-[#63222D] uppercase mt-1">
                      {service.name}
                    </h3>
                    <p className="text-[11px] text-[#1E1718]/70 font-medium tracking-wide mt-1 line-clamp-2">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Pricing Bar */}
                  <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-[#1E1718]/60">
                      <Clock className="w-3 h-3 text-[#C5A059]" />
                      <span>{service.duration}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-[#1E1718]/40 line-through mr-1.5 font-medium">
                        ฿{service.originalPrice.toLocaleString()}
                      </span>
                      <span className="font-didone text-base sm:text-lg font-bold text-[#63222D]">
                        ฿{service.discountedPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="editorial-furniture text-[9px] py-2 border border-[#C5A059]/40 hover:bg-[#F4ECE1] text-[#63222D] transition-colors rounded-xs cursor-pointer"
                    >
                      {language === 'th' ? 'ดูขั้นตอน' : 'EXPLORE'}
                    </button>
                    <button
                      onClick={() => {
                        onSelectService(service);
                        onOpenBooking();
                      }}
                      className="editorial-furniture text-[9px] py-2 bg-[#63222D] text-[#FBF8F3] hover:bg-[#46161F] transition-colors rounded-xs cursor-pointer"
                    >
                      {language === 'th' ? 'เลือกจอง' : 'SELECT'}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBF8F3] max-w-2xl w-full rounded-2xl border border-[#C5A059] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Close button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#63222D]/20 flex items-center justify-center text-[#63222D] hover:bg-[#F4ECE1] transition-colors text-lg cursor-pointer"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#F4ECE1] border border-[#C5A059] flex items-center justify-center">
                {renderIcon(activeModalService.iconName)}
              </div>
              <div>
                <span className="editorial-furniture text-[#C5A059] text-[9.5px]">
                  {language === 'th' ? 'ศาสตร์สปาและทำเล็บเกาหลี' : 'KOREAN LUXURY RITUAL'}
                </span>
                <h3 className="font-didone text-2xl sm:text-3xl font-bold text-[#63222D] uppercase">
                  {activeModalService.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-[#1E1718]/80 leading-relaxed my-3 font-didone italic">
              {activeModalService.description}
            </p>

            {/* Korean Essence Highlight */}
            {activeModalService.koreanEssence && (
              <div className="p-3.5 bg-[#FAF6F0] rounded-xl border border-[#C5A059]/30 my-4 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="editorial-furniture text-[#63222D] text-[9.5px]">
                    {language === 'th' ? 'สารสกัดเอกลักษณ์เฉพาะจากโซล' : 'KOREAN ESSENCE & FORMULATION'}
                  </div>
                  <div className="text-xs text-[#1E1718]/90 font-medium mt-0.5">
                    {activeModalService.koreanEssence}
                  </div>
                </div>
              </div>
            )}

            {/* Ritual Steps */}
            {activeModalService.steps && activeModalService.steps.length > 0 && (
              <div className="my-4">
                <div className="editorial-furniture text-[#63222D] text-[10px] mb-2.5">
                  {language === 'th' ? 'ขั้นตอนการทำและปรนนิบัติ' : 'PROCEDURE STEPS'}
                </div>
                <div className="space-y-2">
                  {activeModalService.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#1E1718]/85">
                      <span className="w-5 h-5 rounded-full bg-[#63222D] text-[#EBDCB9] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing & CTA */}
            <div className="mt-6 pt-4 border-t border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#1E1718]/60">
                  {language === 'th' ? 'ระยะเวลา: ' : 'Duration: '}
                  <span className="font-semibold text-[#1E1718]">{activeModalService.duration}</span>
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-xs text-[#1E1718]/40 line-through">
                    ฿{activeModalService.originalPrice.toLocaleString()}
                  </span>
                  <span className="font-didone text-2xl font-bold text-[#63222D]">
                    ฿{activeModalService.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-cinzel font-bold text-[#C5A059] bg-[#63222D] px-2 py-0.5 rounded-full">
                    {content.hero.discountPercent} PROMO
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectService(activeModalService);
                  setActiveModalService(null);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#63222D] text-[#FBF8F3] editorial-furniture hover:bg-[#46161F] transition-colors rounded-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{language === 'th' ? `จองคิวพร้อมรับส่วนลด ${content.hero.discountPercent}` : `RESERVE WITH ${content.hero.discountPercent} OFF`}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#EBDCB9]" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

