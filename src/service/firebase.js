import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const config = {
  apiKey: "AIzaSyAlj-rxzLVepL6HI4vlsUuMg-1iJrwr8HI",
  authDomain: "barrysnotesonbarovia.firebaseapp.com",
  projectId: "barrysnotesonbarovia",
  storageBucket: "barrysnotesonbarovia.appspot.com",
  messagingSenderId: "268177095287",
  appId: "1:268177095287:web:cb3ca7011565dfd3c1a472",
  measurementId: "G-H8VQC866XL"
};

const firebase = initializeApp(config);

export const firestore = getFirestore(firebase);
export const storage = getStorage(firebase);
