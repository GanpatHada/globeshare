import React, { useContext } from "react";
import "./MyBookmarks.css";
import { PostContext } from "../../../../contexts/PostContext";
import { UserContext } from "../../../../contexts/UserContext";
import Posts from "../posts/Posts";
import NoDataFound from "../no-data-found/NoDataFound";
const MyBookmarks = () => {
  const { posts } = useContext(PostContext);
  const { userDetails } = useContext(UserContext);
  const { bookmarks } = userDetails;
  const myBookmarks = () =>
    posts.filter((post) => bookmarks.includes(post.postId));
  return (
    <div className="posts-wrapper">
      {myBookmarks().length>0?<>
      {myBookmarks().map((bookmark) => {
        return <Posts key={bookmark.postId} myPost={bookmark} />;
      })}
      </>:<NoDataFound mode="bookmarks" />}
      
    </div>
  );
};

export default MyBookmarks;
