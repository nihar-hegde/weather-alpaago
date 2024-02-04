// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

interface IUser {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  uid: string;
  status?: string;
}

export const addUserToDb = async (user: IUser) => {
  const { uid } = user;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return;
  } else {
    try {
      await setDoc(docRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        status: "inactive",
        createdAt: serverTimestamp(),
      });
      console.log("User Document written to DB: ", uid);
    } catch (error: any) {
      if (error.code === "auth/invalid-uid") {
        console.error("Invalid UID provided.");
      } else {
        console.error("Error while writing user to DB:", error);
      }
    }
  }
};

export { app, auth, db };
