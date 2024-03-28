import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // import for Firestore

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "chat-app-react-project.firebaseapp.com",
  projectId: "chat-app-react-project",
  storageBucket: "chat-app-react-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);
