import { collection, getDocs } from "firebase/firestore";
import { db } from "../assets/Firebase";

export async function getFeed() {
  let feedList =[]
  const querySnapshot = await getDocs(collection(db, "posts"));
  feedList = querySnapshot.docs.map((doc) => ({
          postId: doc.id,
          ...doc.data(),
        }));
   return feedList;
}
