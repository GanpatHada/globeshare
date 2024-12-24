import React from "react";
import "./Posts.css";
import Post from "../post/Post";
const Posts = ({ feedList }) => {
  return (
    <div id="posts">
      {feedList.map((feed) => {
        return <Post key={feed.postId} feed={feed} />;
      })}
    </div>
  );
};

export default Posts;
