import React, { useContext } from "react";
import { PostContext } from "../../../../contexts/PostContext";
import "./MyPosts.css";
import { UserContext } from "../../../../contexts/UserContext";
import Posts from '../../components/posts/Posts'

export const myPosts = (posts,user) => posts.filter((post) => post.user === user);

const MyPosts = ({userProfile:{userId}}) => {
  const { posts } = useContext(PostContext);
  
  return (
    <div className="posts-wrapper">
      {myPosts(posts,userId).map((myPost) => {
        return (
         <Posts myPost={myPost}/>
        )
      })}
    </div>
  );
};

export default MyPosts;
