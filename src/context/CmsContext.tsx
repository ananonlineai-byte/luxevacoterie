import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteContent, AppointmentBooking, ServiceCategory, OrganiqueProduct, FirebaseConfig, FirebaseConnectionStatus } from '../types';
import { DEFAULT_SITE_CONTENT, INITIAL_BOOKINGS } from '../data';
import {
  getStoredFirebaseConfig,
  saveStoredFirebaseConfig,
  getFirebaseInstance,
  testFirebaseConnection,
  saveSiteContentToFirestore,
  loadSiteContentFromFirestore,
  subscribeToSiteContent,
  createBookingInFirestore,
  loadBookingsFromFirestore,
  updateBookingInFirestore,
  deleteBookingInFirestore,
  uploadImageToStorage
} from '../lib/firebase';

interface CmsContextType {
  content: SiteContent;
  updateContent: (updater: Partial<SiteContent> | ((prev: SiteContent) => SiteContent)) => void;
  resetToDefaults: () => void;
  exportContentJson: () => void;
  importContentJson: (jsonString: string) => boolean;
  
  // Bookings
  bookings: AppointmentBooking[];
  addBooking: (booking: Omit<AppointmentBooking, 'id' | 'createdAt' | 'status'>) => Promise<AppointmentBooking>;
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => void;
  deleteBooking: (id: string) => void;

  // Firebase Firestore Integration
  firebaseConfig: FirebaseConfig | null;
  firebaseStatus: FirebaseConnectionStatus;
  saveFirebaseConfig: (config: FirebaseConfig | null) => Promise<{ success: boolean; message: string }>;
  testFirebase: (config: FirebaseConfig) => Promise<{ success: boolean; message: string }>;
  pushAllToFirestore: () => Promise<boolean>;
  pullAllFromFirestore: () => Promise<boolean>;
  uploadImage: (file: File, folder?: string) => Promise<string>;

  // Admin Modal & Auth
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPasscode: (currentPass: string, newPass: string) => { success: boolean; message: string };
  adminTab: string;
  setAdminTab: (tab: string) => void;

  // Helper
  saveStatus: 'saved' | 'saving' | 'error';
}

const STORAGE_KEY_CONTENT = 'luxeva_coterie_cms_content_v1';
const STORAGE_KEY_BOOKINGS = 'luxeva_coterie_cms_bookings_v1';
const STORAGE_KEY_AUTH = 'luxeva_coterie_admin_auth_v1';
const STORAGE_KEY_PASSCODE = 'luxeva_coterie_admin_passcode_v1';
const DEFAULT_PASSCODE = '123456';

function normalizeSiteContent(data: any): SiteContent {
  if (!data || typeof data !== 'object') return DEFAULT_SITE_CONTENT;

  return {
    brand: { ...DEFAULT_SITE_CONTENT.brand, ...(data.brand || {}) },
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...(data.hero || {}) },
    pledge: { ...DEFAULT_SITE_CONTENT.pledge, ...(data.pledge || {}) },
    services: Array.isArray(data.services) && data.services.length > 0 ? data.services : DEFAULT_SITE_CONTENT.services,
    sterilization: {
      ...DEFAULT_SITE_CONTENT.sterilization,
      ...(data.sterilization || {}),
      steps: Array.isArray(data.sterilization?.steps) && data.sterilization.steps.length > 0
        ? data.sterilization.steps
        : DEFAULT_SITE_CONTENT.sterilization.steps,
    },
    organique: {
      ...DEFAULT_SITE_CONTENT.organique,
      ...(data.organique || {}),
      guaranteeBadges: Array.isArray(data.organique?.guaranteeBadges)
        ? data.organique.guaranteeBadges
        : DEFAULT_SITE_CONTENT.organique.guaranteeBadges,
      products: Array.isArray(data.organique?.products) && data.organique.products.length > 0
        ? data.organique.products
        : DEFAULT_SITE_CONTENT.organique.products,
    },
    safetyComparison: {
      title: data.safetyComparison?.title || DEFAULT_SITE_CONTENT.safetyComparison.title,
      subtitle: data.safetyComparison?.subtitle || DEFAULT_SITE_CONTENT.safetyComparison.subtitle,
      items: Array.isArray(data.safetyComparison?.items)
        ? data.safetyComparison.items
        : Array.isArray(data.safetyComparison)
        ? data.safetyComparison
        : DEFAULT_SITE_CONTENT.safetyComparison.items,
    },
    faq: {
      title: data.faq?.title || DEFAULT_SITE_CONTENT.faq.title,
      subtitle: data.faq?.subtitle || DEFAULT_SITE_CONTENT.faq.subtitle,
      items: Array.isArray(data.faq?.items)
        ? data.faq.items
        : Array.isArray(data.faq)
        ? data.faq
        : DEFAULT_SITE_CONTENT.faq.items,
    },
  };
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONTENT);
      if (saved) {
        return normalizeSiteContent(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not parse saved CMS content, using default', e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [bookings, setBookings] = useState<AppointmentBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse saved bookings, using default', e);
    }
    return INITIAL_BOOKINGS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY_AUTH) === 'true';
  });
  const [adminTab, setAdminTab] = useState('hero');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // Firebase integration state
  const [firebaseConfig, setFirebaseConfigState] = useState<FirebaseConfig | null>(() => getStoredFirebaseConfig());
  const [firebaseStatus, setFirebaseStatus] = useState<FirebaseConnectionStatus>({
    isConnected: false,
    projectId: null,
    lastSyncedAt: null,
    error: null,
  });

  // Verify Firebase connection and start real-time listener if active
  useEffect(() => {
    const activeConfig = firebaseConfig || getStoredFirebaseConfig();
    if (!activeConfig || !activeConfig.apiKey || !activeConfig.projectId) {
      setFirebaseStatus({
        isConnected: false,
        projectId: null,
        lastSyncedAt: null,
        error: null,
      });
      return;
    }

    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    const initFirebase = async () => {
      try {
        const testRes = await testFirebaseConnection(activeConfig);
        if (testRes.success) {
          if (isMounted) {
            setFirebaseStatus({
              isConnected: true,
              projectId: activeConfig.projectId,
              lastSyncedAt: new Date().toLocaleTimeString(),
              error: null,
            });
          }

          // Fetch initial Firestore Content
          const remoteContent = await loadSiteContentFromFirestore();
          if (remoteContent && remoteContent.brand && isMounted) {
            const normalized = normalizeSiteContent(remoteContent);
            setContent(normalized);
            localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(normalized));
          }

          // Fetch initial Firestore Bookings
          const remoteBookings = await loadBookingsFromFirestore();
          if (remoteBookings && remoteBookings.length > 0 && isMounted) {
            setBookings(remoteBookings);
            localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(remoteBookings));
          }

          // Subscribe to live updates from Firestore ONLY if connection succeeded
          const unsub = subscribeToSiteContent((liveContent) => {
            if (liveContent && liveContent.brand && isMounted) {
              const normalized = normalizeSiteContent(liveContent);
              setContent(normalized);
              localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(normalized));
              setFirebaseStatus(prev => ({ ...prev, lastSyncedAt: new Date().toLocaleTimeString() }));
            }
          });
          if (isMounted) {
            unsubscribe = unsub;
          } else if (unsub) {
            unsub();
          }
        } else {
          if (isMounted) {
            setFirebaseStatus({
              isConnected: false,
              projectId: activeConfig.projectId,
              lastSyncedAt: null,
              error: testRes.message,
            });
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setFirebaseStatus({
            isConnected: false,
            projectId: activeConfig.projectId,
            lastSyncedAt: null,
            error: err?.message || 'Firestore connection check failed',
          });
        }
      }
    };

    initFirebase();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [firebaseConfig]);

  // Save or remove Firebase configuration
  const saveFirebaseConfig = useCallback(async (config: FirebaseConfig | null) => {
    if (!config) {
      saveStoredFirebaseConfig(null);
      setFirebaseConfigState(null);
      setFirebaseStatus({
        isConnected: false,
        projectId: null,
        lastSyncedAt: null,
        error: null,
      });
      return { success: true, message: 'Firebase configuration disconnected.' };
    }

    const testRes = await testFirebaseConnection(config);
    if (testRes.success) {
      saveStoredFirebaseConfig(config);
      setFirebaseConfigState(config);
      setFirebaseStatus({
        isConnected: true,
        projectId: config.projectId,
        lastSyncedAt: new Date().toLocaleTimeString(),
        error: null,
      });
      // Push initial content
      await saveSiteContentToFirestore(content);
      return { success: true, message: `Connected successfully to Firestore Project: ${config.projectId}` };
    } else {
      setFirebaseStatus({
        isConnected: false,
        projectId: config.projectId,
        lastSyncedAt: null,
        error: testRes.message,
      });
      return { success: false, message: testRes.message };
    }
  }, [content]);

  // Test credentials without saving
  const testFirebase = useCallback(async (config: FirebaseConfig) => {
    return await testFirebaseConnection(config);
  }, []);

  // Manual push to Firestore
  const pushAllToFirestore = useCallback(async () => {
    const success = await saveSiteContentToFirestore(content);
    if (success) {
      setFirebaseStatus(prev => ({ ...prev, lastSyncedAt: new Date().toLocaleTimeString() }));
    }
    return success;
  }, [content]);

  // Manual pull from Firestore
  const pullAllFromFirestore = useCallback(async () => {
    const remote = await loadSiteContentFromFirestore();
    if (remote && remote.brand) {
      const normalized = normalizeSiteContent(remote);
      setContent(normalized);
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(normalized));
      const remoteBookings = await loadBookingsFromFirestore();
      if (remoteBookings && remoteBookings.length > 0) {
        setBookings(remoteBookings);
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(remoteBookings));
      }
      setFirebaseStatus(prev => ({ ...prev, lastSyncedAt: new Date().toLocaleTimeString() }));
      return true;
    }
    return false;
  }, []);

  const uploadImage = useCallback(async (file: File, folder?: string) => {
    return await uploadImageToStorage(file, folder);
  }, []);

  // Save content update
  const updateContent = useCallback((updater: Partial<SiteContent> | ((prev: SiteContent) => SiteContent)) => {
    setSaveStatus('saving');
    setContent((prev) => {
      const updatedRaw = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      const next = normalizeSiteContent(updatedRaw);
      try {
        localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(next));
        saveSiteContentToFirestore(next).then((ok) => {
          if (ok) {
            setFirebaseStatus(prevStatus => ({
              ...prevStatus,
              lastSyncedAt: new Date().toLocaleTimeString(),
              error: null,
            }));
          }
        });
      } catch (err) {
        console.error('Failed to save content', err);
        setSaveStatus('error');
        return next;
      }
      setSaveStatus('saved');
      return next;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all website text, images, and services back to original flyer defaults?')) {
      setContent(DEFAULT_SITE_CONTENT);
      localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(DEFAULT_SITE_CONTENT));
      saveSiteContentToFirestore(DEFAULT_SITE_CONTENT).then((ok) => {
        if (ok) {
          setFirebaseStatus(prevStatus => ({
            ...prevStatus,
            lastSyncedAt: new Date().toLocaleTimeString(),
            error: null,
          }));
        }
      });
      setSaveStatus('saved');
    }
  }, []);

  const exportContentJson = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `luxeva_coterie_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [content]);

  const importContentJson = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && (parsed.brand || parsed.services)) {
        const normalized = normalizeSiteContent(parsed);
        setContent(normalized);
        localStorage.setItem(STORAGE_KEY_CONTENT, JSON.stringify(normalized));
        saveSiteContentToFirestore(normalized).then((ok) => {
          if (ok) {
            setFirebaseStatus(prevStatus => ({
              ...prevStatus,
              lastSyncedAt: new Date().toLocaleTimeString(),
              error: null,
            }));
          }
        });
        return true;
      }
    } catch (e) {
      console.error('Import failed', e);
    }
    return false;
  }, []);

  // Bookings management
  const addBooking = useCallback(async (bookingData: Omit<AppointmentBooking, 'id' | 'createdAt' | 'status'>) => {
    let cloudId: string | null = null;
    try {
      cloudId = await createBookingInFirestore(bookingData as AppointmentBooking);
    } catch (e) {
      console.warn('Could not save booking to Firestore directly', e);
    }

    const newBooking: AppointmentBooking = {
      ...bookingData,
      id: cloudId || `bk-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setBookings(prev => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
      } catch (e) {
        console.error('Error storing booking', e);
      }
      return updated;
    });

    return newBooking;
  }, []);

  const updateBookingStatus = useCallback((id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    updateBookingInFirestore(id, { status }).catch(() => {});

    setBookings(prev => {
      const updated = prev.map(b => (b.id === id ? { ...b, status } : b));
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteBooking = useCallback((id: string) => {
    if (window.confirm('Delete this booking record?')) {
      deleteBookingInFirestore(id).catch(() => {});

      setBookings(prev => {
        const updated = prev.filter(b => b.id !== id);
        localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(updated));
        return updated;
      });
    }
  }, []);

  // Admin authentication
  const getStoredPasscode = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PASSCODE);
      if (saved && saved.trim()) {
        return saved.trim();
      }
    } catch (e) {
      console.warn('Could not read saved passcode', e);
    }
    return DEFAULT_PASSCODE;
  }, []);

  const loginAdmin = useCallback((passcode: string) => {
    const cleanPass = passcode.trim();
    const currentPasscode = getStoredPasscode();
    if (cleanPass === currentPasscode) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEY_AUTH, 'true');
      return true;
    }
    return false;
  }, [getStoredPasscode]);

  const changeAdminPasscode = useCallback((currentPass: string, newPass: string): { success: boolean; message: string } => {
    const activePass = getStoredPasscode();
    if (currentPass.trim() !== activePass) {
      return { success: false, message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง (Incorrect current passcode)' };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 4 ตัวอักษร (New passcode must be at least 4 characters)' };
    }
    try {
      localStorage.setItem(STORAGE_KEY_PASSCODE, newPass.trim());
      return { success: true, message: 'เปลี่ยนรหัสผ่านผู้ดูแลระบบสำเร็จแล้ว (Passcode changed successfully)' };
    } catch (e) {
      return { success: false, message: 'เกิดข้อผิดพลาดในการบันทึกรหัสผ่านใหม่' };
    }
  }, [getStoredPasscode]);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
  }, []);

  return (
    <CmsContext.Provider
      value={{
        content,
        updateContent,
        resetToDefaults,
        exportContentJson,
        importContentJson,
        bookings,
        addBooking,
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
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
