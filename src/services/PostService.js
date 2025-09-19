import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../assets/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function createPost(userId, images, caption) {
  try {
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
    const addedPost = await getDoc(doc(db, "posts", docRef.id));
    return { postId: docRef.id, ...addedPost.data() };
  } catch (error) {
    throw error;
  }
}

export async function editPost(postId, images, caption) {
  try {
    let imageURLs = [];
    for (let image of images) {
      if (typeof image === "string") imageURLs.push(image);
      else {
        const storageRef = ref(storage, `${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        imageURLs.push(downloadUrl);
      }
    }
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      images: imageURLs,
      caption,
      time: Date.now(),
    });
    const updatedPost = await getDoc(docRef);
    if (updatedPost.exists()) 
      return { postId: docRef.id, ...updatedPost.data() };
    return false;
  } catch (error) {
    throw error;
  }
}

export async function fetchFeed({ following }) {
  try {
    let myFollowingsPosts = [];
    if (following.length === 0) return myFollowingsPosts;
    const q = query(collection(db, "posts"), where("user", "in", following));
    const postList = await getDocs(q);
    postList.forEach((post) => {
      myFollowingsPosts.push({ ...post.data(), postId: post.id });
    });
    return myFollowingsPosts;
  } catch (error) {
    throw error;
  }
}

export async function fetchExploringPosts(userIdSToExclude) {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("user", "not-in", userIdSToExclude));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ postId: doc.id, ...doc.data() });
    });

    return posts;
  } catch (error) {}
}

export async function fetchUserPosts(userId) {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("user", "==", userId));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ postId: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    throw error;
  }
}

export async function fetchMyBookmarks(bookmarks) {
  try {
    const posts = [];
    if (bookmarks.length === 0) return posts;
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("__name__", "in", bookmarks),
      orderBy("__name__")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      posts.push({ postId: doc.id, ...doc.data() });
    });
    return posts;
  } catch (error) {
    throw error;
  }
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

export async function likePost(userId, postId) {
  try {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      likes: arrayUnion(userId),
    });
  } catch (error) {
    throw error;
  }
}

export async function unlikePost(userId, postId) {
  try {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      likes: arrayRemove(userId),
    });
  } catch (error) {
    throw error;
  }
}

export async function commentOnPost(postId, comment) {
  try {
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, {
      comments: arrayUnion(comment),
    });
  } catch (error) {
    
  }
}

export async function deletePost(postId) {
  try {
    const docRef = doc(db, "posts", postId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
}
