import React, { useContext, useEffect } from "react";
import "./MyBookmarks.css";
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
import { ProfileContext } from "../../../../contexts/ProfileContext";
import { getPostDetails } from "../../../../services/PostService";
import { toast } from "react-toastify";
import Waiting from "../../../../components/waiting/Waiting";
const MyBookmarks = () => {
  const { state, dispatch } = useContext(ProfileContext);
  const{savedPosts,postLoading,profile:{bookmarks}}=state;
  const fetchBookmarks = async () => {
    try {
      dispatch({type:'START_POST_LOADING'});
      let postDetails=[]
      for(let postId of bookmarks)
      {
         const post=await getPostDetails(postId);
         postDetails.push(post);
      }
      dispatch({type:'SET_POSTS',payload:{type:'savedPosts',value:postDetails}}) 
      console.log(postDetails);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
    finally{
      dispatch({type:'STOP_POST_LOADING'});
    }
  };
 
  useEffect(()=>{
     fetchBookmarks();
  },[])
  

  if(postLoading)
    return <Waiting/>
  else
  {
    if(savedPosts.length===0)
      return <NoDataFound type='saved posts' />
    else{
      return(<div className="posts-wrapper">
        {savedPosts.map((post) => {
          return <PostsCard post={post} />;
        })}
      </div>)
    }

  }
};

export default MyBookmarks;
