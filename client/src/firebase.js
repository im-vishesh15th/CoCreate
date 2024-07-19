// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAiSs6Ckt7UZkmNvwJXYqshKfyDj3zmXjs",
  authDomain: "docs-clone-2447d.firebaseapp.com",
  projectId: "docs-clone-2447d",
  storageBucket: "docs-clone-2447d.appspot.com",
  messagingSenderId: "1013362966586",
  appId: "1:1013362966586:web:642f68ec6392e1caa67503"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };