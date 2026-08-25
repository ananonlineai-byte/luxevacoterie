import React, { useState } from 'react';
import { ShieldCheck, Flame, Lock, CheckCircle, Activity, Check } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

export const SterilizationChamberStage: React.FC = () => {
  const { content } = useCms();
  const { language, t } = useLanguage();
  const steps = content.sterilization.steps;
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const safeIndex = Math.min(activeStepIndex, Math.max(0, steps.length - 1));
  const currentStep = steps[safeIndex] || {
    step: '01',
    title: 'Hospital Sterilization',
    subtitle: 'Safe standards',
    description: 'Sterilization active',
    iconName: 'Shield',
    standards: 'ISO 13485 Standards',
    temperature: content.sterilization.chamberTemp,
    pressure: content.sterilization.chamberPressure,
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Sparkles':
        return <Flame className="w-5 h-5" />;
      case 'Lock':
        return <Lock className="w-5 h-5" />;
      case 'CheckCircle':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <ShieldCheck className="w-5 h-5" />;
    }
  };

  return (
    <section id="sterilization" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#1C1514] text-[#FBF8F3] relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#63222D]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#2D1F21] text-[#EBDCB9] editorial-furniture text-[10px] sm:text-xs mb-4">
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>{language === 'th' ? 'มาตรฐานความสะอาดและการฆ่าเชื้อระดับเครื่องมือแพทย์' : 'HOSPITAL-GRADE PROTOCOLS & STERILIZATION'}</span>
          </div>

          <h2 className="font-didone text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF8F3] uppercase mb-4">
            {language === 'th' ? 'ห้องอบฆ่าเชื้อมาตรฐานโรงพยาบาล' : content.sterilization.mainTitle}
          </h2>

          <div className="p-4 rounded-xl border border-[#C5A059]/30 bg-[#2D1F21]/80 max-w-2xl mx-auto mt-4 shadow-lg">
            <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider text-[#EBDCB9] uppercase">
              {language === 'th' ? 'ความปลอดภัยของคุณคือสิ่งที่เราไม่ยอมประนีประนอม' : content.sterilization.quoteText}
            </p>
            <p className="font-didone italic text-sm text-[#FBF8F3]/80 mt-1">
              &ldquo;{language === 'th' ? 'อุปกรณ์ทุกชิ้นผ่านการล้างด้วยคลื่นเสียงความถี่สูง อบสุญญากาศ 134°C และบรรจุในซองซีลปลอดเชื้อแบบใช้ครั้งเดียวต่อหนึ่งท่าน' : content.sterilization.subtitle}&rdquo;
            </p>
          </div>
        </div>

        {/* Interactive Decontamination Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Step Selector Buttons (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const isSelected = safeIndex === idx;
              return (
                <button
                  key={step.step || idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#2D1F21] border-[#C5A059] shadow-xl translate-x-2'
                      : 'bg-[#1C1514]/60 border-white/10 hover:border-[#C5A059]/40 hover:bg-[#2D1F21]/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-cinzel font-bold text-sm transition-colors ${
                        isSelected
                          ? 'bg-[#C5A059] text-[#1C1514]'
                          : 'bg-white/10 text-[#EBDCB9] group-hover:bg-[#C5A059]/20'
                      }`}
                    >
                      {step.step}
                    </div>
                    <div>
                      <div className="font-cinzel text-xs sm:text-sm font-bold tracking-wide text-[#FBF8F3]">
                        {step.title}
                      </div>
                      <div className="text-[11px] text-[#EBDCB9]/70 mt-0.5">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className={`p-2 rounded-lg ${isSelected ? 'text-[#C5A059]' : 'text-white/30'}`}>
                    {renderIcon(step.iconName)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive Autoclave Chamber Visual Display (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border-2 border-[#C5A059]/50 bg-gradient-to-br from-[#2D1F21] to-[#1C1514] p-6 sm:p-9 shadow-2xl overflow-hidden">
              
              {/* Top Medical Status Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-xs text-emerald-400 font-bold tracking-wider">
                    {language === 'th' ? 'สถานะห้องปลอดเชื้อ: ทำงานปกติ (ACTIVE STERILE)' : 'CHAMBER STATUS: ACTIVE STERILE'}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[#EBDCB9]">
                  <Activity className="w-4 h-4 text-[#C5A059]" />
                  <span>{language === 'th' ? 'รอบที่' : 'CYCLE'} {currentStep.step} / {String(steps.length).padStart(2, '0')}</span>
                </div>
              </div>

              {/* Chamber Instrument Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                
                {/* Visual Chamber Gauges */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-[#C5A059]/30">
                    <div className="text-[10px] font-mono text-[#EBDCB9] uppercase tracking-wider">
                      {language === 'th' ? 'อุณหภูมิความร้อน (THERMAL INTENSITY)' : 'THERMAL INTENSITY'}
                    </div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-400 mt-1">
                      {currentStep.temperature || content.sterilization.chamberTemp}
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-400 to-rose-500 h-full w-[94%]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-[#C5A059]/30">
                    <div className="text-[10px] font-mono text-[#EBDCB9] uppercase tracking-wider">
                      {language === 'th' ? 'แรงดันสุญญากาศ (PRESSURE & CAVITATION)' : 'CHAMBER PRESSURE & CAVITATION'}
                    </div>
                    <div className="font-mono text-xl sm:text-2xl font-bold text-sky-400 mt-1">
                      {currentStep.pressure || content.sterilization.chamberPressure}
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-sky-400 to-emerald-400 h-full w-[88%]" />
                    </div>
                  </div>
                </div>

                {/* Step Detailed Overview */}
                <div className="p-5 rounded-2xl bg-[#63222D]/40 border border-[#C5A059]/40 flex flex-col justify-between h-full">
                  <div>
                    <div className="editorial-furniture text-[#EBDCB9] text-[9.5px]">
                      {language === 'th' ? 'มาตรฐานทางการแพทย์ (HOSPITAL SPECIFICATION)' : 'HOSPITAL STANDARD SPECIFICATION'}
                    </div>
                    <h3 className="font-didone text-xl font-bold text-[#FBF8F3] mt-1">
                      {currentStep.title}
                    </h3>
                    <p className="text-xs text-[#FBF8F3]/80 leading-relaxed mt-2.5">
                      {currentStep.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-mono text-[10px] text-emerald-300">
                      {currentStep.standards}
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Guarantee Banner */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#EBDCB9]/80">
                <span>✦ {language === 'th' ? 'พิมพ์รายงานค่า Autoclave บันทึกทุกรอบการอบ' : 'Autoclave printouts logged after every cycle'}</span>
                <span>✦ {language === 'th' ? 'ไม่นำเครื่องมือกลับมาใช้ซ้ำโดยไม่ผ่านการอบฆ่าเชื้อ 100%' : 'Zero tool reuse without full hospital autoclave pass'}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
