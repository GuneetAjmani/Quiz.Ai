import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXVX_L9KNE3JEZx1YC1QYD1jvp6cW6BaE",
  authDomain: "quiz-app-stackblitz.firebaseapp.com",
  projectId: "quiz-app-stackblitz",
  storageBucket: "quiz-app-stackblitz.appspot.com",
  messagingSenderId: "339876453212",
  appId: "1:339876453212:web:8f12345678901234567890"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);