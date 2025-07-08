import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDEYurJOhPFmCXxdkx4I1k9C2in5mqpp0",
  authDomain: "floral-f96a3.firebaseapp.com",
  projectId: "floral-f96a3",
  storageBucket: "floral-f96a3.firebasestorage.app",
  messagingSenderId: "258547685145",
  appId: "1:258547685145:web:08ae6337451c86710c9788",
  measurementId: "G-L8W0EFMBB8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;