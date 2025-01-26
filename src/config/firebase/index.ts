import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOQ3vVW8j_cVVTihDwq_RN779CLu0URu8",
  authDomain: "test-next-83318.firebaseapp.com",
  projectId: "test-next-83318",
  storageBucket: "test-next-83318.firebasestorage.app",
  messagingSenderId: "848331313872",
  appId: "1:848331313872:web:7173d2f76a26f1634c84d5",
  measurementId: "G-RMBKRLKTGK"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export default firebaseApp;
