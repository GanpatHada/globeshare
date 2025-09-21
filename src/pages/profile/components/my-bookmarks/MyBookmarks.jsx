import React, { useEffect, useCallback } from "react";
import "./MyBookmarks.css";
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
import { toast } from "react-toastify";
import Waiting from "../../../../components/waiting/Waiting";
import { usePosts } from "../../../../hooks/usePosts";
import { fetchMyBookmarks } from "../../../../services/PostService";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";

const MyBookmarks = () => {
  const { user } = useUser();
  const { userId } = user;
  const { userId: currentUser } = useParams();
  const navigate = useNavigate();
  const { posts, loading, startLoadingPosts, stopLoadingPosts, addPosts } = usePosts();

  const getMyBookmarks =async () => {
    try {
      startLoadingPosts();
      const bookmarks = await fetchMyBookmarks(user.bookmarks);
      addPosts(bookmarks);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      stopLoadingPosts();
    }
  }

  useEffect(() => {
     if (userId !== currentUser) 
      navigate("/404");
    getMyBookmarks();
  }, [currentUser,userId]);

  const savedPosts = posts.filter((post) => user.bookmarks.includes(post.postId));

  if (loading) return <Waiting />;

  if (savedPosts.length === 0) return <NoDataFound type="saved posts" />;

  return (
    <div className="posts-wrapper">
      {savedPosts.map((post) => (
        <PostsCard key={post.postId} post={post} />
      ))}
    </div>
  );
};

export default MyBookmarks;
