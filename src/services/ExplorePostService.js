import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../assets/Firebase";

export async function getExplorePosts() {
  let posts = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  posts = querySnapshot.docs.map((doc) => ({
    postId: doc.id,
    ...doc.data(),
  }));
  return posts;
}

export async function getUserPosts(userId) {
  let posts = [];

  try {
    const querySnapshot = await getDocs(
      query(collection(db, "posts"),where("user", "==", userId))
      
    );
    posts = querySnapshot.docs.map((doc) => ({
      postId: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched documents:", posts);
    return posts;
  } catch (error) {
    throw error;
  }
}
