import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAVzk_obGEuWmHudzOp4pkUM4h8xXHYErM",
  authDomain: "liberte-construction.firebaseapp.com",
  projectId: "liberte-construction",
  storageBucket: "liberte-construction.firebasestorage.app",
  messagingSenderId: "824135512478",
  appId: "1:824135512478:web:db2da249e33df5ef41e68f",
  measurementId: "G-DSPKC8G2XK",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
