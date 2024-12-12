import React, { useContext } from "react";
import "./MyBookmarks.css";
import { PostContext } from "../../../../contexts/PostContext";
import { UserContext } from "../../../../contexts/UserContext";
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
const MyBookmarks = () => {
  const { posts } = useContext(PostContext);
  const { userDetails } = useContext(UserContext);
  const { bookmarks } = userDetails;
  const myBookmarks = () =>
    posts.filter((post) => bookmarks.includes(post.postId));
  return (
    <>
      {myBookmarks().length>0?<div className="posts-wrapper">
      {myBookmarks().map((bookmark) => {
        return <PostsCard key={bookmark.postId} myPost={bookmark} />;
      })}
      </div>:<NoDataFound mode="bookmarks" />}
      
    </>
  );
};

export default MyBookmarks;
