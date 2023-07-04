import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3tUnl3c7sAiBNMhifeW3bL0Ci6CA1yL0",
    authDomain: "globeshare-bb494.firebaseapp.com",
    projectId: "globeshare-bb494",
    storageBucket: "globeshare-bb494.appspot.com",
    messagingSenderId: "655116635619",
    appId: "1:655116635619:web:c9febb1a5e1065421f64d6",
    measurementId: "G-0LZL77TSHQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
