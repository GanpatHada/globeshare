import { initializeApp } from 'firebase/app';
import { browserLocalPersistence, getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage,ref} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyC3tUnl3c7sAiBNMhifeW3bL0Ci6CA1yL0",
    authDomain: "globeshare-bb494.firebaseapp.com",
    projectId: "globeshare-bb494",
    storageBucket: "globeshare-bb494.appspot.com",
    messagingSenderId: "655116635619",
    appId: "1:655116635619:web:c9febb1a5e1065421f64d6",
    measurementId: "G-0LZL77TSHQ"
};

// const firebaseConfig={
//   apiKey: "AIzaSyALEs4O1wD7mgS3mjYjZVRMimwH9EBb-h4",
//   authDomain: "globeshare2.firebaseapp.com",
//   projectId: "globeshare2",
//   storageBucket: "globeshare2.appspot.com",
//   messagingSenderId: "768022232351",
//   appId: "1:768022232351:web:8f84f81bef952138d8042a",
//   measurementId: "G-YGWJX0NEC2"
// }

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth = getAuth(app,{
    persistence: browserLocalPersistence
  });

export const storage = getStorage(app);
export const imageRef=ref(storage);
