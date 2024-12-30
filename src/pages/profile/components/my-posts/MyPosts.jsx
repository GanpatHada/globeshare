import React, { useEffect } from "react";
import "./MyPosts.css";
import Waiting from "../../../../components/waiting/Waiting";
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
import { toast } from "react-toastify";
import { fetchUserPosts } from "../../../../services/PostService";
import { useUser } from "../../../../hooks/useUser";
import { usePosts } from "../../../../hooks/usePosts";
import { useParams } from "react-router-dom";

const MyPosts = () => {
  const { posts, addPosts, startLoadingPosts, stopLoadingPosts, loading }=usePosts();
  const {user: { userId }} = useUser();
  const {userId:currentUser}=useParams()
  const getUserPosts = async () => {
    try {
      startLoadingPosts();
      const posts = await fetchUserPosts(currentUser);
      addPosts(posts);
    } catch (error) {
      toast.error("Unable to load posts");
      console.log(error);
    } finally {
      stopLoadingPosts();
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const filterUserPosts = () => posts.filter((post) => post.user === currentUser);

  if (loading) return <Waiting />;
  else {
    if (filterUserPosts().length === 0) return <NoDataFound type="posts" />;
    else {
      return (
        <div className="posts-wrapper">
          {filterUserPosts().map((post) => {
            return <PostsCard post={post} />;
          })}
        </div>
      );
    }
  }
};

export default MyPosts;
