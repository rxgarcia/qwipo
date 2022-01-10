import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";
import {useFirestoreEmulator as applyFirestoreEmulator} from 'firebase/firestore';
import { getAuth, useAuthEmulator as applyAuthEmulator} from "firebase/auth";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  databaseURL: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  messagingSenderId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
};

// auth imports
initializeApp(firebaseConfig);

const db = getFirestore();
export const auth = getAuth();

// applyFirestoreEmulator(db, 'localhost', 8080);
// applyAuthEmulator(auth, 'http://localhost:9099', 9099);


export default db;