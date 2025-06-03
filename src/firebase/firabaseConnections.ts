
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAjIuJTr1KKh1bd5mSuV0jTA1AuV6VUhc8",
  authDomain: "reactlinktree-c1d08.firebaseapp.com",
  projectId: "reactlinktree-c1d08",
  storageBucket: "reactlinktree-c1d08.firebasestorage.app",
  messagingSenderId: "1056549153067",
  appId: "1:1056549153067:web:10e188f38a99d90ed83d6e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)

export { auth, firestore };