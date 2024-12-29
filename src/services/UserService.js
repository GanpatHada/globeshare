import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, storage } from "../assets/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function getCurrentUserDetails(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    let userDetails = null;
    if (docSnap.exists()) {
      userDetails = { userId: docRef.id, ...docSnap.data() };
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
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, updatedProfile);
    const updatedDoc = await getDoc(docRef);
    console.log(updatedDoc);
    return { userId, ...updatedDoc.data() };
  } catch (error) {
    throw error;
  }
}

export async function getSuggestedUser({following}) {
  try {
    const currentUserId=auth.currentUser.uid;
    const usersCollection = collection(db, "users");
    const usersQuery = query(
      usersCollection,
      where("__name__", "not-in", [currentUserId,...following]),
      orderBy("__name__")
    );
    const querySnapshot = await getDocs(usersQuery);
    const otherUsers = querySnapshot.docs.map((doc) => ({
      userId: doc.id,
      userName: doc.data().userName,
      profilePhoto: doc.data().profilePhoto,
    }));
    
    return otherUsers;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function followUser(userId, user) {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      following: arrayUnion(user)
    });
  } catch (error) {
    throw error
  }
}

export async function unfollowUser(userId,user)
{
  try {
    const docRef = doc(db,"users",userId)
    await updateDoc(docRef,{
      following:arrayRemove(user)
    });
  } catch (error) {
     throw error
  }
}
