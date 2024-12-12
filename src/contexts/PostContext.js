import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../assets/Firebase";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

export const PostContext = createContext();
export function PostProvider({ children }) {
  //states here
  const{user}=useContext(UserContext)
  const [posts, setPosts] = useState([]);
  const [postFilter,setPostFilter]=useState('LATEST-FIRST')
  const handleLikesInServer=async(postId,action)=>{
      try {
        const postRef = doc(db, "posts", postId );
        await updateDoc(postRef, {
          likes: action==='UNLIKE'?arrayRemove(user.uid):arrayUnion(user.uid)
        });
        return handleLikesinClient(postId,action,user.uid) 
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong!')
      }    
  }
  
  const isLiked=(userId,postId)=>posts.find((post)=>post.postId===postId).likes.includes(userId)


  const handleLikesinClient = (postId, action, userId) => {
    const tempPosts = posts.map((post) => {
      if (post.postId === postId) {
        let likeArray = post.likes;
        if (action === "LIKE") likeArray = [...likeArray, userId];
        if (action === "UNLIKE")
          likeArray = likeArray.filter((like) => like !== userId);
        return { ...post, likes: likeArray };
      } else return { ...post };
    });

    setPosts(tempPosts);
  };
  

  const handleCommentInServer=async(comment,commentId,userId,postId,setLoading)=>{
    try {
      setLoading(true)
      const commentObject={comment,commentId,userId}
      const postRef = doc(db, "posts", postId );
      await updateDoc(postRef, {
        comments:arrayUnion(commentObject)
      });
      handleCommentinClient(commentObject,postId)
      setLoading(false)
    } catch (error) {
      console.log(error)
      
    }   
  }
  const handleCommentinClient=(commentObj,postId)=>{
    let tempPosts=posts.map(post=>{
      if(post.postId===postId) 
         return {...post,comments:[...post.comments,commentObj]}
      return {...post}   
    })
    console.log(tempPosts)
    setPosts(tempPosts) 
  }


  const handleCreatePostInClient=(createdPost)=>{
    setPosts([createdPost,...posts])
  }

  const handleUpdatePostInClient=(images,caption,currentPost)=>{
    let tempPosts=posts.map(post=>{
      if(post.postId===currentPost)
        return {...post,images:images,caption:caption}
      return {...post}  
    })
    setPosts(tempPosts)
  }


  const deletePostFromServer=async(postId)=>{
    try {
      await deleteDoc(doc(db, "posts", postId));
      deletePostFromClient(postId)
      toast.success('Post deleted successfully')
    } catch (error) {
      toast.error('Something went wrong while deleting')
    }
   
  }

  const deletePostFromClient=postId=>{
    setPosts(posts.filter(post=>post.postId!==postId))
  }
  
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        handleLikesinClient,
        handleLikesInServer,
        isLiked,
        handleCommentInServer,
        handleCreatePostInClient,
        deletePostFromServer,
        handleUpdatePostInClient,
        postFilter,setPostFilter
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
