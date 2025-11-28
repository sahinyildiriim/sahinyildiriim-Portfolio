import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6ieL5oQQR8Eb3pFue76n9wp8b1NUJEyI",
  authDomain: "portofolio-b3f92.firebaseapp.com",
  projectId: "portofolio-b3f92",
  storageBucket: "portofolio-b3f92.appspot.com",
  messagingSenderId: "549651499197",
  appId: "1:549651499197:web:28dad02c1adb0fd2a24fd4",
  measurementId: "G-570L52SLW5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, analytics, auth }; 