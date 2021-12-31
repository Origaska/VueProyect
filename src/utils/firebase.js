import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyBZG14YpnPBRoFTB6PUl49t4b0NZyUC8Go",
  authDomain: "web-vue-2f807.firebaseapp.com",
  databaseURL: "https://web-vue-2f807-default-rtdb.firebaseio.com",
  projectId: "web-vue-2f807",
  storageBucket: "web-vue-2f807.appspot.com",
  messagingSenderId: "1055109445742",
  appId: "1:1055109445742:web:f898e6437c739fb02bce7f",
  measurementId: "G-Q4LEW7E82B"
};

firebase.initializeApp(firebaseConfig);
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };