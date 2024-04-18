import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const API_KEY= import.meta.env.VITE_Firebase_API_KEY;

const firebaseConfig = {
  apiKey:  API_KEY,
  authDomain: "cryptohub-fe600.firebaseapp.com",
  projectId: "cryptohub-fe600",
  storageBucket: "cryptohub-fe600.appspot.com",
  messagingSenderId: "646405638899",
  appId: "1:646405638899:web:580957bebd01548660c586",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDb = getFirestore(app);
export { auth, fireDb };

