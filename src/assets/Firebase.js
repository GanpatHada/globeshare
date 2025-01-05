import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage,ref} from "firebase/storage";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "globeshare-bb494.firebaseapp.com",
    projectId: "globeshare-bb494",
    storageBucket: "globeshare-bb494.appspot.com",
    messagingSenderId: "655116635619",
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: "G-0LZL77TSHQ"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth = getAuth(app,{
    persistence: browserLocalPersistence
  });

export const storage = getStorage(app);
export const imageRef=ref(storage);
