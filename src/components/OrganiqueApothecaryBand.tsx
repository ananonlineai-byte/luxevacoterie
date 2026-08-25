import React, { useState } from 'react';
import { Shield, Leaf, Award, Globe, CheckCircle2, Sparkles, PackageCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { useLanguage } from '../context/LanguageContext';

export const OrganiqueApothecaryBand: React.FC = () => {
  const { content } = useCms();
  const { language, t } = useLanguage();
  const products = content.organique.products;
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || 'org-1');

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <section id="organique" className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FBF8F3] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Matching the Flyer */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="flex justify-center mb-3">
            <span className="editorial-furniture text-[#C5A059] flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5" />
              {language === 'th' ? t.organique.sectionTag : 'AUTHENTIC KOREAN BOTANICAL PURITY'}
            </span>
          </div>

          <h2 className="font-didone text-3xl sm:text-5xl font-bold text-[#63222D] tracking-tight uppercase mb-2">
            {language === 'th' ? 'ผลิตภัณฑ์ออร์แกนิกสูตรธรรมชาติ' : content.organique.title}
          </h2>
          <p className="font-cinzel text-xs sm:text-sm text-[#C5A059] tracking-[0.2em] uppercase font-semibold">
            {language === 'th' ? 'ปลอดภัย ออร์แกนิก นำเข้าแท้ 100% จากเกาหลี' : content.organique.subtitle}
          </p>
        </div>

        {/* The 3 Core Bullet Pillars from the Flyer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
          <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#63222D] text-[#EBDCB9] flex items-center justify-center flex-shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="font-cinzel text-sm font-bold text-[#63222D]">
                {language === 'th' ? 'ผลิตภัณฑ์ออร์แกนิกแท้' : 'Certified Organic Products'}
              </div>
              <div className="text-xs text-[#1E1718]/70 mt-0.5">
                {language === 'th' ? 'ผ่านการรับรองจาก Ecocert & อย. เกาหลี' : 'Ecocert & Korean FDA approved formulas'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#63222D] text-[#EBDCB9] flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-cinzel text-sm font-bold text-[#63222D]">
                {language === 'th' ? 'มาตรฐานความปลอดภัยเข้มงวด' : 'Rigorous Safety Standards'}
              </div>
              <div className="text-xs text-[#1E1718]/70 mt-0.5">
                {language === 'th' ? 'ไร้สารเคมีอันตราย 10-Free อ่อนโยนต่อผิว' : 'Non-toxic, 10-Free & Hypoallergenic'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#63222D] text-[#EBDCB9] flex items-center justify-center flex-shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-cinzel text-sm font-bold text-[#63222D]">
                {language === 'th' ? 'บรรจุภัณฑ์ปลอดเชื้อ' : 'Hospital-Grade Sterilization'}
              </div>
              <div className="text-xs text-[#1E1718]/70 mt-0.5">
                {language === 'th' ? 'บรรจุขวดสูญญากาศปิดผนึกปลอดเชื้อ' : 'Sterile-process hermetic bottling'}
              </div>
            </div>
          </div>
        </div>

        {/* Product Showcase Plate */}
        {selectedProduct && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF6F0] rounded-3xl border border-[#C5A059]/40 p-6 sm:p-10 shadow-lg">
            
            {/* Left: Product List (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="editorial-furniture text-[#63222D] text-[10px] mb-3">
                {language === 'th' ? 'เลือกผลิตภัณฑ์เพื่อดูรายละเอียด' : 'SELECT FORMULA TO INSPECT'}
              </div>

              {products.map((prod) => {
                const isSelected = selectedProduct.id === prod.id;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProductId(prod.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FBF8F3] border-[#63222D] shadow-md translate-x-2'
                        : 'bg-white/50 border-[#C5A059]/20 hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-didone text-base font-bold text-[#63222D]">
                        {prod.name}
                      </div>
                      <div className="text-[11px] text-[#C5A059] font-medium mt-0.5">
                        {prod.koreanName}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#1E1718]/60 bg-[#F4ECE1] px-2 py-1 rounded-sm">
                      {prod.volume}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Active Product Detail & Sterile Badge (7 cols) */}
            <div className="lg:col-span-7 bg-[#FBF8F3] rounded-2xl border border-[#C5A059]/30 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                
                {/* Product Visual */}
                <div className="relative w-44 h-56 rounded-2xl overflow-hidden border-2 border-[#C5A059]/40 bg-[#F4ECE1] flex-shrink-0 shadow-md">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // High-res luxury botanical fallback if image fails to load
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1608248597359-5982845642d9?auto=format&fit=crop&w=600&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#63222D]/90 backdrop-blur-xs text-[#EBDCB9] text-[8px] font-cinzel font-bold text-center py-1 rounded-xs">
                    {language === 'th' ? 'บรรจุภัณฑ์ปิดผนึกปลอดเชื้อ' : 'STERILE-PROCESS PACKAGED'}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 text-left">
                  <div className="editorial-furniture text-[#C5A059] text-[9.5px]">
                    {selectedProduct.type}
                  </div>
                  <h3 className="font-didone text-2xl font-bold text-[#63222D] mt-0.5">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-[#1E1718]/80 mt-2 font-didone italic leading-relaxed">
                    {selectedProduct.benefits}
                  </p>

                  {/* Key Ingredients */}
                  <div className="mt-4">
                    <div className="editorial-furniture text-[#63222D] text-[9px] mb-1.5">
                      {language === 'th' ? 'สารสกัดจากพฤกษศาสตร์ธรรมชาติ' : 'BOTANICAL ACTIVE EXTRACTS'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-[#FAF6F0] border border-[#C5A059]/30 text-[#1E1718] px-2 py-0.5 rounded-full"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex flex-wrap gap-2">
                    {selectedProduct.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-cinzel font-bold text-[#63222D] flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                        {cert}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* 4 Circular Trust Badges from the flyer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto text-center">
          
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex flex-col items-center justify-center shadow-xs">
            <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] bg-[#FBF8F3] flex items-center justify-center text-[#63222D] mb-2 shadow-xs">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="editorial-furniture text-[#63222D] text-[10px]">
              {language === 'th' ? 'ปลอดภัยสูงสุด' : 'SAFE'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex flex-col items-center justify-center shadow-xs">
            <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] bg-[#FBF8F3] flex items-center justify-center text-[#63222D] mb-2 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="editorial-furniture text-[#63222D] text-[10px]">
              {language === 'th' ? 'ออร์แกนิกแท้' : 'ORGANIC'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex flex-col items-center justify-center shadow-xs">
            <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] bg-[#FBF8F3] flex items-center justify-center text-[#63222D] mb-2 shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <span className="editorial-furniture text-[#63222D] text-[10px]">
              {language === 'th' ? 'เกรดพรีเมียม' : 'PREMIUM QUALITY'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#C5A059]/30 flex flex-col items-center justify-center shadow-xs">
            <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] bg-[#FBF8F3] flex items-center justify-center text-[#63222D] mb-2 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <span className="editorial-furniture text-[#63222D] text-[10px]">
              {language === 'th' ? 'นำเข้าจากเกาหลี' : 'MADE IN KOREA'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

