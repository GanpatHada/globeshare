import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../assets/Firebase";

export async function fetchMyFollowingsPosts(myFollowings){
    try {
      const q = query(collection(db,'posts'), where('user', 'in', myFollowings));
      const postList = await getDocs(q);
      let myFollowingsPosts = [];
      postList.forEach((post) => {
        myFollowingsPosts.push({ ...post.data(), postId: post.id });
      });
      return myFollowingsPosts
    } catch (error) {
      throw error;
    } 
};