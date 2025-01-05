import React, { useEffect } from "react";
import "./Feed.css";
import { usePosts } from "../../../../hooks/usePosts";
import { fetchFeed } from "../../../../services/PostService";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import Post from "../post/Post";
const FeedLoading = () => {
  return (
    <div id="feed-loading" >
      <div className="skeleton"></div>
      <div className="skeleton"></div>
    </div>
  );
};

const Feed = () => {
  const { addPosts, startLoadingPosts, stopLoadingPosts, loading, posts }=usePosts();
  const { user } = useUser();
  console.log(user.following)
  const getFeed = async () => {
    try {
      startLoadingPosts();
      const feeds = await fetchFeed(user);
      addPosts(feeds);
    } catch (error) {
      toast.error("Something went wrong while loading posts");
    } finally {
      stopLoadingPosts();
    }
  };

  useEffect(() => {
     getFeed();
  }, [user.following]);

  const getFeedFromPosts=()=>{
    return posts.filter(post=>user.following.includes(post.user))
  }

  

  return (
    <div id="feed">
      {loading ? (
        <FeedLoading />
      ) : (
        
        <>
          {getFeedFromPosts().map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
