import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHI6yL2lGg7y69lLoaO8gatgzd6bBrBT4",
  authDomain: "the-exim-roof-jmgsq.firebaseapp.com",
  projectId: "the-exim-roof-jmgsq",
  storageBucket: "the-exim-roof-jmgsq.firebasestorage.app",
  messagingSenderId: "672965668480",
  appId: "1:672965668480:web:d6ca1ef2b7ce001538c065"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
