import React, { useContext, useEffect } from "react";
import "./MyLikes.css";
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
import { ProfileContext } from "../../../../contexts/ProfileContext";
import { getPostDetails } from "../../../../services/PostService";
import { toast } from "react-toastify";
import Waiting from "../../../../components/waiting/Waiting";
const MyLikes = () => {
  const { state, dispatch } = useContext(ProfileContext);
  const{likedPosts,postLoading,profile:{likes}}=state;
 
  

  const fetchLikes = async () => {
    try {
      dispatch({type:'START_POST_LOADING'});
      let postDetails=[]
      for(let postId of likes)
      {
         const post=await getPostDetails(postId);
         postDetails.push(post);
      }
      dispatch({type:'SET_POSTS',payload:{type:'likedPosts',value:postDetails}}) 
    } catch (error) {
      toast.error("Something went wrong");
    }
    finally{
      dispatch({type:'STOP_POST_LOADING'});
    }
  };
 
  useEffect(()=>{
     fetchLikes();
  },[])
  

  if(postLoading)
    return <Waiting/>
  else
  {
    if(likedPosts.length===0)
      return <NoDataFound type="likes" />
    else{
      return(<div className="posts-wrapper">
        {likedPosts.map((post) => {
          return <PostsCard post={post} />;
        })}
      </div>)
    }

  }
};

export default MyLikes;
