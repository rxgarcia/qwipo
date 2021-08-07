import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";
import {useFirestoreEmulator as applyFirestoreEmulator} from 'firebase/firestore';
import { getAuth, useAuthEmulator as applyAuthEmulator} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqs0MTeO0Lh1PC75JPuQh_Louw0RrsanA",
  authDomain: "react-http-tutorial-a99e8.firebaseapp.com",
  databaseURL: "https://react-http-tutorial-a99e8-default-rtdb.firebaseio.com",
  projectId: "react-http-tutorial-a99e8",
  storageBucket: "react-http-tutorial-a99e8.appspot.com",
  messagingSenderId: "347451132845",
  appId: "1:347451132845:web:e1113af13dd4c8bb5cef24",
};

// auth imports
initializeApp(firebaseConfig);

const db = getFirestore();
export const auth = getAuth();

applyFirestoreEmulator(db, 'localhost', 8080);
applyAuthEmulator(auth, 'http://localhost:9099', 9099);


export default db;