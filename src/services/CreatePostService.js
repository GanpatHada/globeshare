import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../assets/Firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

export async function savePostData(userId, images, caption) {
  let imageURLs = [];
  for (let image of images) {
    const storageRef = ref(storage, `${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    imageURLs.push(downloadUrl);
  }
  const docRef = await addDoc(collection(db, "posts"), {
    user: userId,
    caption: caption,
    images: imageURLs,
    likes: [],
    comments: [],
    time: Date.now(),
  });
  const addedPost=await getDoc(doc(db, "posts", docRef.id))
  return {postId:docRef.id,...addedPost.data()}
}
