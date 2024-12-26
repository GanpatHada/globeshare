import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../assets/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function getCurrentUserDetails(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    let userDetails = false;
    if (docSnap.exists()) {
      userDetails = docSnap.data();
    }
    return userDetails;
  } catch (error) {
    throw error;
  }
}

export async function isUserNameAvialable(userName, myUserName) {
  if (userName.trim() === myUserName) return true;
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("userName", "==", userName.trim()))
    );
    return querySnapshot.empty;
  } catch (error) {
    throw error;
  }
}

export async function saveProfilePhoto(porfilePhotoUrl) {
  try {
    const storageRef = ref(storage, `profile-photos/${porfilePhotoUrl.name}`);
    const snapshot = await uploadBytes(storageRef, porfilePhotoUrl);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    throw error;
  }
}

export async function updateProfile(userId, updatedProfile) {
  const docRef = doc(db, "users", userId);
  try {
    await updateDoc(docRef, updatedProfile);
    const updatedDoc = await getDoc(docRef);
    console.log(updatedDoc);
    return { userId, ...updatedDoc.data() };
  } catch (error) {
    throw error;
  }
}
