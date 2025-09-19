import React, { useEffect } from "react";
import "./MyPosts.css";
import Waiting from "../../../../components/waiting/Waiting";
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
import { toast } from "react-toastify";
import { fetchUserPosts } from "../../../../services/PostService";
import { usePosts } from "../../../../hooks/usePosts";
import { useParams } from "react-router-dom";

const MyPosts = () => {
  const { posts, addPosts, startLoadingPosts, stopLoadingPosts, loading } =
    usePosts();
  const { userId: currentUser } = useParams();

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        startLoadingPosts();
        const posts = await fetchUserPosts(currentUser);
        if (posts.length !== 0) addPosts(posts);
      } catch (error) {
        toast.error("Unable to load posts");
        
      } finally {
        stopLoadingPosts();
      }
    };

    getUserPosts();
    // eslint-disable-next-line
  }, [currentUser]);

  const filterUserPosts = () =>
    posts.filter((post) => post.user === currentUser);

  if (loading) return <Waiting />;
  else {
    if (filterUserPosts().length === 0) return <NoDataFound type="posts" />;
    else {
      return (
        <div className="posts-wrapper">
          {filterUserPosts().map((post) => {
            return <PostsCard post={post} key={post.postId} />;
          })}
        </div>
      );
    }
  }
};

export default MyPosts;
