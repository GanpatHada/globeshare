import { doc, getDoc } from "firebase/firestore";
import { db } from "../assets/Firebase";

export async function fetchCurrentUserDetails(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    const userDetails=false;
    if (docSnap.exists()) {
      userDetails=docSnap.data();
    }
    return userDetails;
  } catch (error) {
    throw error;
  }
}
