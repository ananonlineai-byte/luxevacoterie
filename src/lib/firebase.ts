import { initializeApp, getApps, getApp, deleteApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import {
  getStorage,
  FirebaseStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { FirebaseConfig, SiteContent, AppointmentBooking } from '../types';

const STORAGE_KEY_FIREBASE_CONFIG = 'luxeva_coterie_firebase_config_v1';

let cachedApp: FirebaseApp | null = null;
let cachedDb: Firestore | null = null;
let cachedStorage: FirebaseStorage | null = null;

// Helper to run promises with a strict timeout
function withTimeout<T>(promise: Promise<T>, timeoutMs = 6000, errorMsg = 'Operation timed out'): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMsg)), timeoutMs)
    ),
  ]);
}

// Get current saved or environment config
export function getStoredFirebaseConfig(): FirebaseConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FIREBASE_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.projectId && parsed.apiKey) {
        return parsed;
      }
    }
  } catch (e) {
    // silent fallback
  }

  // Check if env variables are present
  const metaEnv = (import.meta as any).env || {};
  const envApiKey = metaEnv.VITE_FIREBASE_API_KEY;
  const envProjectId = metaEnv.VITE_FIREBASE_PROJECT_ID;
  if (envApiKey && envProjectId) {
    return {
      apiKey: envApiKey,
      authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || `${envProjectId}.firebaseapp.com`,
      projectId: envProjectId,
      storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || `${envProjectId}.appspot.com`,
      messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: metaEnv.VITE_FIREBASE_APP_ID || '',
    };
  }

  return null;
}

export function saveStoredFirebaseConfig(config: FirebaseConfig | null): void {
  if (!config) {
    localStorage.removeItem(STORAGE_KEY_FIREBASE_CONFIG);
    cachedApp = null;
    cachedDb = null;
    cachedStorage = null;
    return;
  }
  localStorage.setItem(STORAGE_KEY_FIREBASE_CONFIG, JSON.stringify(config));
  cachedApp = null;
  cachedDb = null;
  cachedStorage = null;
}

// Initialize or get Firebase instances safely
export function getFirebaseInstance(config?: FirebaseConfig | null): { app: FirebaseApp; db: Firestore; storage: FirebaseStorage } | null {
  const activeConfig = config || getStoredFirebaseConfig();
  if (!activeConfig || !activeConfig.apiKey || !activeConfig.projectId) {
    return null;
  }

  try {
    const existingApps = getApps();
    const appName = `luxeva-${activeConfig.projectId}`;
    let app: FirebaseApp;
    
    const matched = existingApps.find(a => a.name === appName || a.name === '[DEFAULT]');
    if (matched) {
      app = matched;
    } else {
      app = initializeApp(activeConfig, appName);
    }

    const db = getFirestore(app);
    const storage = getStorage(app);
    cachedApp = app;
    cachedDb = db;
    cachedStorage = storage;
    return { app, db, storage };
  } catch (err) {
    return null;
  }
}

function buildSafeStorageName(file: File): string {
  const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const baseName = file.name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'image';

  return `${Date.now()}-${baseName}.${extension}`;
}

function getCloudinaryConfig(): { cloudName: string; uploadPreset: string } | null {
  const metaEnv = (import.meta as any).env || {};
  const cloudName = metaEnv.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = metaEnv.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (cloudName && uploadPreset) {
    return { cloudName, uploadPreset };
  }

  return null;
}

async function uploadImageToCloudinary(file: File, folder = 'cms'): Promise<string> {
  const config = getCloudinaryConfig();
  if (!config) {
    throw new Error('Cloudinary is not configured.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', config.uploadPreset);
  formData.append('folder', `luxeva-coterie/${folder}`);

  const response = await withTimeout(
    fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    }),
    20000,
    'Cloudinary upload timed out. Please try a smaller image.'
  );

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || 'Cloudinary upload failed. Check cloud name and unsigned upload preset.');
  }

  const data = await response.json();
  if (!data.secure_url) {
    throw new Error('Cloudinary upload finished without a secure URL.');
  }

  return data.secure_url as string;
}

// Upload an admin-selected image and return a URL. Prefer Cloudinary free-tier unsigned upload.
// Firebase Storage remains as an optional fallback for Blaze projects.
export async function uploadImageToStorage(file: File, folder = 'cms'): Promise<string> {
  if (getCloudinaryConfig()) {
    return uploadImageToCloudinary(file, folder);
  }

  const fb = getFirebaseInstance();
  if (!fb) {
    throw new Error('No cloud image storage configured. Add Cloudinary env vars, or use Image Link.');
  }
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files are supported.');
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image is too large. Please upload an image under 5 MB.');
  }

  const cleanFolder = folder.replace(/[^a-z0-9/_-]/gi, '').replace(/^\/+|\/+$/g, '') || 'cms';
  const path = `luxeva_uploads/${cleanFolder}/${buildSafeStorageName(file)}`;
  const imageRef = storageRef(fb.storage, path);

  await withTimeout(
    uploadBytes(imageRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    }),
    20000,
    'Image upload timed out. Please try a smaller image or check Firebase Storage rules.'
  );

  return await withTimeout(
    getDownloadURL(imageRef),
    8000,
    'Uploaded image, but could not create download URL.'
  );
}

// Test Firebase connection with timeout and test app cleanup
export async function testFirebaseConnection(config: FirebaseConfig): Promise<{ success: boolean; message: string }> {
  if (!config || !config.apiKey || !config.projectId) {
    return { success: false, message: 'Missing API Key or Project ID' };
  }

  let testApp: FirebaseApp | null = null;
  try {
    const appName = `test-${Date.now()}`;
    testApp = initializeApp(config, appName);
    const testDb = getFirestore(testApp);

    // Try a ping write & read to a healthcheck document with 5-second timeout
    const pingRef = doc(testDb, 'luxeva_system', 'ping');
    await withTimeout(
      setDoc(pingRef, { timestamp: new Date().toISOString(), status: 'connected' }, { merge: true }),
      5000,
      'Connection timed out. Please check your network and Firestore rules.'
    );
    
    if (testApp) {
      await deleteApp(testApp).catch(() => {});
    }

    return { success: true, message: `Connected successfully to Firestore Project: ${config.projectId}` };
  } catch (err: any) {
    if (testApp) {
      await deleteApp(testApp).catch(() => {});
    }
    return {
      success: false,
      message: err?.message || 'Connection unavailable. Ensure Firestore database is created and security rules allow read/write.',
    };
  }
}

// Sync content to Firestore with timeout
export async function saveSiteContentToFirestore(content: SiteContent): Promise<boolean> {
  const fb = getFirebaseInstance();
  if (!fb) return false;

  try {
    const contentRef = doc(fb.db, 'luxeva_cms', 'site_content');
    await withTimeout(
      setDoc(contentRef, {
        ...content,
        updatedAt: new Date().toISOString(),
      }, { merge: true }),
      6000
    );
    return true;
  } catch (err) {
    return false;
  }
}

// Load content from Firestore with timeout
export async function loadSiteContentFromFirestore(): Promise<SiteContent | null> {
  const fb = getFirebaseInstance();
  if (!fb) return null;

  try {
    const contentRef = doc(fb.db, 'luxeva_cms', 'site_content');
    const snap = await withTimeout(getDoc(contentRef), 5000);
    if (snap && snap.exists()) {
      return snap.data() as SiteContent;
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Subscribe to real-time content changes from Firestore
export function subscribeToSiteContent(onUpdate: (content: SiteContent) => void): Unsubscribe | null {
  const fb = getFirebaseInstance();
  if (!fb) return null;

  try {
    const contentRef = doc(fb.db, 'luxeva_cms', 'site_content');
    return onSnapshot(contentRef, {
      next: (docSnap) => {
        if (docSnap.exists()) {
          onUpdate(docSnap.data() as SiteContent);
        }
      },
      error: () => {
        // Handle error silently without polluting console
      }
    });
  } catch (err) {
    return null;
  }
}

// Save VIP Booking to Firestore
export async function createBookingInFirestore(booking: AppointmentBooking): Promise<string | null> {
  const fb = getFirebaseInstance();
  if (!fb) return null;

  try {
    const bookingsCol = collection(fb.db, 'luxeva_bookings');
    const docRef = await withTimeout(
      addDoc(bookingsCol, {
        ...booking,
        createdAt: booking.createdAt || new Date().toISOString(),
        status: booking.status || 'pending',
      }),
      5000
    );
    return docRef ? docRef.id : null;
  } catch (err) {
    return null;
  }
}

// Load all bookings from Firestore
export async function loadBookingsFromFirestore(): Promise<AppointmentBooking[]> {
  const fb = getFirebaseInstance();
  if (!fb) return [];

  try {
    const bookingsCol = collection(fb.db, 'luxeva_bookings');
    const q = query(bookingsCol, orderBy('createdAt', 'desc'));
    const querySnapshot = await withTimeout(getDocs(q), 5000);
    
    if (!querySnapshot) return [];
    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    } as AppointmentBooking));
  } catch (err) {
    return [];
  }
}

// Update booking status in Firestore
export async function updateBookingInFirestore(bookingId: string, updates: Partial<AppointmentBooking>): Promise<boolean> {
  const fb = getFirebaseInstance();
  if (!fb) return false;

  try {
    const bookingRef = doc(fb.db, 'luxeva_bookings', bookingId);
    await withTimeout(updateDoc(bookingRef, updates), 4000);
    return true;
  } catch (err) {
    return false;
  }
}

// Delete booking from Firestore
export async function deleteBookingInFirestore(bookingId: string): Promise<boolean> {
  const fb = getFirebaseInstance();
  if (!fb) return false;

  try {
    const bookingRef = doc(fb.db, 'luxeva_bookings', bookingId);
    await withTimeout(deleteDoc(bookingRef), 4000);
    return true;
  } catch (err) {
    return false;
  }
}
