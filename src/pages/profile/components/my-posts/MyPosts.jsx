import React, { useContext, useEffect } from "react";
import "./MyPosts.css";
import Waiting from '../../../../components/waiting/Waiting'
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
import { ProfileContext } from "../../../../contexts/ProfileContext";
import { getUserPosts } from "../../../../services/ExplorePostService";
import { toast } from "react-toastify";

const MyPosts = () => {
  const { state, dispatch } = useContext(ProfileContext);
  const {
    profile: { userId },
    postLoading,
    postedPosts,
  } = state;

  const fetchUserPosts = async () => {
    try {
      dispatch({type:'START_POST_LOADING'})
      const posts = await getUserPosts(userId);
      return dispatch({ type: "SET_POSTS", payload: {type:'postedPosts',value:posts} });
    } catch (error) {
      toast.error("Unable to load posts");
    }
    finally{
      dispatch({type:'STOP_POST_LOADING'});
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);
  

  if(postLoading)
    return <Waiting/>
  else
  {
    if(postedPosts.length===0)
      return <NoDataFound type="posts" />
    else{
      return(<div className="posts-wrapper">
        {postedPosts.map((post) => {
          return <PostsCard post={post} />;
        })}
      </div>)
    }

  }
   
};

export default MyPosts;
