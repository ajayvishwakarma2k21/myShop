import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Helper to strip accidental quotes from environment variables
const clean = (val) => val ? val.replace(/^["'](.+)["']$/, '$1') : val;

// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: clean(import.meta.env.VITE_FIREBASE_API_KEY) || "AIzaSyDummyKeyForDevelopmentPurposes",
  authDomain: clean(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN) || "your-project.firebaseapp.com",
  projectId: clean(import.meta.env.VITE_FIREBASE_PROJECT_ID) || "your-project",
  storageBucket: clean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET) || "your-project.appspot.com",
  messagingSenderId: clean(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID) || "123456789",
  appId: clean(import.meta.env.VITE_FIREBASE_APP_ID) || "1:123456789:web:dummy123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Auth Providers
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Firebase Auth Error:", error.code);
    console.error("Error Message:", error.message);
    
    if (error.code === 'auth/unauthorized-domain') {
      console.error("CRITICAL: This domain is not authorized in Firebase. Please add it to 'Authorized Domains' in Firebase Console.");
    }
    
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out", error);
    throw error;
  }
};
