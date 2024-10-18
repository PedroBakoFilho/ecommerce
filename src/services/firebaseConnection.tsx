import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyfd81OYaqnDGRsdWE6grz3OYKkeTiimg",
  authDomain: "webcommerce-f052d.firebaseapp.com",
  projectId: "webcommerce-f052d",
  storageBucket: "webcommerce-f052d.appspot.com",
  messagingSenderId: "403500066933",
  appId: "1:403500066933:web:0425dce1e55fbe96bcb03c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage}