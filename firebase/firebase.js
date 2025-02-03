import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import store from '@/store';
import { setRole } from '@/store/slices';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

// Set persistence so the user remains logged in
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Auth persistence enabled');
  })
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

// Enhanced auth state listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      // Get the user's token result to check claims/role
      const tokenResult = await user.getIdTokenResult();
      const role = tokenResult.claims.role || 'guest';
      
      // Get terminals from Redux store
      const state = store.getState();
      if (state.terminals && state.terminals.terminals) {
        state.terminals.terminals.forEach(terminal => {
          store.dispatch(setRole({
            terminalId: terminal.id,
            role: role
          }));
        });
      }
    } catch (error) {
      console.error('Error updating roles:', error);
    }
  } else {
    // Sign in anonymously if no user exists
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Anonymous sign-in error:', error);
    }
  }
});

export { db, auth, functions };