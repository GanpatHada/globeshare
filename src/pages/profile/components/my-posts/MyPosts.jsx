import React, { useContext } from "react";
import { PostContext } from "../../../../contexts/PostContext";
import "./MyPosts.css";
import { UserContext } from "../../../../contexts/UserContext";
import Posts from '../../components/posts/Posts'

export const myPosts = (posts,user) => posts.filter((post) => post.user === user.uid);

const MyPosts = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);
  
  return (
    <div className="posts-wrapper">
      {myPosts(posts,user).map((myPost) => {
        return (
         <Posts myPost={myPost}/>
        )
      })}
    </div>
  );
};

export default MyPosts;
