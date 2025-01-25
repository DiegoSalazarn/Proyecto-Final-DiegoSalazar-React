import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6lIyG8tlXoNH-LTKVRZWoj8JjsygwAmY",
  authDomain: "proyecto-final-diegosalazar.firebaseapp.com",
  projectId: "proyecto-final-diegosalazar",
  storageBucket: "proyecto-final-diegosalazar.appspot.com",
  messagingSenderId: "132786384106",
  appId: "1:132786384106:web:65e81d47c3832ca5c87b93",
  measurementId: "G-XW4VJFLS1X"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

