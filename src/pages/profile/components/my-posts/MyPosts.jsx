import React, { useContext } from "react";
import { PostContext } from "../../../../contexts/PostContext";
import "./MyPosts.css";
import { UserContext } from "../../../../contexts/UserContext";
import Posts from '../../components/posts/Posts'
const MyPosts = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const myPosts = () => posts.filter((post) => post.user === user.uid);
  return (
    <>
      {myPosts().map((myPost) => {
        return (
         <Posts myPost={myPost}/>
        )
      })}
    </>
  );
};

export default MyPosts;
