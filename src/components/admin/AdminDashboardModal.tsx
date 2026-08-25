import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ImageUploader } from './ImageUploader';
import {
  X,
  Lock,
  Sparkles,
  Save,
  RotateCcw,
  Download,
  Upload,
  Calendar,
  Layers,
  ShieldCheck,
  Package,
  Sliders,
  HelpCircle,
  Phone,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  Eye,
  LogOut,
  ExternalLink,
  MessageCircle,
  Database,
  Cloud,
  RefreshCw,
  Flame,
  Wifi,
  WifiOff,
  Copy,
  Check,
  KeyRound,
  Shield,
} from 'lucide-react';
import { ServiceCategory, OrganiqueProduct, FaqItem, FirebaseConfig } from '../../types';

export const AdminDashboardModal: React.FC = () => {
  const {
    content,
    updateContent,
    resetToDefaults,
    exportContentJson,
    importContentJson,
    bookings,
    updateBookingStatus,
    deleteBooking,
    firebaseConfig,
    firebaseStatus,
    saveFirebaseConfig,
    testFirebase,
    pushAllToFirestore,
    pullAllFromFirestore,
    uploadImage,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    changeAdminPasscode,
    adminTab,
    setAdminTab,
    saveStatus,
  } = useCms();

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [activeEditingServiceId, setActiveEditingServiceId] = useState<string | null>(null);
  const [activeEditingProductId, setActiveEditingProductId] = useState<string | null>(null);
  const [jsonImportText, setJsonImportText] = useState('');
  const [showJsonImport, setShowJsonImport] = useState(false);

  // Change Passcode Form States
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [passcodeChangeFeedback, setPasscodeChangeFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Firebase Form States
  const [fbSnippet, setFbSnippet] = useState('');
  const [fbApiKey, setFbApiKey] = useState(firebaseConfig?.apiKey || '');
  const [fbProjectId, setFbProjectId] = useState(firebaseConfig?.projectId || '');
  const [fbAuthDomain, setFbAuthDomain] = useState(firebaseConfig?.authDomain || '');
  const [fbStorageBucket, setFbStorageBucket] = useState(firebaseConfig?.storageBucket || '');
  const [fbAppId, setFbAppId] = useState(firebaseConfig?.appId || '');
  const [fbTestLoading, setFbTestLoading] = useState(false);
  const [fbFeedback, setFbFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  // Helper to parse pasted Firebase config string or JS object
  const handleParseSnippet = () => {
    if (!fbSnippet.trim()) return;
    try {
      let cleaned = fbSnippet.trim();
      // If user pasted "const firebaseConfig = { ... };"
      if (cleaned.includes('{')) {
        const firstBrace = cleaned.indexOf('{');
        const lastBrace = cleaned.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1) {
          cleaned = cleaned.substring(firstBrace, lastBrace + 1);
        }
      }

      // Replace JS object keys with quotes for JSON parsing if needed
      // Matches unquoted keys like apiKey: "..."
      const jsonStr = cleaned
        .replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":')
        .replace(/,\s*}/g, '}')
        .replace(/'/g, '"');

      let parsed: any;
      try {
        parsed = JSON.parse(jsonStr);
      } catch {
        // Fallback simple regex extraction
        const apiKeyMatch = cleaned.match(/apiKey["']?\s*:\s*["']([^"']+)["']/);
        const projectIdMatch = cleaned.match(/projectId["']?\s*:\s*["']([^"']+)["']/);
        const authDomainMatch = cleaned.match(/authDomain["']?\s*:\s*["']([^"']+)["']/);
        const storageBucketMatch = cleaned.match(/storageBucket["']?\s*:\s*["']([^"']+)["']/);
        const appIdMatch = cleaned.match(/appId["']?\s*:\s*["']([^"']+)["']/);

        parsed = {
          apiKey: apiKeyMatch ? apiKeyMatch[1] : '',
          projectId: projectIdMatch ? projectIdMatch[1] : '',
          authDomain: authDomainMatch ? authDomainMatch[1] : '',
          storageBucket: storageBucketMatch ? storageBucketMatch[1] : '',
          appId: appIdMatch ? appIdMatch[1] : '',
        };
      }

      if (parsed.apiKey) setFbApiKey(parsed.apiKey);
      if (parsed.projectId) setFbProjectId(parsed.projectId);
      if (parsed.authDomain) setFbAuthDomain(parsed.authDomain);
      if (parsed.storageBucket) setFbStorageBucket(parsed.storageBucket);
      if (parsed.appId) setFbAppId(parsed.appId);

      setFbFeedback({
        type: 'info',
        message: 'Firebase configuration parsed! Click "TEST & CONNECT TO FIRESTORE" below to activate.',
      });
    } catch (e: any) {
      setFbFeedback({
        type: 'error',
        message: 'Could not auto-parse snippet. Please fill in Project ID and API Key manually.',
      });
    }
  };

  const handleConnectFirebase = async () => {
    if (!fbApiKey.trim() || !fbProjectId.trim()) {
      setFbFeedback({
        type: 'error',
        message: 'Please provide at least API Key and Project ID.',
      });
      return;
    }

    setFbTestLoading(true);
    setFbFeedback(null);

    const cfg: FirebaseConfig = {
      apiKey: fbApiKey.trim(),
      projectId: fbProjectId.trim(),
      authDomain: fbAuthDomain.trim() || `${fbProjectId.trim()}.firebaseapp.com`,
      storageBucket: fbStorageBucket.trim() || `${fbProjectId.trim()}.appspot.com`,
      messagingSenderId: '',
      appId: fbAppId.trim(),
    };

    const res = await saveFirebaseConfig(cfg);
    setFbTestLoading(false);
    if (res.success) {
      setFbFeedback({ type: 'success', message: res.message });
    } else {
      setFbFeedback({ type: 'error', message: res.message });
    }
  };

  const handleDisconnectFirebase = async () => {
    if (window.confirm('Disconnect Firestore Cloud? The app will return to local storage mode.')) {
      await saveFirebaseConfig(null);
      setFbApiKey('');
      setFbProjectId('');
      setFbAuthDomain('');
      setFbStorageBucket('');
      setFbAppId('');
      setFbSnippet('');
      setFbFeedback({ type: 'info', message: 'Firestore disconnected. Local storage active.' });
    }
  };

  const handlePushCloud = async () => {
    setIsPushing(true);
    const ok = await pushAllToFirestore();
    setIsPushing(false);
    if (ok) {
      setFbFeedback({ type: 'success', message: 'All website text, services, and photos pushed to Firestore Cloud successfully!' });
    } else {
      setFbFeedback({ type: 'error', message: 'Failed to push data to Firestore. Check connection.' });
    }
  };

  const handlePullCloud = async () => {
    setIsPulling(true);
    const ok = await pullAllFromFirestore();
    setIsPulling(false);
    if (ok) {
      setFbFeedback({ type: 'success', message: 'Synced latest data from Firestore Cloud into website!' });
    } else {
      setFbFeedback({ type: 'error', message: 'Could not fetch from Firestore. Ensure documents exist in cloud.' });
    }
  };

  if (!isAdminOpen) return null;

  // If not authenticated, show luxury passcode lock screen
  if (!isAdminAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      const success = loginAdmin(passcode);
      if (!success) {
        setPasscodeError(true);
      } else {
        setPasscodeError(false);
        setPasscode('');
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
        <div className="bg-[#FAF6F0] max-w-md w-full rounded-3xl border-2 border-[#C5A059] p-8 shadow-2xl relative text-center">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#63222D]/20 flex items-center justify-center text-[#63222D] hover:bg-[#F4ECE1] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#63222D] text-[#EBDCB9] border border-[#C5A059] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-6 h-6" />
          </div>

          <div className="editorial-furniture text-[#C5A059] text-xs">
            LUXEVA COTERIE
          </div>
          <h2 className="font-didone text-2xl font-bold text-[#63222D] uppercase mt-1">
            Admin CMS Portal
          </h2>
          <p className="text-xs text-[#1E1718]/70 mt-1 font-didone italic">
            Enter passcode to customize text, photos, services, and view appointment bookings.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setPasscodeError(false);
                }}
                placeholder="Enter passcode"
                className="w-full text-center tracking-widest text-lg font-mono px-4 py-3 bg-white border-2 border-[#C5A059]/50 rounded-xl focus:outline-[#63222D] focus:border-[#63222D]"
                autoFocus
              />
              {passcodeError && (
                <p className="text-rose-600 text-xs mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Incorrect passcode. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#63222D] text-[#EBDCB9] font-cinzel font-bold text-xs tracking-widest uppercase hover:bg-[#7A2A37] transition-colors rounded-xl shadow-md cursor-pointer"
            >
              UNLOCK CONTROL PANEL
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Navigation tabs for the Admin Dashboard
  const tabs = [
    { id: 'hero', label: '1. Hero & Promo (30%)', icon: Sparkles },
    { id: 'services', label: '2. Signature Services', icon: Layers },
    { id: 'sterilization', label: '3. Autoclave Safety', icon: ShieldCheck },
    { id: 'organique', label: '4. The Organique Products', icon: Package },
    { id: 'comparison', label: '5. Safety Table', icon: Sliders },
    { id: 'contact', label: '6. Contact & LINE QR', icon: Phone },
    { id: 'faqs', label: '7. FAQs', icon: HelpCircle },
    { id: 'bookings', label: `8. Bookings CRM (${bookings.length})`, icon: Calendar },
    { id: 'firebase', label: '9. 🔥 Firebase Cloud Sync', icon: Database },
    { id: 'settings', label: '10. Security & Settings', icon: KeyRound },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#FAF6F0] w-full max-w-6xl h-[92vh] rounded-3xl border-2 border-[#C5A059] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Admin Header Bar */}
        <div className="bg-[#63222D] text-[#FBF8F3] p-4 sm:px-6 flex items-center justify-between border-b border-[#C5A059]/40 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FAF6F0] text-[#63222D] border border-[#C5A059] flex items-center justify-center font-didone font-bold text-sm shadow-xs">
              {content.brand.monogram || 'LC'}
            </div>
            <div>
              <div className="font-didone text-base sm:text-lg font-bold tracking-wider text-[#EBDCB9]">
                {content.brand.salonName} — BACKOFFICE CMS
              </div>
              <div className="text-[10px] text-[#EBDCB9]/70 editorial-furniture">
                LIVE CONTENT EDITING &bull; REAL-TIME DATABASE SYNC
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Firebase Live Cloud indicator */}
            <button
              onClick={() => setAdminTab('firebase')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] cursor-pointer transition-colors ${
                firebaseStatus.isConnected
                  ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/80'
                  : 'bg-black/30 border-[#C5A059]/40 text-[#EBDCB9]/80 hover:bg-black/50'
              }`}
            >
              {firebaseStatus.isConnected ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-mono text-[10px] font-bold">Cloud: {firebaseStatus.projectId}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3 h-3 text-[#C5A059]" />
                  <span>Cloud: Local Storage</span>
                </>
              )}
            </button>

            {/* Auto save indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-black/20 rounded-full border border-[#C5A059]/30 text-[11px] text-[#EBDCB9]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{saveStatus === 'saving' ? 'Saving...' : 'Auto-Saved'}</span>
            </div>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-3 py-1.5 bg-[#EBDCB9] text-[#63222D] rounded-lg text-xs font-bold font-cinzel hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>VIEW SITE</span>
            </button>

            <button
              onClick={logoutAdmin}
              title="Logout"
              className="p-1.5 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body with Sidebar + Tab Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-64 bg-[#F4ECE1] border-r border-[#C5A059]/30 p-2 sm:p-3 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1 flex-shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap md:whitespace-normal cursor-pointer ${
                    isActive
                      ? 'bg-[#63222D] text-[#EBDCB9] font-bold shadow-xs'
                      : 'text-[#63222D]/80 hover:bg-[#FAF6F0] hover:text-[#63222D]'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#EBDCB9]' : 'text-[#C5A059]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Scrollable Content Pane */}
          <div className="flex-1 p-4 sm:p-8 overflow-y-auto bg-[#FBF8F3]">
            
            {/* 1. HERO & PROMO TAB */}
            {adminTab === 'hero' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                    Hero Banner &amp; Promotion Settings
                  </h3>
                  <p className="text-xs text-[#1E1718]/70 mt-0.5">
                    Customize the 300svh scroll-pinned presentation, headline, month, and discount percentage.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Script Eyebrow (Cursive)
                    </label>
                    <input
                      type="text"
                      value={content.hero.eyebrow}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, eyebrow: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Headline Prefix
                    </label>
                    <input
                      type="text"
                      value={content.hero.headlinePrefix}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, headlinePrefix: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Promotion Month / Timing
                    </label>
                    <input
                      type="text"
                      value={content.hero.headlineMonth}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, headlineMonth: e.target.value },
                        }))
                      }
                      placeholder="e.g. AUGUST or SEPTEMBER"
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs font-bold text-[#63222D] focus:outline-[#63222D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Discount Percentage Badge
                    </label>
                    <input
                      type="text"
                      value={content.hero.discountPercent}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, discountPercent: e.target.value },
                        }))
                      }
                      placeholder="e.g. 30% OFF"
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs font-bold text-rose-700 focus:outline-[#63222D]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Badge Text (Circular Emblem)
                    </label>
                    <input
                      type="text"
                      value={content.hero.badgeText}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, badgeText: e.target.value },
                        }))
                      }
                      placeholder="e.g. WHEN WE OPEN!"
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Hero Subtitle / Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.hero.subtitle}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          hero: { ...prev.hero, subtitle: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Hero Background Wallpaper Image"
                  currentValue={content.hero.heroBgImage}
                  uploadImage={uploadImage}
                  storageFolder="hero"
                  onChange={(newUrl) =>
                    updateContent((prev) => ({
                      ...prev,
                      hero: { ...prev.hero, heroBgImage: newUrl },
                    }))
                  }
                  presetCategory="hero"
                />
              </div>
            )}

            {/* 2. SERVICES TAB */}
            {adminTab === 'services' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                      Signature Services Manager ({content.services.length})
                    </h3>
                    <p className="text-xs text-[#1E1718]/70 mt-0.5">
                      Edit names, prices, durations, procedures, and photos for each archway service.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newService: ServiceCategory = {
                        id: `service-${Date.now()}`,
                        name: 'NEW RITUAL',
                        category: 'manicure',
                        subtitle: 'Exclusive Custom Korean Care',
                        description: 'Custom bespoke spa treatment tailored to your desires.',
                        duration: '60 MIN',
                        originalPrice: 1500,
                        discountedPrice: 1050,
                        image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85',
                        iconName: 'Sparkles',
                        koreanEssence: 'Seoul Botanical Formula',
                        highlights: ['Hospital-grade sterilization', 'Organic certified'],
                        steps: ['Sanitization', 'Preparation', 'Application', 'Finish'],
                      };
                      updateContent((prev) => ({
                        ...prev,
                        services: [...prev.services, newService],
                      }));
                      setActiveEditingServiceId(newService.id);
                    }}
                    className="px-3.5 py-2 bg-[#63222D] text-[#EBDCB9] rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#7A2A37] transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD SERVICE</span>
                  </button>
                </div>

                {/* Service Items Accordion / Cards */}
                <div className="space-y-4">
                  {content.services.map((service, index) => {
                    const isEditing = activeEditingServiceId === service.id;
                    return (
                      <div
                        key={service.id}
                        className="bg-[#FAF6F0] rounded-2xl border border-[#C5A059]/40 overflow-hidden shadow-xs"
                      >
                        {/* Service Item Summary Bar */}
                        <div className="p-4 flex items-center justify-between gap-4 bg-[#F4ECE1]/60">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={service.image}
                              alt={service.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover border border-[#C5A059]/50 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-didone text-base font-bold text-[#63222D] truncate">
                                  {service.name}
                                </span>
                                <span className="text-[10px] px-2 py-0.5 bg-[#63222D] text-[#EBDCB9] rounded-full font-bold">
                                  {service.duration}
                                </span>
                              </div>
                              <div className="text-xs text-[#1E1718]/70 truncate">
                                ฿{service.originalPrice.toLocaleString()} &rarr;{' '}
                                <span className="font-bold text-emerald-700">
                                  ฿{service.discountedPrice.toLocaleString()} (30% OFF)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() =>
                                setActiveEditingServiceId(isEditing ? null : service.id)
                              }
                              className="px-3 py-1.5 bg-white border border-[#C5A059]/50 text-[#63222D] rounded-lg text-xs font-medium hover:bg-[#63222D] hover:text-[#EBDCB9] transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>{isEditing ? 'Close' : 'Edit Service'}</span>
                            </button>

                            {content.services.length > 1 && (
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete "${service.name}"?`)) {
                                    updateContent((prev) => ({
                                      ...prev,
                                      services: prev.services.filter((s) => s.id !== service.id),
                                    }));
                                  }
                                }}
                                className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expanded Edit Form */}
                        {isEditing && (
                          <div className="p-5 border-t border-[#C5A059]/30 bg-[#FBF8F3] space-y-4 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                  Service Name (e.g. MANICURES)
                                </label>
                                <input
                                  type="text"
                                  value={service.name}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateContent((prev) => ({
                                      ...prev,
                                      services: prev.services.map((s) =>
                                        s.id === service.id ? { ...s, name: val } : s
                                      ),
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                                />
                              </div>

                              <div>
                                <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                  Subtitle / Tagline
                                </label>
                                <input
                                  type="text"
                                  value={service.subtitle}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateContent((prev) => ({
                                      ...prev,
                                      services: prev.services.map((s) =>
                                        s.id === service.id ? { ...s, subtitle: val } : s
                                      ),
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                                />
                              </div>

                              <div>
                                <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                  Duration (e.g. 60 — 75 MIN)
                                </label>
                                <input
                                  type="text"
                                  value={service.duration}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateContent((prev) => ({
                                      ...prev,
                                      services: prev.services.map((s) =>
                                        s.id === service.id ? { ...s, duration: val } : s
                                      ),
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                    Original Price (฿)
                                  </label>
                                  <input
                                    type="number"
                                    value={service.originalPrice}
                                    onChange={(e) => {
                                      const orig = Number(e.target.value);
                                      const disc = Math.round(orig * 0.7);
                                      updateContent((prev) => ({
                                        ...prev,
                                        services: prev.services.map((s) =>
                                          s.id === service.id
                                            ? { ...s, originalPrice: orig, discountedPrice: disc }
                                            : s
                                        ),
                                      }));
                                    }}
                                    className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                                  />
                                </div>

                                <div>
                                  <label className="block font-cinzel font-bold text-emerald-700 mb-1">
                                    Discount Price (30% OFF)
                                  </label>
                                  <input
                                    type="number"
                                    value={service.discountedPrice}
                                    onChange={(e) => {
                                      const disc = Number(e.target.value);
                                      updateContent((prev) => ({
                                        ...prev,
                                        services: prev.services.map((s) =>
                                          s.id === service.id ? { ...s, discountedPrice: disc } : s
                                        ),
                                      }));
                                    }}
                                    className="w-full px-3 py-2 bg-white border border-emerald-500/40 rounded-lg text-xs font-bold text-emerald-800 focus:outline-emerald-700"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                  Full Description
                                </label>
                                <textarea
                                  rows={2}
                                  value={service.description}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateContent((prev) => ({
                                      ...prev,
                                      services: prev.services.map((s) =>
                                        s.id === service.id ? { ...s, description: val } : s
                                      ),
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                  Korean Essence Highlight
                                </label>
                                <input
                                  type="text"
                                  value={service.koreanEssence}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateContent((prev) => ({
                                      ...prev,
                                      services: prev.services.map((s) =>
                                        s.id === service.id ? { ...s, koreanEssence: val } : s
                                      ),
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs focus:outline-[#63222D]"
                                />
                              </div>
                            </div>

                            {/* Service Image Uploader */}
                            <ImageUploader
                              label={`Service Photo for "${service.name}"`}
                              currentValue={service.image}
                              uploadImage={uploadImage}
                              storageFolder={`services/${service.id}`}
                              onChange={(newUrl) =>
                                updateContent((prev) => ({
                                  ...prev,
                                  services: prev.services.map((s) =>
                                    s.id === service.id ? { ...s, image: newUrl } : s
                                  ),
                                }))
                              }
                              presetCategory="services"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. STERILIZATION TAB */}
            {adminTab === 'sterilization' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                    Hospital-Grade Sterilization Chamber
                  </h3>
                  <p className="text-xs text-[#1E1718]/70 mt-0.5">
                    Customize autoclave medical specifications (134°C / 2.1 Bar / 99.999%), quote, and steps.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Temperature Spec
                    </label>
                    <input
                      type="text"
                      value={content.sterilization.chamberTemp}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          sterilization: { ...prev.sterilization, chamberTemp: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs font-bold text-[#63222D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Pressure Spec
                    </label>
                    <input
                      type="text"
                      value={content.sterilization.chamberPressure}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          sterilization: { ...prev.sterilization, chamberPressure: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs font-bold text-[#63222D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Pathogen Eradication %
                    </label>
                    <input
                      type="text"
                      value={content.sterilization.reductionRate}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          sterilization: { ...prev.sterilization, reductionRate: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs font-bold text-emerald-700"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Chamber Subtitle Quote
                    </label>
                    <textarea
                      rows={2}
                      value={content.sterilization.subtitle}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          sterilization: { ...prev.sterilization, subtitle: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Sterilization Equipment Photo"
                  currentValue={content.sterilization.chamberImage}
                  uploadImage={uploadImage}
                  storageFolder="sterilization"
                  onChange={(newUrl) =>
                    updateContent((prev) => ({
                      ...prev,
                      sterilization: { ...prev.sterilization, chamberImage: newUrl },
                    }))
                  }
                  presetCategory="sterilization"
                />

                {/* Steps edit */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-cinzel text-xs font-bold text-[#63222D] uppercase tracking-wider">
                    4 Sterilization Steps
                  </h4>
                  {content.sterilization.steps.map((step, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#C5A059]/30 text-xs space-y-2">
                      <div className="flex items-center gap-2 font-cinzel font-bold text-[#63222D]">
                        <span className="w-5 h-5 rounded-full bg-[#63222D] text-[#EBDCB9] flex items-center justify-center text-[10px]">
                          {step.step}
                        </span>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => ({
                              ...prev,
                              sterilization: {
                                ...prev.sterilization,
                                steps: prev.sterilization.steps.map((s, i) =>
                                  i === idx ? { ...s, title: val } : s
                                ),
                              },
                            }));
                          }}
                          className="flex-1 font-bold text-xs border-b border-[#C5A059]/30 focus:outline-none"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateContent((prev) => ({
                            ...prev,
                            sterilization: {
                              ...prev.sterilization,
                              steps: prev.sterilization.steps.map((s, i) =>
                                i === idx ? { ...s, description: val } : s
                              ),
                            },
                          }));
                        }}
                        className="w-full px-2 py-1 bg-[#FAF6F0] rounded border border-[#C5A059]/20 text-[11px]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. ORGANIQUE PRODUCTS TAB */}
            {adminTab === 'organique' && (
              <div className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                      &ldquo;The Organique&rdquo; Korean Products
                    </h3>
                    <p className="text-xs text-[#1E1718]/70 mt-0.5">
                      Manage genuine Korean imported apothecary products, benefits, ingredients, and photos.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newProd: OrganiqueProduct = {
                        id: `prod-${Date.now()}`,
                        name: 'Korean Botanical Treatment',
                        koreanName: '유기농 보태니컬 트리트먼트',
                        type: 'Organic Elixir',
                        volume: '50ml',
                        ingredients: ['Jeju Green Tea', 'Centella Asiatica', 'Hyaluronic Acid'],
                        benefits: 'Instantly nourishes and hydrates skin.',
                        certifications: ['Ecocert Organic', 'Cruelty Free'],
                        image: 'https://images.unsplash.com/photo-1608248597359-5982845642d9?auto=format&fit=crop&w=600&q=80',
                      };
                      updateContent((prev) => ({
                        ...prev,
                        organique: {
                          ...prev.organique,
                          products: [...prev.organique.products, newProd],
                        },
                      }));
                      setActiveEditingProductId(newProd.id);
                    }}
                    className="px-3.5 py-2 bg-[#63222D] text-[#EBDCB9] rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#7A2A37] transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD PRODUCT</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.organique.products.map((prod) => {
                    const isEditing = activeEditingProductId === prod.id;
                    return (
                      <div
                        key={prod.id}
                        className="bg-[#FAF6F0] rounded-2xl border border-[#C5A059]/40 overflow-hidden"
                      >
                        <div className="p-4 flex items-center justify-between gap-4 bg-[#F4ECE1]/60">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image}
                              alt={prod.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-lg object-cover border border-[#C5A059]/50"
                            />
                            <div>
                              <div className="font-didone text-base font-bold text-[#63222D]">
                                {prod.name}
                              </div>
                              <div className="text-[11px] text-[#1E1718]/70">
                                {prod.koreanName} &bull; {prod.volume}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                setActiveEditingProductId(isEditing ? null : prod.id)
                              }
                              className="px-3 py-1.5 bg-white border border-[#C5A059]/50 text-[#63222D] rounded-lg text-xs font-medium hover:bg-[#63222D] hover:text-[#EBDCB9] transition-colors cursor-pointer"
                            >
                              {isEditing ? 'Close' : 'Edit'}
                            </button>

                            {content.organique.products.length > 1 && (
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete product "${prod.name}"?`)) {
                                    updateContent((prev) => ({
                                      ...prev,
                                      organique: {
                                        ...prev.organique,
                                        products: prev.organique.products.filter(
                                          (p) => p.id !== prod.id
                                        ),
                                      },
                                    }));
                                  }
                                }}
                                className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {isEditing && (
                          <div className="p-5 border-t border-[#C5A059]/30 bg-[#FBF8F3] space-y-3 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                  Product Name (English)
                                </label>
                                <input
                                  type="text"
                                  value={prod.name}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateContent((prev) => ({
                                      ...prev,
                                      organique: {
                                        ...prev.organique,
                                        products: prev.organique.products.map((p) =>
                                          p.id === prod.id ? { ...p, name: val } : p
                                        ),
                                      },
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs"
                                />
                              </div>

                              <div>
                                <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                  Korean Name
                                </label>
                                <input
                                  type="text"
                                  value={prod.koreanName}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateContent((prev) => ({
                                      ...prev,
                                      organique: {
                                        ...prev.organique,
                                        products: prev.organique.products.map((p) =>
                                          p.id === prod.id ? { ...p, koreanName: val } : p
                                        ),
                                      },
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                                  Benefits &amp; Texture
                                </label>
                                <textarea
                                  rows={2}
                                  value={prod.benefits}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    updateContent((prev) => ({
                                      ...prev,
                                      organique: {
                                        ...prev.organique,
                                        products: prev.organique.products.map((p) =>
                                          p.id === prod.id ? { ...p, benefits: val } : p
                                        ),
                                      },
                                    }));
                                  }}
                                  className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs"
                                />
                              </div>
                            </div>

                            <ImageUploader
                              label={`Photo for "${prod.name}"`}
                              currentValue={prod.image}
                              uploadImage={uploadImage}
                              storageFolder={`products/${prod.id}`}
                              onChange={(newUrl) =>
                                updateContent((prev) => ({
                                  ...prev,
                                  organique: {
                                    ...prev.organique,
                                    products: prev.organique.products.map((p) =>
                                      p.id === prod.id ? { ...p, image: newUrl } : p
                                    ),
                                  },
                                }))
                              }
                              presetCategory="products"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. SAFETY COMPARISON TAB */}
            {adminTab === 'comparison' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                    Safety Comparison Benchmark Table
                  </h3>
                  <p className="text-xs text-[#1E1718]/70 mt-0.5">
                    Edit standard nail salon practices vs Luxeva Coterie hospital-grade protocols.
                  </p>
                </div>

                <div className="space-y-4">
                  {(Array.isArray(content.safetyComparison) ? content.safetyComparison : (content.safetyComparison?.items || [])).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-[#C5A059]/30 text-xs space-y-3"
                    >
                      <div>
                        <label className="block font-cinzel font-bold text-[#63222D] mb-1">
                          Criteria #{idx + 1}
                        </label>
                        <input
                          type="text"
                          value={item.feature}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateContent((prev) => {
                              const currItems = Array.isArray(prev.safetyComparison) ? prev.safetyComparison : (prev.safetyComparison?.items || []);
                              return {
                                ...prev,
                                safetyComparison: {
                                  title: prev.safetyComparison?.title || '',
                                  subtitle: prev.safetyComparison?.subtitle || '',
                                  items: currItems.map((it, i) =>
                                    i === idx ? { ...it, feature: val } : it
                                  ),
                                },
                              };
                            });
                          }}
                          className="w-full px-3 py-1.5 bg-[#FAF6F0] rounded border border-[#C5A059]/30 font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-rose-800 font-bold mb-1">
                            Traditional Nail Salons
                          </label>
                          <textarea
                            rows={2}
                            value={item.standard}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateContent((prev) => {
                                const currItems = Array.isArray(prev.safetyComparison) ? prev.safetyComparison : (prev.safetyComparison?.items || []);
                                return {
                                  ...prev,
                                  safetyComparison: {
                                    title: prev.safetyComparison?.title || '',
                                    subtitle: prev.safetyComparison?.subtitle || '',
                                    items: currItems.map((it, i) =>
                                      i === idx ? { ...it, standard: val } : it
                                    ),
                                  },
                                };
                              });
                            }}
                            className="w-full p-2 bg-rose-50 border border-rose-200 rounded text-rose-900"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-emerald-800 font-bold mb-1">
                            Luxeva Coterie Sanctuary
                          </label>
                          <textarea
                            rows={2}
                            value={item.luxeva}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateContent((prev) => {
                                const currItems = Array.isArray(prev.safetyComparison) ? prev.safetyComparison : (prev.safetyComparison?.items || []);
                                return {
                                  ...prev,
                                  safetyComparison: {
                                    title: prev.safetyComparison?.title || '',
                                    subtitle: prev.safetyComparison?.subtitle || '',
                                    items: currItems.map((it, i) =>
                                      i === idx ? { ...it, luxeva: val } : it
                                    ),
                                  },
                                };
                              });
                            }}
                            className="w-full p-2 bg-emerald-50 border border-emerald-200 rounded text-emerald-900"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. CONTACT & LINE QR TAB */}
            {adminTab === 'contact' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                    Concierge, Location &amp; LINE QR Code
                  </h3>
                  <p className="text-xs text-[#1E1718]/70 mt-0.5">
                    Update phone, address, operating hours, LINE Official ID, and QR code image.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Salon Name
                    </label>
                    <input
                      type="text"
                      value={content.brand.salonName}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, salonName: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Monogram (2 Letters)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={content.brand.monogram}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, monogram: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs font-bold text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      LINE ID (e.g. @luxevacoterie)
                    </label>
                    <input
                      type="text"
                      value={content.brand.lineId}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, lineId: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#06C755]/50 text-[#06C755] font-bold rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={content.brand.phone}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, phone: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Sanctuary Location Address
                    </label>
                    <input
                      type="text"
                      value={content.brand.address}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, address: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-cinzel font-bold text-[#63222D] mb-1">
                      Opening Hours
                    </label>
                    <input
                      type="text"
                      value={content.brand.openingHours}
                      onChange={(e) =>
                        updateContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, openingHours: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 bg-white border border-[#C5A059]/40 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <ImageUploader
                  label="Custom LINE QR Code Image (Optional: Upload your real shop QR code)"
                  currentValue={content.brand.qrCodeImage || ''}
                  uploadImage={uploadImage}
                  storageFolder="qr"
                  onChange={(newUrl) =>
                    updateContent((prev) => ({
                      ...prev,
                      brand: { ...prev.brand, qrCodeImage: newUrl },
                    }))
                  }
                  aspectRatio="square"
                />
              </div>
            )}

            {/* 7. FAQS TAB */}
            {adminTab === 'faqs' && (
              <div className="max-w-3xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                      Frequently Asked Questions ({(Array.isArray(content.faq) ? content.faq : (content.faq?.items || [])).length})
                    </h3>
                    <p className="text-xs text-[#1E1718]/70 mt-0.5">
                      Add, edit, or remove customer inquiries and answers.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const newFaq: FaqItem = {
                        id: `faq-${Date.now()}`,
                        category: 'booking',
                        question: 'New customer question?',
                        answer: 'Here is the detailed answer for our guests.',
                      };
                      updateContent((prev) => {
                        const currItems = Array.isArray(prev.faq) ? prev.faq : (prev.faq?.items || []);
                        return {
                          ...prev,
                          faq: {
                            title: prev.faq?.title || 'Frequently Answered Questions',
                            subtitle: prev.faq?.subtitle || 'CONCIERGE INQUIRIES & ASSURANCE',
                            items: [...currItems, newFaq],
                          },
                        };
                      });
                    }}
                    className="px-3.5 py-2 bg-[#63222D] text-[#EBDCB9] rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#7A2A37] transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD FAQ</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(Array.isArray(content.faq) ? content.faq : (content.faq?.items || [])).map((faq, idx) => (
                    <div
                      key={faq.id}
                      className="bg-white p-4 rounded-xl border border-[#C5A059]/30 text-xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-cinzel font-bold text-[#63222D]">
                          Q#{idx + 1}
                        </span>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this question?')) {
                              updateContent((prev) => {
                                const currItems = Array.isArray(prev.faq) ? prev.faq : (prev.faq?.items || []);
                                return {
                                  ...prev,
                                  faq: {
                                    title: prev.faq?.title || 'Frequently Answered Questions',
                                    subtitle: prev.faq?.subtitle || 'CONCIERGE INQUIRIES & ASSURANCE',
                                    items: currItems.filter((f) => f.id !== faq.id),
                                  },
                                };
                              });
                            }
                          }}
                          className="text-rose-600 hover:text-rose-800 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateContent((prev) => {
                            const currItems = Array.isArray(prev.faq) ? prev.faq : (prev.faq?.items || []);
                            return {
                              ...prev,
                              faq: {
                                title: prev.faq?.title || 'Frequently Answered Questions',
                                subtitle: prev.faq?.subtitle || 'CONCIERGE INQUIRIES & ASSURANCE',
                                items: currItems.map((f) =>
                                  f.id === faq.id ? { ...f, question: val } : f
                                ),
                              },
                            };
                          });
                        }}
                        className="w-full px-3 py-2 bg-[#FAF6F0] rounded-lg border border-[#C5A059]/30 font-bold text-xs"
                      />

                      <textarea
                        rows={3}
                        value={faq.answer}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateContent((prev) => {
                            const currItems = Array.isArray(prev.faq) ? prev.faq : (prev.faq?.items || []);
                            return {
                              ...prev,
                              faq: {
                                title: prev.faq?.title || 'Frequently Answered Questions',
                                subtitle: prev.faq?.subtitle || 'CONCIERGE INQUIRIES & ASSURANCE',
                                items: currItems.map((f) =>
                                  f.id === faq.id ? { ...f, answer: val } : f
                                ),
                              },
                            };
                          });
                        }}
                        className="w-full px-3 py-2 bg-[#FAF6F0] rounded-lg border border-[#C5A059]/30 text-xs font-didone italic"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. BOOKINGS CRM TAB */}
            {adminTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                      Customer Appointment CRM ({bookings.length})
                    </h3>
                    <p className="text-xs text-[#1E1718]/70 mt-0.5">
                      Real-time guest reservations submitted from the August 30% discount console.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const csvContent =
                          'data:text/csv;charset=utf-8,' +
                          ['Client Name,Phone,LINE,Date,Time,Services,Total Discounted,Status,Notes']
                            .concat(
                              bookings.map(
                                (b) =>
                                  `"${b.clientName}","${b.phone}","${b.lineId}","${b.date}","${
                                    b.time
                                  }","${b.selectedServices.map((s) => s.name).join(' + ')}",${
                                    b.totalDiscounted
                                  },"${b.status || 'pending'}","${(b.notes || '').replace(
                                    /"/g,
                                    '""'
                                  )}"`
                              )
                            )
                            .join('\n');
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement('a');
                        link.setAttribute('href', encodedUri);
                        link.setAttribute(
                          'download',
                          `luxeva_bookings_${new Date().toISOString().slice(0, 10)}.csv`
                        );
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                      }}
                      className="px-3.5 py-2 bg-white border border-[#C5A059] text-[#63222D] rounded-xl text-xs font-bold hover:bg-[#63222D] hover:text-[#EBDCB9] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>EXPORT CSV</span>
                    </button>
                  </div>
                </div>

                {bookings.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl border border-[#C5A059]/30 text-center text-[#1E1718]/60">
                    <Calendar className="w-10 h-10 mx-auto text-[#C5A059] mb-3" />
                    <p className="font-didone text-base font-bold text-[#63222D]">
                      No appointments submitted yet
                    </p>
                    <p className="text-xs mt-1">
                      When guests reserve a slot on the homepage, their details will appear here instantly.
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-[#C5A059]/30 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#63222D] text-[#FBF8F3] font-cinzel font-bold text-[11px] uppercase tracking-wider">
                            <th className="p-3.5">Guest &amp; Contact</th>
                            <th className="p-3.5">Date &amp; Time</th>
                            <th className="p-3.5">Selected Rituals</th>
                            <th className="p-3.5">30% Total</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#C5A059]/20">
                          {bookings.map((b) => (
                            <tr key={b.id || Math.random()} className="hover:bg-[#FAF6F0]/60 transition-colors">
                              <td className="p-3.5 font-medium">
                                <div className="font-didone font-bold text-sm text-[#63222D]">
                                  {b.clientName}
                                </div>
                                <div className="text-[11px] text-[#1E1718]/70 flex items-center gap-2 mt-0.5">
                                  <span>📞 {b.phone}</span>
                                  {b.lineId && (
                                    <span className="text-[#06C755] font-bold">
                                      LINE: {b.lineId}
                                    </span>
                                  )}
                                </div>
                                {b.notes && (
                                  <div className="text-[10px] text-amber-900 bg-amber-50 p-1 rounded mt-1 border border-amber-200/50 italic">
                                    &ldquo;{b.notes}&rdquo;
                                  </div>
                                )}
                              </td>

                              <td className="p-3.5">
                                <div className="font-bold text-[#63222D]">
                                  {b.date}
                                </div>
                                <div className="text-[11px] text-[#1E1718]/60 font-mono">
                                  {b.time}
                                </div>
                              </td>

                              <td className="p-3.5">
                                <div className="space-y-1">
                                  {b.selectedServices.map((s, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-block mr-1 mb-1 px-2 py-0.5 bg-[#FAF6F0] border border-[#C5A059]/40 rounded text-[10px] font-medium text-[#63222D]"
                                    >
                                      {s.name}
                                    </span>
                                  ))}
                                </div>
                              </td>

                              <td className="p-3.5">
                                <div className="font-bold text-emerald-700 text-sm">
                                  ฿{b.totalDiscounted.toLocaleString()}
                                </div>
                                <div className="text-[10px] line-through text-[#1E1718]/40">
                                  ฿{b.totalOriginal.toLocaleString()}
                                </div>
                              </td>

                              <td className="p-3.5">
                                <select
                                  value={b.status || 'pending'}
                                  onChange={(e) =>
                                    updateBookingStatus(
                                      b.id!,
                                      e.target.value as any
                                    )
                                  }
                                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer focus:outline-none ${
                                    b.status === 'confirmed'
                                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                      : b.status === 'completed'
                                      ? 'bg-blue-100 text-blue-800 border-blue-300'
                                      : b.status === 'cancelled'
                                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                                      : 'bg-amber-100 text-amber-800 border-amber-300'
                                  }`}
                                >
                                  <option value="pending">⏳ Pending</option>
                                  <option value="confirmed">✅ Confirmed</option>
                                  <option value="completed">✨ Completed</option>
                                  <option value="cancelled">❌ Cancelled</option>
                                </select>
                              </td>

                              <td className="p-3.5 text-right">
                                <button
                                  onClick={() => b.id && deleteBooking(b.id)}
                                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 9. FIREBASE CLOUD SYNC TAB */}
            {adminTab === 'firebase' && (
              <div className="max-w-3xl space-y-6 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-didone text-2xl font-bold text-[#63222D] flex items-center gap-2">
                      <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
                      Firebase Firestore Cloud Sync
                    </h3>
                    <p className="text-xs text-[#1E1718]/70 mt-0.5">
                      เชื่อมต่อฐานข้อมูล Google Cloud Firestore เพื่อซิงก์ข้อมูลแบบ Real-time ข้ามทุกอุปกรณ์
                    </p>
                  </div>

                  {firebaseStatus.isConnected && (
                    <button
                      onClick={handleDisconnectFirebase}
                      className="px-3 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Disconnect Cloud
                    </button>
                  )}
                </div>

                {/* Status Hero Card */}
                <div className={`p-5 rounded-2xl border-2 transition-all ${
                  firebaseStatus.isConnected
                    ? 'bg-emerald-50/60 border-emerald-400'
                    : 'bg-white border-[#C5A059]/40'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        firebaseStatus.isConnected
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'bg-[#63222D] text-[#EBDCB9]'
                      }`}>
                        {firebaseStatus.isConnected ? (
                          <Cloud className="w-6 h-6" />
                        ) : (
                          <Database className="w-6 h-6 text-[#C5A059]" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                            firebaseStatus.isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
                          }`} />
                          <span className="font-cinzel font-bold text-xs uppercase tracking-wider text-[#63222D]">
                            {firebaseStatus.isConnected ? 'FIRESTORE CLOUD ACTIVE' : 'LOCAL STORAGE MODE'}
                          </span>
                        </div>
                        <p className="text-xs text-[#1E1718]/80 mt-1 font-medium">
                          {firebaseStatus.isConnected
                            ? `Connected to Google Cloud Project: ${firebaseStatus.projectId}`
                            : 'Currently using browser local storage & built-in fallback server.'}
                        </p>
                        {firebaseStatus.lastSyncedAt && (
                          <p className="text-[11px] text-emerald-800 font-mono mt-0.5">
                            Last synced: {firebaseStatus.lastSyncedAt}
                          </p>
                        )}
                      </div>
                    </div>

                    {firebaseStatus.isConnected && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePushCloud}
                          disabled={isPushing}
                          className="px-3.5 py-2 bg-[#63222D] text-[#EBDCB9] rounded-xl text-xs font-bold hover:bg-[#7A2A37] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isPushing ? 'Pushing...' : 'Push to Cloud'}</span>
                        </button>
                        <button
                          onClick={handlePullCloud}
                          disabled={isPulling}
                          className="px-3.5 py-2 bg-white border border-[#C5A059] text-[#63222D] rounded-xl text-xs font-bold hover:bg-[#FAF6F0] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{isPulling ? 'Pulling...' : 'Pull from Cloud'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {fbFeedback && (
                    <div className={`mt-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                      fbFeedback.type === 'success'
                        ? 'bg-emerald-100/90 text-emerald-900 border border-emerald-300'
                        : fbFeedback.type === 'error'
                        ? 'bg-rose-100/90 text-rose-900 border border-rose-300'
                        : 'bg-amber-100/90 text-amber-900 border border-amber-300'
                    }`}>
                      {fbFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      )}
                      <span>{fbFeedback.message}</span>
                    </div>
                  )}
                </div>

                {/* Configuration Input Box */}
                <div className="bg-white p-6 rounded-2xl border border-[#C5A059]/40 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-3">
                    <h4 className="font-didone text-lg font-bold text-[#63222D] flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#C5A059]" />
                      Firebase Project Credentials
                    </h4>
                    <span className="text-[11px] text-[#1E1718]/60">
                      Paste snippet or enter fields
                    </span>
                  </div>

                  {/* Option 1: Quick Paste Snippet */}
                  <div className="space-y-2 bg-[#FAF6F0] p-4 rounded-xl border border-[#C5A059]/30">
                    <label className="text-xs font-bold text-[#63222D] block">
                      ⚡ Quick Setup: Paste Firebase Config Object / Snippet
                    </label>
                    <p className="text-[11px] text-[#1E1718]/70">
                      คัดลอกโค้ด <code>const firebaseConfig = &#123; ... &#125;;</code> จากหน้า Firebase Console มาวางในช่องนี้ได้ทันที:
                    </p>
                    <div className="flex gap-2">
                      <textarea
                        rows={3}
                        value={fbSnippet}
                        onChange={(e) => setFbSnippet(e.target.value)}
                        placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  projectId: "your-project-id",\n  authDomain: "your-project.firebaseapp.com",\n};`}
                        className="w-full p-2.5 font-mono text-xs bg-white rounded-lg border border-[#C5A059]/40 focus:outline-[#63222D]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleParseSnippet}
                      className="px-3.5 py-1.5 bg-[#63222D] text-[#EBDCB9] rounded-lg text-xs font-bold hover:bg-[#7A2A37] transition-colors cursor-pointer"
                    >
                      Extract &amp; Fill Form
                    </button>
                  </div>

                  {/* Option 2: Individual Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#63222D]">
                        Project ID <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={fbProjectId}
                        onChange={(e) => setFbProjectId(e.target.value)}
                        placeholder="e.g. luxeva-salon-app"
                        className="w-full px-3 py-2 bg-[#FAF6F0] rounded-lg border border-[#C5A059]/30 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#63222D]">
                        API Key (apiKey) <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={fbApiKey}
                        onChange={(e) => setFbApiKey(e.target.value)}
                        placeholder="e.g. AIzaSyB..."
                        className="w-full px-3 py-2 bg-[#FAF6F0] rounded-lg border border-[#C5A059]/30 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#63222D]">
                        Auth Domain
                      </label>
                      <input
                        type="text"
                        value={fbAuthDomain}
                        onChange={(e) => setFbAuthDomain(e.target.value)}
                        placeholder="e.g. luxeva-salon-app.firebaseapp.com"
                        className="w-full px-3 py-2 bg-[#FAF6F0] rounded-lg border border-[#C5A059]/30 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#63222D]">
                        Storage Bucket
                      </label>
                      <input
                        type="text"
                        value={fbStorageBucket}
                        onChange={(e) => setFbStorageBucket(e.target.value)}
                        placeholder="e.g. luxeva-salon-app.appspot.com"
                        className="w-full px-3 py-2 bg-[#FAF6F0] rounded-lg border border-[#C5A059]/30 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleConnectFirebase}
                      disabled={fbTestLoading}
                      className="px-5 py-2.5 bg-[#63222D] text-[#EBDCB9] font-cinzel font-bold text-xs rounded-xl hover:bg-[#7A2A37] transition-colors flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      {fbTestLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>TESTING &amp; CONNECTING...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>TEST &amp; CONNECT TO FIRESTORE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Step-by-Step Tutorial Box in Thai */}
                <div className="bg-amber-50/50 border border-[#C5A059]/40 p-5 rounded-2xl space-y-3 text-xs text-[#1E1718]/80">
                  <h4 className="font-didone text-base font-bold text-[#63222D] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                    ขั้นตอนการสร้าง Firebase ฟรีใน 2 นาที (Step-by-step Guide):
                  </h4>

                  <ol className="list-decimal list-inside space-y-2 leading-relaxed pl-1">
                    <li>
                      เปิดเว็บไซต์ <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-[#63222D] font-bold underline inline-flex items-center gap-1">console.firebase.google.com <ExternalLink className="w-3 h-3" /></a> แล้วล็อกอินด้วย Gmail (ใช้งานฟรี 100%)
                    </li>
                    <li>
                      กดปุ่ม <strong>&ldquo;Add project&rdquo;</strong> (สร้างโปรเจกต์) เช่น ตั้งชื่อ <code>luxeva-coterie</code> แล้วกด Continue จนเสร็จ
                    </li>
                    <li>
                      ที่เมนูซ้ายมือ เลือก <strong>Build &rarr; Firestore Database</strong> &rarr; กดปุ่ม <strong>&ldquo;Create database&rdquo;</strong> &rarr; เลือกโหมด <strong>&ldquo;Start in test mode&rdquo;</strong> แล้วกด Enable
                    </li>
                    <li>
                      กดไอคอนรูปเฟือง ⚙️ (Project settings) ด้านบนซ้าย &rarr; เลื่อนลงมาที่หัวข้อ <strong>&ldquo;Your apps&rdquo;</strong> &rarr; กดไอคอนเว็บ <strong>&lt;/&gt;</strong>
                    </li>
                    <li>
                      คัดลอกข้อความใน <code>firebaseConfig</code> มาวางในช่อง Quick Setup ด้านบนนี้ แล้วกดปุ่ม <strong>&ldquo;TEST &amp; CONNECT TO FIRESTORE&rdquo;</strong>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {/* 10. SETTINGS & SECURITY TAB */}
            {adminTab === 'settings' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-didone text-2xl font-bold text-[#63222D]">
                    Security, Backup &amp; Factory Reset
                  </h3>
                  <p className="text-xs text-[#1E1718]/70 mt-0.5">
                    Change admin passcode, export JSON snapshot, or restore original flyer content.
                  </p>
                </div>

                {/* Change Passcode Card */}
                <div className="bg-white p-6 rounded-2xl border-2 border-[#C5A059]/40 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-[#C5A059]/20 pb-3">
                    <div className="flex items-center gap-2 text-[#63222D] font-cinzel font-bold text-sm">
                      <KeyRound className="w-5 h-5 text-[#C5A059]" />
                      <span>CHANGE ADMIN PASSCODE (เปลี่ยนรหัสผ่าน CMS)</span>
                    </div>
                    <span className="text-[11px] font-mono text-[#63222D] bg-[#FAF6F0] px-2.5 py-1 rounded-full border border-[#C5A059]/30">
                      Default: 123456
                    </span>
                  </div>

                  <p className="text-xs text-[#1E1718]/75 leading-relaxed">
                    เพื่อความปลอดภัยของระบบ กรุณากรอกรหัสผ่านปัจจุบัน (ค่าเริ่มต้นคือ <strong className="font-mono text-[#63222D]">123456</strong>) ก่อนตั้งรหัสผ่านใหม่
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setPasscodeChangeFeedback(null);
                      if (!currentPassInput.trim()) {
                        setPasscodeChangeFeedback({
                          type: 'error',
                          message: 'กรุณากรอกรหัสผ่านปัจจุบัน (Please enter current passcode)',
                        });
                        return;
                      }
                      if (!newPassInput.trim()) {
                        setPasscodeChangeFeedback({
                          type: 'error',
                          message: 'กรุณากรอกรหัสผ่านใหม่ (Please enter new passcode)',
                        });
                        return;
                      }
                      if (newPassInput !== confirmPassInput) {
                        setPasscodeChangeFeedback({
                          type: 'error',
                          message: 'รหัสผ่านใหม่และการยืนยันไม่ตรงกัน (New passcode and confirmation do not match)',
                        });
                        return;
                      }
                      const res = changeAdminPasscode(currentPassInput, newPassInput);
                      if (res.success) {
                        setPasscodeChangeFeedback({
                          type: 'success',
                          message: res.message,
                        });
                        setCurrentPassInput('');
                        setNewPassInput('');
                        setConfirmPassInput('');
                      } else {
                        setPasscodeChangeFeedback({
                          type: 'error',
                          message: res.message,
                        });
                      }
                    }}
                    className="space-y-3 pt-1"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-cinzel font-bold text-[#63222D] mb-1">
                          Current Passcode *
                        </label>
                        <input
                          type="password"
                          value={currentPassInput}
                          onChange={(e) => setCurrentPassInput(e.target.value)}
                          placeholder="Current code"
                          className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#C5A059]/40 rounded-xl text-xs font-mono focus:outline-[#63222D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-cinzel font-bold text-[#63222D] mb-1">
                          New Passcode *
                        </label>
                        <input
                          type="password"
                          value={newPassInput}
                          onChange={(e) => setNewPassInput(e.target.value)}
                          placeholder="New code (min 4 chars)"
                          className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#C5A059]/40 rounded-xl text-xs font-mono focus:outline-[#63222D]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-cinzel font-bold text-[#63222D] mb-1">
                          Confirm New Passcode *
                        </label>
                        <input
                          type="password"
                          value={confirmPassInput}
                          onChange={(e) => setConfirmPassInput(e.target.value)}
                          placeholder="Repeat new code"
                          className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#C5A059]/40 rounded-xl text-xs font-mono focus:outline-[#63222D]"
                        />
                      </div>
                    </div>

                    {passcodeChangeFeedback && (
                      <div
                        className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                          passcodeChangeFeedback.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-50 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {passcodeChangeFeedback.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        )}
                        <span>{passcodeChangeFeedback.message}</span>
                      </div>
                    )}

                    <div className="pt-1 flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#63222D] text-[#EBDCB9] rounded-xl font-cinzel font-bold text-xs hover:bg-[#7A2A37] transition-colors cursor-pointer shadow-xs flex items-center gap-2"
                      >
                        <KeyRound className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>UPDATE PASSCODE (บันทึกรหัสผ่านใหม่)</span>
                      </button>
                    </div>
                  </form>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Export Card */}
                  <div className="bg-white p-5 rounded-2xl border border-[#C5A059]/30 space-y-3 shadow-xs">
                    <div className="flex items-center gap-2 text-[#63222D] font-cinzel font-bold text-sm">
                      <Download className="w-5 h-5 text-[#C5A059]" />
                      <span>Download JSON Backup</span>
                    </div>
                    <p className="text-xs text-[#1E1718]/70">
                      Export all your custom texts, images, services, and prices to a `.json` backup file.
                    </p>
                    <button
                      onClick={exportContentJson}
                      className="w-full py-2.5 bg-[#63222D] text-[#EBDCB9] rounded-xl font-cinzel font-bold text-xs hover:bg-[#7A2A37] transition-colors cursor-pointer"
                    >
                      DOWNLOAD BACKUP FILE
                    </button>
                  </div>

                  {/* Restore Defaults Card */}
                  <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-200 space-y-3 shadow-xs">
                    <div className="flex items-center gap-2 text-rose-900 font-cinzel font-bold text-sm">
                      <RotateCcw className="w-5 h-5 text-rose-600" />
                      <span>Reset to Flyer Defaults</span>
                    </div>
                    <p className="text-xs text-rose-900/70">
                      Reverts all content, services, autoclave specs, and images back to the original flyer.
                    </p>
                    <button
                      onClick={resetToDefaults}
                      className="w-full py-2.5 bg-rose-600 text-white rounded-xl font-cinzel font-bold text-xs hover:bg-rose-700 transition-colors cursor-pointer"
                    >
                      RESTORE ORIGINAL DEFAULTS
                    </button>
                  </div>
                </div>

                {/* Import JSON Box */}
                <div className="bg-white p-5 rounded-2xl border border-[#C5A059]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#63222D] font-cinzel font-bold text-sm">
                      <Upload className="w-5 h-5 text-[#C5A059]" />
                      <span>Import JSON Content</span>
                    </div>
                    <button
                      onClick={() => setShowJsonImport(!showJsonImport)}
                      className="text-xs text-[#63222D] underline cursor-pointer"
                    >
                      {showJsonImport ? 'Hide' : 'Open Import Box'}
                    </button>
                  </div>

                  {showJsonImport && (
                    <div className="space-y-3 pt-2">
                      <textarea
                        rows={6}
                        value={jsonImportText}
                        onChange={(e) => setJsonImportText(e.target.value)}
                        placeholder="Paste your JSON backup data here..."
                        className="w-full p-3 font-mono text-xs bg-[#FAF6F0] rounded-xl border border-[#C5A059]/40 focus:outline-[#63222D]"
                      />
                      <button
                        onClick={() => {
                          if (!jsonImportText.trim()) return;
                          const ok = importContentJson(jsonImportText);
                          if (ok) {
                            alert('CMS content successfully imported and applied!');
                            setJsonImportText('');
                            setShowJsonImport(false);
                          } else {
                            alert('Failed to import JSON: Invalid structure.');
                          }
                        }}
                        className="px-4 py-2 bg-[#63222D] text-[#EBDCB9] rounded-lg text-xs font-bold hover:bg-[#7A2A37] transition-colors cursor-pointer"
                      >
                        APPLY JSON BACKUP
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
