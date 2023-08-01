import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../assets/Firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export const UserContext = createContext();
export function UserProvider({ children }) {
  //states here
  const [user,setUser]=useState({});
  const[userDetails,setUserDetails]=useState(null)
  useEffect(() => {
    
    const unsub=onAuthStateChanged(auth,user=>{
        setUser(user);
   })
    return () => {
      unsub();
    }
  }, [])


  const isPostBookmarked=(postId)=>{
    return userDetails.bookmarks.includes(postId)
  }

  const handleBookmarkInServer=async(postId)=>{
    try {
      
      const userRef = doc(db, "users", user.uid );
      await updateDoc(userRef, {
        bookmarks:isPostBookmarked(postId)?arrayRemove(postId):arrayUnion(postId)
      });
      toast.success('Post has been saved')
      handleBookmarksInClient(postId);
    } catch (error) {
      console.log(error)
      
    }  
  }
  
  const handleBookmarksInClient=(postId)=>{
     
     if(isPostBookmarked(postId))
        setUserDetails({...userDetails,bookmarks:userDetails.bookmarks.filter(bookmark=>bookmark!==postId)})
     else
        setUserDetails({...userDetails,bookmarks:[...userDetails.bookmarks,postId]}) 
  }



  return (
    <UserContext.Provider
      value={{
        user,
        userDetails,setUserDetails,handleBookmarkInServer,isPostBookmarked
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
