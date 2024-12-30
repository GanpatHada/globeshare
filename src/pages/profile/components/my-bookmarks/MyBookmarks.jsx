import React, { useEffect } from "react";
import "./MyBookmarks.css";
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
import { toast } from "react-toastify";
import Waiting from "../../../../components/waiting/Waiting";
import { usePosts } from "../../../../hooks/usePosts";
import { fetchMyBookmarks } from "../../../../services/PostService";
import { useProfile } from "../../../../hooks/useProfile";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../../hooks/useUser";
const MyBookmarks = () => {
  const { user } = useUser();
  const { userId } = user;
  const { userId: currentUser } = useParams();
  const navigate = useNavigate();
  const { posts, loading, startLoadingPosts, stopLoadingPosts, addPosts } =
    usePosts();

  if (userId !== currentUser) navigate("/404");

  const getMyBookmarks = async () => {
    try {
      startLoadingPosts();
      const bookmarks = await fetchMyBookmarks(user.bookmarks);
      addPosts(bookmarks);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      stopLoadingPosts();
    }
  };

  useEffect(() => {
    getMyBookmarks();
  }, [user]);

  const savedPosts = () =>
    posts.filter((post) => user.bookmarks.includes(post.postId));

  if (loading) return <Waiting />;
  else {
    if (savedPosts().length === 0) return <NoDataFound type="saved posts" />;
    else {
      return (
        <div className="posts-wrapper">
          {savedPosts().map((post) => {
            return <PostsCard post={post} />;
          })}
        </div>
      );
    }
  }
};

export default MyBookmarks;
