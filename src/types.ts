export interface ServiceCategory {
  id: string;
  name: string;
  category: 'manicure' | 'pedicure' | 'hand-spa' | 'foot-spa' | string;
  subtitle: string;
  description: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number; // 30% off
  image: string;
  iconName: string;
  highlights: string[];
  steps: string[];
  koreanEssence: string;
}

export interface OrganiqueProduct {
  id: string;
  name: string;
  koreanName: string;
  type: string;
  volume: string;
  ingredients: string[];
  benefits: string;
  certifications: string[];
  image: string;
}

export interface SterilizationStep {
  step: string;
  title: string;
  subtitle: string;
  temperature?: string;
  pressure?: string;
  description: string;
  standards: string;
  iconName: string;
}

export interface SafetyComparisonItem {
  feature: string;
  standard: string;
  luxeva: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'safety' | 'services' | 'booking' | 'organic' | string;
}

export interface SiteBrandConfig {
  salonName: string;
  monogram: string;
  tagline: string;
  originText: string;
  phone: string;
  lineId: string;
  lineUrl: string;
  address: string;
  openingHours: string;
  qrCodeImage?: string;
}

export interface SiteHeroConfig {
  eyebrow: string;
  headlinePrefix: string;
  headlineMonth: string;
  discountPercent: string;
  badgeText: string;
  subtitle: string;
  heroBgImage: string;
}

export interface SitePledgeConfig {
  title: string;
  badge: string;
  autoclaveBanner: string;
}

export interface SiteSterilizationConfig {
  mainTitle: string;
  subtitle: string;
  quoteText: string;
  chamberTemp: string;
  chamberPressure: string;
  reductionRate: string;
  chamberImage: string;
  steps: SterilizationStep[];
}

export interface SiteOrganiqueConfig {
  title: string;
  subtitle: string;
  guaranteeBadges: string[];
  products: OrganiqueProduct[];
  showcaseImage: string;
}

export interface SiteSafetyComparisonConfig {
  title: string;
  subtitle: string;
  items: SafetyComparisonItem[];
}

export interface SiteFaqConfig {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface SiteContent {
  brand: SiteBrandConfig;
  hero: SiteHeroConfig;
  pledge: SitePledgeConfig;
  services: ServiceCategory[];
  sterilization: SiteSterilizationConfig;
  organique: SiteOrganiqueConfig;
  safetyComparison: SiteSafetyComparisonConfig;
  faq: SiteFaqConfig;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

export interface FirebaseConnectionStatus {
  isConnected: boolean;
  projectId: string | null;
  lastSyncedAt: string | null;
  error: string | null;
}

export interface AppointmentBooking {
  id?: string;
  clientName: string;
  phone: string;
  lineId: string;
  date: string;
  time: string;
  selectedServices: ServiceCategory[];
  totalOriginal: number;
  totalDiscounted: number;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: string;
}
