import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../assets/Firebase";

export async function fetchFeed(followings) {
  try {
    const q = query(collection(db, "posts"), where("user", "in", followings));
    const postList = await getDocs(q);
    let myFollowingsPosts = [];
    postList.forEach((post) => {
      myFollowingsPosts.push({ ...post.data(), postId: post.id });
    });
    return myFollowingsPosts;
  } catch (error) {
    throw error;
  }
}

export async function fetchExploringPosts({ following }) {
  let exploringPosts = [];
  try {
    const docSnap = await getDocs(collection(db, "posts"));
    if (!docSnap.empty) {
      exploringPosts = docSnap.docs.map((post) => {
        return { postId: post.id, ...post.data() };
      });
    }
    return exploringPosts;
  } catch (error) {}
}

export async function getPostDetails(postId) {
  try {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (!docSnap) return null;
    return { postId, ...docSnap.data() };
  } catch (error) {
    throw error;
  }
}
