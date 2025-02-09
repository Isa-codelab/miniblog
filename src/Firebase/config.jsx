import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9_IFQpgqBP3EQjGo-nrYtLVYUifJkgJg",
  authDomain: "miniblog-2e5d6.firebaseapp.com",
  projectId: "miniblog-2e5d6",
  storageBucket: "miniblog-2e5d6.firebasestorage.app",
  messagingSenderId: "693707399542",
  appId: "1:693707399542:web:db5655379bffb972111a57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };