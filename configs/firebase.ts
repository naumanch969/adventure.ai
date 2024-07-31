import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFLdTIlAzs6FFrD1_QdH--G2aSENBq9eg",
  authDomain: "ai-travel-planner-84f13.firebaseapp.com",
  projectId: "ai-travel-planner-84f13",
  storageBucket: "ai-travel-planner-84f13.appspot.com",
  messagingSenderId: "147369642215",
  appId: "1:147369642215:web:f75856a6e81fb7d76bba42",
  measurementId: "G-F0J9BZ177H"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app)

export const tripCollection = collection(db, 'trips')