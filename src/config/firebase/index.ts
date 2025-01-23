import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAx_knJ_qqxPkJQ_xoIZnxt_c6gb6Wdys",
  authDomain: "todoapp-eeeb7.firebaseapp.com",
  projectId: "todoapp-eeeb7",
  storageBucket: "todoapp-eeeb7.appspot.com",
  messagingSenderId: "1072574112522",
  appId: "1:1072574112522:web:65fc4e184aed9894dc90f3",
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export default firebaseApp;
