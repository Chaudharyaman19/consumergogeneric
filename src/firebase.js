import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgw_QBvsF94T3_PtxVy8VBVDX_-mBMwQU",
  authDomain: "running-f9d57.firebaseapp.com",
  projectId: "running-f9d57",
  storageBucket: "running-f9d57.firebasestorage.app",
  messagingSenderId: "219524855610",
  appId: "1:219524855610:web:9713d299d66e0561afc203",
  measurementId: "G-P90BN5MQ8B",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
