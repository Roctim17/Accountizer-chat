
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCe85vgFsauhTd0b11GGfD5tjoR2R-gIxc",
  authDomain: "accountizer.firebaseapp.com",
  projectId: "accountizer",
  storageBucket: "accountizer.appspot.com",
  messagingSenderId: "99558010768",
  appId: "1:99558010768:web:8a437c0de520c0ae26cd15"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()