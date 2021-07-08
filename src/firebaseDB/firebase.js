import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";
import {useFirestoreEmulator as applyFirestoreEmulator} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqs0MTeO0Lh1PC75JPuQh_Louw0RrsanA",
  authDomain: "react-http-tutorial-a99e8.firebaseapp.com",
  databaseURL: "https://react-http-tutorial-a99e8-default-rtdb.firebaseio.com",
  projectId: "react-http-tutorial-a99e8",
  storageBucket: "react-http-tutorial-a99e8.appspot.com",
  messagingSenderId: "347451132845",
  appId: "1:347451132845:web:e1113af13dd4c8bb5cef24",
};

initializeApp(firebaseConfig);
const db = getFirestore();
applyFirestoreEmulator(db, 'localhost', 8080);

export default db;