import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../assets/Firebase";
import { arrayRemove, arrayUnion, collection, doc, getDocs, limit, query, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const navigate=useNavigate()
  //states here
  const [user,setUser]=useState({});
  const [randomUsers,setRandomUsers]=useState([])
  const[userDetails,setUserDetails]=useState(null)
  useEffect(() => {
    
    const unsub=onAuthStateChanged(auth,user=>{
        setUser(user);
   })
    return () => {
      unsub();
    }
  }, [])


  const getSomeRandomUsers=async()=>{
    try {
    let randomUsers=[]
    const q = query(collection(db, "users"), limit(6));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      if(doc.id!==user.uid)
         randomUsers.push({...doc.data(),userId:doc.id})
    });
    setRandomUsers(randomUsers)
    } catch (error) {
      toast.error('!Something went wrong while fetching Users')
    }
  }


  const isPostBookmarked=(postId)=>{
    return userDetails.bookmarks.includes(postId)
  }

  const handleBookmarkInServer=async(postId)=>{
    try {
      
      const userRef = doc(db, "users", user.uid );
      await updateDoc(userRef, {
        bookmarks:isPostBookmarked(postId)?arrayRemove(postId):arrayUnion(postId)
      });
      isPostBookmarked(postId)?toast.success('Post has been removed from bookmarks'):toast.success('Post has been saved to bookmarks')
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


  const followBackUser=async(userId,setLoading)=>{
    setLoading(true)
    try {
      const myRef = doc(db, "users", user.uid );
      const userRef = doc(db, "users", userId );
      await updateDoc(myRef, { 
        following:arrayUnion(userId)
      });
      await updateDoc(userRef, {
        followers:arrayUnion(user.uid)
      });
      setUserDetails({...userDetails,following:[...userDetails.following,userId]})
      const userName=randomUsers.find(user=>user.userId===userId).userName;
      toast.success(`Started following ${userName} `)
    } catch (error) {
      toast.error("!Something went wrong,Couldn't follow back")
    }
    finally
    {
      setLoading(false)
    }

  }

  const followUser=async(userId,setLoading)=>{
    try {
      setLoading(true)
      const myRef = doc(db, "users", user.uid );
      const userRef=doc(db,'users',userId)
      await updateDoc(myRef, {
        following:arrayUnion(userId)
      });
      await updateDoc(userRef, {
        followers:arrayUnion(user.uid)
      });
      setUserDetails({...userDetails,following:[...userDetails.following,userId]})
      const userName=randomUsers.find(user=>user.userId===userId).userName;
      toast.success(`Started following ${userName} `)
    } catch (error) {
      toast.error("!Something went wrong,Couldn't follow")
    }
    finally{
      setLoading(false)
    }
  }

  const unFollowUser=async(userId,setLoading)=>{
    try {
      setLoading(true);
      const myRef = doc(db, "users", user.uid );
      const userRef = doc(db, "users", userId );
      await updateDoc(myRef, {
        following:arrayRemove(userId)
      });
      await updateDoc(userRef, {
        followers:arrayRemove(user.uid)
      });
      setUserDetails({...userDetails,following:userDetails.following.filter(ids=>ids!==userId)})
      const userName=randomUsers.find(user=>user.userId===userId).userName;
      toast.success(`You unfollowed ${userName}`)
    } catch (error) {
      toast.error("!Something went wrong,Couldn't unfollow")
    }
    finally{
      setLoading(false)
    }
  }

  const logOut=async()=>{
      try{
        await signOut(auth);
        toast.success('Logged out successfully')
        navigate('/login')
      }
      catch(error){
        console.log(error)
      }
    }
  



  return (
    <UserContext.Provider
      value={{
        user,
        userDetails,setUserDetails,handleBookmarkInServer,isPostBookmarked,getSomeRandomUsers,randomUsers,followUser,unFollowUser,followBackUser,logOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
