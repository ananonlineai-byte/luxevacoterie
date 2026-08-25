import {
  ServiceCategory,
  OrganiqueProduct,
  SterilizationStep,
  FaqItem,
  SiteContent,
  AppointmentBooking,
} from './types';

// Curated high-aesthetic spa, botanical, manicure, pedicure, and Korean beauty imagery
export const IMAGES = {
  // Hero & Brand Plates
  heroBg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85',
  heroMultiply: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1920&q=85',
  koreanFlag: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
  autoclaveMedical: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=85',
  
  // The 4 Core Signature Arched Services (Matching flyer)
  manicuresArch: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85',
  pedicuresArch: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=1200&q=85',
  handSpasArch: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=85',
  footSpasArch: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',

  // Safe Organic Imported Products ("The Organique" line)
  organiqueBottles: 'https://images.unsplash.com/photo-1608248597359-5982845642d9?auto=format&fit=crop&w=1200&q=85',
  organiqueSerum: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85',
  botanicalBloom: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=85',
  
  // Sterilization
  sterileTools: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85',
  sterilePouch: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1000&q=85',
  koreanSpaInterior: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
};

// 4 Signature Services matching the flyer's arches
export const SERVICES: ServiceCategory[] = [
  {
    id: 'manicures',
    category: 'manicure',
    name: 'MANICURES',
    subtitle: 'Signature Korean Gel & Russian Cuticle Architecture',
    description: 'Precision E-file cuticle preparation followed by organic Korean gel overlays, structured nail reinforcement, and nourishing botanical cuticle therapy.',
    duration: '60 — 75 MIN',
    originalPrice: 1500,
    discountedPrice: 1050, // 30% OFF
    image: IMAGES.manicuresArch,
    iconName: 'Sparkles',
    koreanEssence: 'Seoul Botanical Nail Fortification & High-Gloss Syrup Glaze',
    highlights: [
      'Hospital-grade sterilized E-file diamond bits',
      'Non-toxic, 10-Free Korean organic gel formula',
      'Cuticle nourishing camellia oil soak',
      'Ultrasonic hand hydration finishing mist',
    ],
    steps: [
      'Gentle mineral soak & sanitization',
      'Micro-precision Russian cuticle detailing',
      'Nail plate balancing & Korean keratin bonding',
      'Artisan color application / Syrup glass layer',
      'Warm herbal towel & gold-fused cuticle elixir',
    ],
  },
  {
    id: 'pedicures',
    category: 'pedicure',
    name: 'PEDICURES',
    subtitle: 'Aromatic Petal Foot Cleansing & Silk Heel Rejuvenation',
    description: 'A sensory foot care ritual designed to restore suppleness. Features organic sea salt exfoliation, warm lavender steam, callus smoothing, and precision toe nail styling.',
    duration: '75 — 90 MIN',
    originalPrice: 1800,
    discountedPrice: 1260, // 30% OFF
    image: IMAGES.pedicuresArch,
    iconName: 'Heart',
    koreanEssence: 'Jeju Volcanic Ash Softening & Lotus Flower Moisture Seal',
    highlights: [
      'Single-use sterile pedicure liner & files',
      'Organic volcanic pumice heel polishing',
      'Aromatic warm herbal compress wrap',
      'Long-lasting breathable organic enamel',
    ],
    steps: [
      'Botanical floral foot bath with Himalayan pink salt',
      'Delicate cuticle shaping and nail care',
      'Fruit-acid enzyme callus softening mask',
      'Deep heel exfoliation & silk cream buff',
      'Pressure-point reflexology & nourishing glaze',
    ],
  },
  {
    id: 'hand-spas',
    category: 'hand-spa',
    name: 'HAND SPAS',
    subtitle: 'Botanical Water Immersion & Deep Collagen Hydrotherapy',
    description: 'An indulgent multi-stage hand revival. Hands are immersed in warm floral-infused waters, massaged with warm organic botanical balms, and enveloped in deep collagen gloves.',
    duration: '60 MIN',
    originalPrice: 1600,
    discountedPrice: 1120, // 30% OFF
    image: IMAGES.handSpasArch,
    iconName: 'Droplets',
    koreanEssence: 'Korean Ginseng & Fermented Rice Water Brightening',
    highlights: [
      'Floating fresh rose petal & chamomile immersion bowl',
      '24K gold leaf & organic seed oil scrub',
      'Heated herbal mitts for thermal infusion',
      'Acupressure forearm & palm tension release',
    ],
    steps: [
      'Sensory floral immersion with warm essential oils',
      'Micro-crystal botanical peeling polish',
      'Hydrating Korean serum ampoule massage',
      'Thermal herbal mask & heated mitt therapy',
      'Protective barrier cream with SPF & silk finish',
    ],
  },
  {
    id: 'foot-spas',
    category: 'foot-spa',
    name: 'FOOT SPAS',
    subtitle: 'Volcanic River Stone Bath & Mineral Reflexology Ritual',
    description: 'The ultimate sanctuary for tired legs and feet. Heated basalt river stones, organic milky floral bath, detoxifying eucalyptus scrub, and an intensive tension-melting reflexology massage.',
    duration: '90 MIN',
    originalPrice: 2200,
    discountedPrice: 1540, // 30% OFF
    image: IMAGES.footSpasArch,
    iconName: 'Compass',
    koreanEssence: 'Organic Mugwort (Ssuk) Detox & Thermal Basalt Grounding',
    highlights: [
      'Handcrafted Hinoki cypress basin with smooth river stones',
      'Organic Korean fermented herbal milk soak',
      'Hot stone meridian massage from calf to toes',
      'Cooling mint & arnica deep muscle balm',
    ],
    steps: [
      'Warm botanical foot bath with smooth stones',
      'Exfoliating bamboo & sea kelp scrub',
      'Warm basalt river stone reflexology massage',
      'Deep moisture paraffin / herbal mud bootie wrap',
      'Refreshing herbal tonic & tension release stretch',
    ],
  },
];

// "The Organique" Korean Imported Products
export const ORGANIQUE_PRODUCTS: OrganiqueProduct[] = [
  {
    id: 'cuticle-elixir',
    name: 'Botanical Cuticle Elixir',
    koreanName: '유기농 보태니컬 큐티클 엘릭서',
    type: 'Nourishing Oil',
    volume: '30ml / 1.0 FL OZ',
    ingredients: ['Jeju Camellia Seed', 'Jojoba Golden Wax', 'Cold-Pressed Rosehip', 'Vitamin E Acetate'],
    benefits: 'Instantly calms dry eponychium, promotes natural keratin growth, and prevents hangnails.',
    certifications: ['Ecocert Organic', 'Korean FDA Approved', 'Cruelty Free'],
    image: 'https://images.unsplash.com/photo-1608248597359-5982845642d9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'hand-emulsion',
    name: 'Rose Damascena Hand Milk',
    koreanName: '다마스크 로즈 하이드레이팅 핸드 밀크',
    type: 'Barrier Emulsion',
    volume: '200ml / 6.7 FL OZ',
    ingredients: ['Bulgarian Rose Water', 'Shea Butter Nilotica', 'Fermented Galactomyces', 'Niacinamide'],
    benefits: 'Deep multi-layer cellular hydration without greasy residue. Restores skin radiance.',
    certifications: ['Ecocert Organic', 'ISO 22716 GMP', 'Hypoallergenic'],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'foot-balm',
    name: 'Mugwort & Sea Salt Foot Scrub',
    koreanName: '강화 쑥 & 사해 미네랄 풋 สครับ',
    type: 'Thermal Scrub',
    volume: '180g / 6.3 OZ',
    ingredients: ['Ganghwa Mugwort', 'Dead Sea Mineral Salts', 'Tea Tree Oil', 'Centella Asiatica'],
    benefits: 'Gently dislodges hardened skin cells while providing antimicrobial protection.',
    certifications: ['Certified Organic', '100% Vegan', 'Dermatologist Tested'],
    image: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'brightening-serum',
    name: 'Rice Ferment Brightening Ampoule',
    koreanName: '발효 쌀겨 브라이트닝 앰플',
    type: 'Intensive Serum',
    volume: '50ml / 1.7 FL OZ',
    ingredients: ['Korean Rice Bran Extract', 'Hyaluronic Acid 8D', 'Pearl Protein', 'Licorice Root'],
    benefits: 'Evens skin tone, reduces sunspots on the dorsal hand, and leaves a silky glass finish.',
    certifications: ['Clean Beauty Korea', 'Organic Certified', 'Sterile-Packaged'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
  },
];

// Hospital-Grade Sterilization Protocols
export const STERILIZATION_STEPS: SterilizationStep[] = [
  {
    step: '01',
    title: 'ENZYMATIC DECONTAMINATION',
    subtitle: 'Ultrasonic Submersion Cleanse',
    temperature: '45°C Bath',
    pressure: '40 kHz Cavitation',
    description: 'All stainless steel instruments are immersed in medical-grade multi-enzyme solutions to dislodge microscopic residue before entering sterilization.',
    standards: 'ISO 15883 / EN 285 Hospital Benchmark',
    iconName: 'Shield',
  },
  {
    step: '02',
    title: 'CLASS-B VACUUM AUTOCLAVE',
    subtitle: 'Thermal Saturated Steam Chamber',
    temperature: '134°C (273.2°F)',
    pressure: '2.1 Bar High-Pressure',
    description: 'Our sterilization chamber utilizes high-pressure pulsed steam to eradicate 99.999% of bacteria, fungal spores, and viral pathogens.',
    standards: 'Medical Device Directive 93/42/EEC',
    iconName: 'Sparkles',
  },
  {
    step: '03',
    title: 'SEALED STERILIZATION POUCHES',
    subtitle: 'Internal Chemical Indicators',
    temperature: 'Sealed Ambient',
    pressure: 'Hermetic Seal',
    description: 'Every set of tools is hermetically sealed into color-changing indicator pouches, verifying that sterile hospital standards were achieved.',
    standards: 'EN 868-5 Compliant Pouches',
    iconName: 'Lock',
  },
  {
    step: '04',
    title: 'SINGLE-USE DISPOSABLES',
    subtitle: 'Opened Exclusively In Front Of You',
    temperature: 'Fresh Sealed',
    pressure: '100% Single Client',
    description: 'Nail files, buffer blocks, wooden sticks, and basin liners are 100% single-use, opened right before your eyes and never reused.',
    standards: 'Zero Cross-Contamination Protocol',
    iconName: 'CheckCircle',
  },
];

// Safety comparison
export const SAFETY_COMPARISONS = [
  {
    feature: 'Sterilization Standard',
    standard: 'Alcohol soak / UV box (kills ~80% bacteria only)',
    luxeva: 'Class-B Medical Autoclave 134°C + 2.1 Bar (99.999% sterile)',
  },
  {
    feature: 'Instrument Packaging',
    standard: 'Stored loose in drawers / reused immediately',
    luxeva: 'Hermetically sealed in indicator pouches opened in front of you',
  },
  {
    feature: 'Buffing & File Implements',
    standard: 'Shared between multiple walk-in clients',
    luxeva: '100% Single-use, disposable files, buffers & basin liners',
  },
  {
    feature: 'Gel & Botanical Formulations',
    standard: 'Generic synthetic gels with harsh MMA / Toluene',
    luxeva: 'Authentic 10-Free Korean Organic Gels & "The Organique" line',
  },
  {
    feature: 'Pedicure & Spa Basins',
    standard: 'Piped whirlpool jets harboring biofilm bacteria',
    luxeva: 'Pipeless Hinoki wood & stone basins with medical-grade disinfection',
  },
];

// FAQ items
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'booking',
    question: 'How do I claim the 30% OFF August Grand Opening discount?',
    answer: 'Simply reserve your appointment slot online through our booking system or message us on LINE (@luxevacoterie) during August. The 30% discount will be automatically applied to all services and packages during your visit.',
  },
  {
    id: 'faq-2',
    category: 'safety',
    question: 'What is your Hospital-Grade Sterilization Protocol?',
    answer: 'We adhere to medical hospital hygiene standards. All metal implements undergo a 4-step decontamination process inside our medical-grade Class-B Autoclave Chamber (134°C at 2.1 bar) and are sealed in sterile single-client indicator pouches, opened only in your presence.',
  },
  {
    id: 'faq-3',
    category: 'organic',
    question: 'Are all products genuinely imported from South Korea?',
    answer: 'Yes. Every bottle of "The Organique" skincare, Korean gel color, botanical essence, and nourishing cuticle oil is directly imported from certified laboratories in Seoul and Jeju Island, complying with both Korean FDA and global safety standards.',
  },
  {
    id: 'faq-4',
    category: 'services',
    question: 'Can I combine multiple services in a single visit?',
    answer: 'Absolutely. Many of our guests enjoy our Signature Coterie Duets, such as pairing the Korean Gel Manicure with a Warm Petal Foot Spa, or a Full Russian Pedicure with Deep Collagen Hand Hydrotherapy.',
  },
  {
    id: 'faq-5',
    category: 'safety',
    question: 'Are your nail gels safe for pregnant or sensitive clients?',
    answer: 'Yes. Our Korean imported gels and spa formulas are 10-Free (free from formaldehyde, toluene, DBP, camphor, and harsh resins), low-odor, organic-certified, and suitable for expectant mothers and sensitive skin.',
  },
];

// Default site content object for CMS initialized state
export const DEFAULT_SITE_CONTENT: SiteContent = {
  brand: {
    salonName: 'LUXEVA COTERIE',
    monogram: 'LC',
    tagline: 'LUXURY KOREAN NAIL & BOTANICAL SPA SANCTUARY',
    originText: 'AUTHENTICALLY IMPORTED FROM KOREA',
    phone: '+66 (0) 2-890-LUXE',
    lineId: '@luxevacoterie',
    lineUrl: 'https://line.me',
    address: 'Gaysorn Village / Sukhumvit Luxury Arcade, Bangkok',
    openingHours: 'Daily: 10:00 AM — 08:30 PM',
  },
  hero: {
    eyebrow: 'Elevate your Elegance',
    headlinePrefix: 'BOOK YOUR APPOINTMENT IN',
    headlineMonth: 'AUGUST',
    discountPercent: '30% OFF',
    badgeText: 'WHEN WE OPEN!',
    subtitle: 'Experience Seoul\'s finest botanical nail architecture, hospital-grade sterile purity, and bespoke hand & foot hydrotherapy rituals.',
    heroBgImage: IMAGES.heroBg,
  },
  pledge: {
    title: 'YOUR SAFETY IS OUR PRIORITY',
    badge: 'HOSPITAL-GRADE STERILIZATION CHAMBER',
    autoclaveBanner: 'CLASS-B VACUUM AUTOCLAVE 134°C / 2.1 BAR — 99.999% PATHOGEN ERADICATION',
  },
  services: SERVICES,
  sterilization: {
    mainTitle: 'HOSPITAL-GRADE STERILIZATION CHAMBER',
    subtitle: 'YOUR SAFETY IS OUR PRIORITY. We never compromise on quality. You deserve only the best.',
    quoteText: 'Hospital-grade autoclaves operate at 134°C under 2.1 bar saturated steam pressure, eradicating 99.999% of all bacterial, viral, and fungal microbes.',
    chamberTemp: '134°C',
    chamberPressure: '2.1 BAR',
    reductionRate: '99.999%',
    chamberImage: IMAGES.sterileTools,
    steps: STERILIZATION_STEPS,
  },
  organique: {
    title: 'THE ORGANIQUE APOTHECARY',
    subtitle: 'Safe. Organic. Authentically Imported from Seoul, South Korea.',
    guaranteeBadges: ['SAFE', 'ORGANIC', 'PREMIUM QUALITY', 'MADE IN KOREA'],
    products: ORGANIQUE_PRODUCTS,
    showcaseImage: IMAGES.organiqueBottles,
  },
  safetyComparison: {
    title: 'Why Luxeva Coterie Sets The Benchmark',
    subtitle: 'Your wellness and peace of mind are non-negotiable. Here is how we ensure uncompromising purity.',
    items: SAFETY_COMPARISONS,
  },
  faq: {
    title: 'Frequently Answered Questions',
    subtitle: 'Concierge inquiries, sterilization assurance, and booking guidance.',
    items: FAQ_ITEMS,
  },
};

export const INITIAL_BOOKINGS: AppointmentBooking[] = [
  {
    id: 'bk-101',
    clientName: 'Khun Primrose V.',
    phone: '081-987-6543',
    lineId: '@primrose_v',
    date: '2026-08-25',
    time: '14:00',
    selectedServices: [SERVICES[0], SERVICES[2]],
    totalOriginal: 3100,
    totalDiscounted: 2170,
    notes: 'VIP Client. Prefers soft nude syrup gel color and warm chamomile tea.',
    status: 'confirmed',
    createdAt: '2026-08-24T10:15:00.000Z',
  },
  {
    id: 'bk-102',
    clientName: 'Khun Katherine S.',
    phone: '089-123-4567',
    lineId: 'kat.s_bkk',
    date: '2026-08-26',
    time: '16:30',
    selectedServices: [SERVICES[1], SERVICES[3]],
    totalOriginal: 4000,
    totalDiscounted: 2800,
    notes: 'First time visitor. Sensitive cuticles, please prepare gentle organic scrub.',
    status: 'pending',
    createdAt: '2026-08-24T11:45:00.000Z',
  },
];
