import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXjlvSICxY4UBmI47ORV-BSRStqYwRW9E",
  authDomain: "fir-auth-45ca4.firebaseapp.com",
  projectId: "fir-auth-45ca4",
  storageBucket: "fir-auth-45ca4.firebasestorage.app",
  messagingSenderId: "493592662489",
  appId: "1:493592662489:web:223370104f94d9003a89c8",
  measurementId: "G-6M4VC3K9PF"
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export default firebaseApp;
