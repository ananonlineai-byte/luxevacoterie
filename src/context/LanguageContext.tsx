import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'th' | 'en';

export interface Translations {
  nav: {
    safetyPledge: string;
    services: string;
    sterilization: string;
    organique: string;
    faq: string;
    adminCms: string;
    lineChat: string;
    bookMonth: string;
    bookDiscount: string;
    navigationSanctuary: string;
    reserveAppointment: string;
    openAdmin: string;
    hours: string;
    phone: string;
  };
  hero: {
    eyebrow: string;
    headlinePrefix: string;
    headlineMonth: string;
    discountPercent: string;
    badgeText: string;
    subtitle: string;
    bookNowBtn: string;
    exploreServicesBtn: string;
    koreanHeritageBadge: string;
    sterilityBadge: string;
  };
  pledge: {
    title: string;
    badge: string;
    autoclaveBanner: string;
    qualityGuarantee: string;
    viewCertificates: string;
  };
  services: {
    sectionTag: string;
    mainTitle: string;
    subtitle: string;
    bookThisService: string;
    viewDetails: string;
    duration: string;
    discountBadge: string;
    includes: string;
    koreanTouch: string;
    allServicesTab: string;
    manicureTab: string;
    pedicureTab: string;
    handSpaTab: string;
    footSpaTab: string;
  };
  sterilization: {
    sectionTag: string;
    mainTitle: string;
    subtitle: string;
    bannerTitle: string;
    bannerSub: string;
    chamberTemp: string;
    chamberPressure: string;
    reductionRate: string;
    standardsTag: string;
    stepsTitle: string;
    step: string;
  };
  organique: {
    sectionTag: string;
    mainTitle: string;
    subtitle: string;
    guaranteeBadges: {
      safe: string;
      organic: string;
      premiumQuality: string;
      madeInKorea: string;
    };
    ingredients: string;
    benefits: string;
    certifications: string;
  };
  safetyComparison: {
    sectionTag: string;
    title: string;
    subtitle: string;
    marketStandard: string;
    luxevaStandard: string;
  };
  faq: {
    sectionTag: string;
    title: string;
    subtitle: string;
    allCategories: string;
    safetyCategory: string;
    servicesCategory: string;
    bookingCategory: string;
    organicCategory: string;
  };
  bookingModal: {
    modalTitle: string;
    modalSubtitle: string;
    step1Services: string;
    step2DateTime: string;
    step3Contact: string;
    step4Review: string;
    selectServicesPrompt: string;
    selectDatePrompt: string;
    selectTimePrompt: string;
    fullName: string;
    phone: string;
    lineId: string;
    specialNotes: string;
    subtotal: string;
    discount: string;
    totalAmount: string;
    confirmBookingBtn: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    closeBtn: string;
  };
  footer: {
    tagline: string;
    addressTitle: string;
    hoursTitle: string;
    contactTitle: string;
    copyright: string;
    adminLink: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  th: {
    nav: {
      safetyPledge: 'พันธสัญญาความปลอดภัย',
      services: 'บริการระดับพรีเมียม',
      sterilization: 'การฆ่าเชื้อระดับแพทย์',
      organique: 'ผลิตภัณฑ์ออร์แกนิก',
      faq: 'คำถามที่พบบ่อย',
      adminCms: 'ระบบหลังบ้าน CMS',
      lineChat: 'ไลน์',
      bookMonth: 'จองคิวเดือนนี้',
      bookDiscount: 'ลด 30%',
      navigationSanctuary: 'เมนูนำทาง LUXEVA',
      reserveAppointment: 'จองเวลานัดหมายล่วงหน้า',
      openAdmin: 'เปิดระบบจัดการหลังบ้าน (CMS)',
      hours: 'ทุกวัน: 10:00 - 20:30 น.',
      phone: '02-890-LUXE',
    },
    hero: {
      eyebrow: 'ยกระดับความหรูหราและความสง่างาม',
      headlinePrefix: 'เปิดจองคิวโปรโมชันพิเศษเดือน',
      headlineMonth: 'สิงหาคม',
      discountPercent: 'ลดทันที 30%',
      badgeText: 'ฉลองเปิดสาขาใหม่!',
      subtitle: 'สัมผัสสถาปัตยกรรมการดูแลเล็บสไตล์โซล ความสะอาดบริสุทธิ์ระดับโรงพยาบาล และศาสตร์วารีบำบัดสปามือเท้าสูตรออร์แกนิกนำเข้าจากเกาหลี',
      bookNowBtn: 'จองคิวรับส่วนลด 30%',
      exploreServicesBtn: 'ดู 4 บริการซิกเนเจอร์',
      koreanHeritageBadge: 'นำเข้าจากเกาหลีแท้ 100%',
      sterilityBadge: 'มาตรฐานฆ่าเชื้อ Class-B Autoclave',
    },
    pledge: {
      title: 'ความปลอดภัยของคุณคือหัวใจสำคัญสูงสุดของเรา',
      badge: 'ห้องฆ่าเชื้อมาตรฐานเครื่องมือแพทย์ (HOSPITAL-GRADE)',
      autoclaveBanner: 'อบฆ่าเชื้อด้วยระบบสุญญากาศ CLASS-B AUTOCLAVE 134°C / 2.1 BAR — กำจัดเชื้อโรค 99.999%',
      qualityGuarantee: 'เรารับประกันความสะอาดบริสุทธิ์และความปลอดภัยสูงสุดในทุกขั้นตอน',
      viewCertificates: 'ดูมาตรฐานการรับรอง',
    },
    services: {
      sectionTag: '4 บริการสถาปัตยกรรมความงามซิกเนเจอร์',
      mainTitle: 'SIGNATURE SERVICES & BESPOKE RITUALS',
      subtitle: 'คัดสรรศาสตร์การทำเล็บและการผ่อนคลายระดับไฮเอนด์ ด้วยเทคนิคจากโซลและผลิตภัณฑ์ออร์แกนิกที่ดีที่สุด',
      bookThisService: 'จองบริการนี้ (ลด 30%)',
      viewDetails: 'ดูรายละเอียดและขั้นตอน',
      duration: 'ระยะเวลา',
      discountBadge: 'ลด 30%',
      includes: 'ไฮไลท์จุดเด่นของบริการ',
      koreanTouch: 'สารสกัดและเอกลักษณ์เฉพาะจากโซล',
      allServicesTab: 'บริการทั้งหมด',
      manicureTab: 'ทำเล็บมือ',
      pedicureTab: 'ทำเล็บเท้า',
      handSpaTab: 'สปามือ',
      footSpaTab: 'สปาเท้า',
    },
    sterilization: {
      sectionTag: 'มาตรฐานความสะอาดระดับสูงสุด',
      mainTitle: 'HOSPITAL-GRADE STERILIZATION CHAMBER',
      subtitle: 'ความปลอดภัยของคุณคือสิ่งที่เราไม่ยอมประนีประนอม คุณสมควรได้รับสิ่งที่ดีและสะอาดที่สุดเท่านั้น',
      bannerTitle: 'กระบวนการฆ่าเชื้อด้วยตู้อบแรงดันไอน้ำสุญญากาศ Class-B',
      bannerSub: 'ความร้อน 134°C ภายใต้แรงดัน 2.1 บาร์ กำจัดเชื้อแบคทีเรีย ไวรัส และสปอร์เชื้อราได้ถึง 99.999%',
      chamberTemp: '134°C',
      chamberPressure: '2.1 BAR',
      reductionRate: '99.999%',
      standardsTag: 'มาตรฐานสากล EN 13060 / ISO 15883',
      stepsTitle: '4 ขั้นตอนความสะอาดบริสุทธิ์',
      step: 'ขั้นตอนที่',
    },
    organique: {
      sectionTag: 'ผลิตภัณฑ์สูตรธรรมชาติ',
      mainTitle: 'THE ORGANIQUE APOTHECARY',
      subtitle: 'ปลอดภัย ออร์แกนิก นำเข้าแท้ 100% จากห้องแล็บชั้นนำในกรุงโซลและเกาะเชจู ประเทศเกาหลีใต้',
      guaranteeBadges: {
        safe: 'ปลอดภัยสูงสุด',
        organic: 'ออร์แกนิกแท้',
        premiumQuality: 'คุณภาพระดับพรีเมียม',
        madeInKorea: 'ผลิตในเกาหลีใต้',
      },
      ingredients: 'ส่วนผสมสำคัญ:',
      benefits: 'คุณประโยชน์:',
      certifications: 'การรับรองมาตรฐาน:',
    },
    safetyComparison: {
      sectionTag: 'ความแตกต่างที่คุณสัมผัสได้',
      title: 'ทำไม LUXEVA COTERIE จึงสร้างมาตรฐานใหม่',
      subtitle: 'สุขภาพและความสบายใจของคุณคือสิ่งสำคัญ นี่คือตารางเปรียบเทียบมาตรฐานความสะอาดของเรากับร้านทั่วไป',
      marketStandard: 'ร้านทำเล็บทั่วไป',
      luxevaStandard: 'มาตรฐาน LUXEVA COTERIE',
    },
    faq: {
      sectionTag: 'ข้อมูลและคำถามที่พบบ่อย',
      title: 'FREQUENTLY ANSWERED QUESTIONS',
      subtitle: 'รวมทุกข้อสงสัยเกี่ยวกับการบริการ การฆ่าเชื้อเครื่องมือ และการจองคิว',
      allCategories: 'ทั้งหมด',
      safetyCategory: 'ความสะอาดและฆ่าเชื้อ',
      servicesCategory: 'บริการและเทคนิค',
      bookingCategory: 'การจองและโปรโมชัน',
      organicCategory: 'ผลิตภัณฑ์ออร์แกนิก',
    },
    bookingModal: {
      modalTitle: 'จองนัดหมายรับบริการ LUXEVA',
      modalSubtitle: 'รับส่วนลดพิเศษ 30% ทันทีสำหรับการจองผ่านช่องทางออนไลน์',
      step1Services: '1. เลือกบริการ',
      step2DateTime: '2. วันและเวลา',
      step3Contact: '3. ข้อมูลติดต่อ',
      step4Review: '4. ยืนยันการจอง',
      selectServicesPrompt: 'กรุณาเลือกบริการที่คุณต้องการ (เลือกได้มากกว่า 1 รายการ):',
      selectDatePrompt: 'เลือกวันที่ต้องการเข้ารับบริการ:',
      selectTimePrompt: 'เลือกรอบเวลาที่สะดวก:',
      fullName: 'ชื่อ-นามสกุลของคุณ',
      phone: 'เบอร์โทรศัพท์ติดต่อ',
      lineId: 'LINE ID (สำหรับรับข้อความยืนยัน)',
      specialNotes: 'คำขอพิเศษ / สิ่งที่ต้องการให้ดูแลเป็นพิเศษ (ถ้ามี)',
      subtotal: 'ราคาปกติรวม',
      discount: 'ส่วนลดพิเศษเปิดสาขาใหม่ (30%)',
      totalAmount: 'ยอดชำระสุทธิที่ร้าน',
      confirmBookingBtn: 'ยืนยันการจองนัดหมาย (ลด 30%)',
      submitting: 'กำลังบันทึกข้อมูล...',
      successTitle: 'บันทึกการจองสำเร็จเรียบร้อยแล้ว!',
      successMessage: 'ทางร้านได้รับข้อมูลการจองของคุณแล้ว และได้บันทึกคิวในระบบเรียบร้อย เจ้าหน้าที่จะติดต่อยืนยันคิวผ่าน LINE อีกครั้งค่ะ',
      closeBtn: 'ปิดหน้าต่าง',
    },
    footer: {
      tagline: 'LUXURY KOREAN NAIL & BOTANICAL SPA SANCTUARY',
      addressTitle: 'ที่ตั้งสาขา',
      hoursTitle: 'เวลาทำการ',
      contactTitle: 'ติดต่อเรา',
      copyright: 'สงวนลิขสิทธิ์ทุกประการ',
      adminLink: 'ระบบจัดการหลังบ้าน (CMS)',
    },
  },
  en: {
    nav: {
      safetyPledge: 'SAFETY PLEDGE',
      services: 'SERVICES',
      sterilization: 'STERILIZATION',
      organique: 'THE ORGANIQUE',
      faq: 'FAQ',
      adminCms: 'ADMIN CMS',
      lineChat: 'LINE',
      bookMonth: 'BOOK IN AUGUST',
      bookDiscount: '30% OFF',
      navigationSanctuary: 'NAVIGATION SANCTUARY',
      reserveAppointment: 'RESERVE APPOINTMENT',
      openAdmin: 'OPEN ADMIN BACKOFFICE (CMS)',
      hours: 'Daily: 10:00 AM — 08:30 PM',
      phone: '+66 (0) 2-890-LUXE',
    },
    hero: {
      eyebrow: 'Elevate your Elegance',
      headlinePrefix: 'BOOK YOUR APPOINTMENT IN',
      headlineMonth: 'AUGUST',
      discountPercent: '30% OFF',
      badgeText: 'WHEN WE OPEN!',
      subtitle: "Experience Seoul's finest botanical nail architecture, hospital-grade sterile purity, and bespoke hand & foot hydrotherapy rituals.",
      bookNowBtn: 'BOOK APPOINTMENT (30% OFF)',
      exploreServicesBtn: 'EXPLORE 4 SIGNATURE SERVICES',
      koreanHeritageBadge: '100% AUTHENTIC KOREA IMPORT',
      sterilityBadge: 'CLASS-B MEDICAL AUTOCLAVE PURITY',
    },
    pledge: {
      title: 'YOUR SAFETY IS OUR PRIORITY',
      badge: 'HOSPITAL-GRADE STERILIZATION CHAMBER',
      autoclaveBanner: 'CLASS-B VACUUM AUTOCLAVE 134°C / 2.1 BAR — 99.999% PATHOGEN ERADICATION',
      qualityGuarantee: 'We never compromise on hygiene and quality. You deserve only the very best.',
      viewCertificates: 'VIEW MEDICAL PROTOCOLS',
    },
    services: {
      sectionTag: '4 SIGNATURE ARCHITECTURAL SERVICES',
      mainTitle: 'SIGNATURE SERVICES & BESPOKE RITUALS',
      subtitle: 'Curated Korean nail artistry, meticulous cuticle precision, and deep restorative organic hydrotherapy.',
      bookThisService: 'Book This Service (30% Off)',
      viewDetails: 'View Ritual Details',
      duration: 'Duration',
      discountBadge: '30% OFF',
      includes: 'Ritual Highlights & Inclusions',
      koreanTouch: 'Seoul Essence & Signature Formula',
      allServicesTab: 'All Services',
      manicureTab: 'Manicures',
      pedicureTab: 'Pedicures',
      handSpaTab: 'Hand Spas',
      footSpaTab: 'Foot Spas',
    },
    sterilization: {
      sectionTag: 'HOSPITAL-GRADE PURITY',
      mainTitle: 'HOSPITAL-GRADE STERILIZATION CHAMBER',
      subtitle: 'YOUR SAFETY IS OUR PRIORITY. We never compromise on quality. You deserve only the best.',
      bannerTitle: 'Class-B Pulsed Vacuum Autoclave Technology',
      bannerSub: '134°C saturated steam under 2.1 bar pressure eliminates 99.999% of all viral, bacterial, and fungal spores.',
      chamberTemp: '134°C',
      chamberPressure: '2.1 BAR',
      reductionRate: '99.999%',
      standardsTag: 'EN 13060 / ISO 15883 Hospital Benchmark',
      stepsTitle: '4-Step Medical Hygiene Protocol',
      step: 'Step',
    },
    organique: {
      sectionTag: 'NATURAL & BOTANICAL APOTHECARY',
      mainTitle: 'THE ORGANIQUE APOTHECARY',
      subtitle: 'Safe. Organic. Authentically Imported from Seoul and Jeju Island, South Korea.',
      guaranteeBadges: {
        safe: 'SAFE & PURE',
        organic: 'CERTIFIED ORGANIC',
        premiumQuality: 'PREMIUM GRADE',
        madeInKorea: 'MADE IN KOREA',
      },
      ingredients: 'Key Ingredients:',
      benefits: 'Skin & Nail Benefits:',
      certifications: 'Certifications:',
    },
    safetyComparison: {
      sectionTag: 'UNCOMPROMISING DISTINCTION',
      title: 'Why Luxeva Coterie Sets The Benchmark',
      subtitle: 'Your wellness and peace of mind are non-negotiable. Here is how we ensure pristine purity.',
      marketStandard: 'Standard Nail Salons',
      luxevaStandard: 'LUXEVA COTERIE Benchmark',
    },
    faq: {
      sectionTag: 'CONCIERGE & CARE INQUIRIES',
      title: 'FREQUENTLY ANSWERED QUESTIONS',
      subtitle: 'Concierge inquiries, medical-grade sterilization assurance, and booking guidance.',
      allCategories: 'All Categories',
      safetyCategory: 'Hygiene & Sterilization',
      servicesCategory: 'Services & Techniques',
      bookingCategory: 'Booking & Promotions',
      organicCategory: 'The Organique Line',
    },
    bookingModal: {
      modalTitle: 'RESERVE YOUR LUXEVA APPOINTMENT',
      modalSubtitle: 'Complimentary 30% Grand Opening privilege automatically applied to all online reservations.',
      step1Services: '1. Select Rituals',
      step2DateTime: '2. Date & Time',
      step3Contact: '3. Contact Details',
      step4Review: '4. Summary & Confirm',
      selectServicesPrompt: 'Select one or more bespoke services for your appointment:',
      selectDatePrompt: 'Select your preferred date:',
      selectTimePrompt: 'Select your preferred time slot:',
      fullName: 'Your Full Name',
      phone: 'Contact Phone Number',
      lineId: 'LINE ID (For instant confirmation)',
      specialNotes: 'Special Requests / Preferences / Allergies (Optional)',
      subtotal: 'Standard Total',
      discount: 'Grand Opening Privilege (30% OFF)',
      totalAmount: 'Total Due at Sanctuary',
      confirmBookingBtn: 'CONFIRM APPOINTMENT (30% OFF)',
      submitting: 'Securing your slot...',
      successTitle: 'APPOINTMENT RESERVED SUCCESSFULLY',
      successMessage: 'Thank you for choosing LUXEVA COTERIE. Your reservation has been secured in our cloud system. Our concierge will reach out via LINE shortly.',
      closeBtn: 'Close Window',
    },
    footer: {
      tagline: 'LUXURY KOREAN NAIL & BOTANICAL SPA SANCTUARY',
      addressTitle: 'SANCTUARY LOCATION',
      hoursTitle: 'OPERATING HOURS',
      contactTitle: 'CONCIERGE CONTACT',
      copyright: 'All Rights Reserved',
      adminLink: 'Admin Backoffice (CMS)',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const STORAGE_KEY_LANG = 'luxeva_lang_pref_v1';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'th' || saved === 'en') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'th'; // Default to Thai for local customer comfort, with instant English switch
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
