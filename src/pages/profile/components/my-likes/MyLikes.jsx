import React, { useContext } from "react";
import "./MyLikes.css";

import Loader from "../../../../components/loader/Loader";
import { PostContext } from "../../../../contexts/PostContext";
import { UserContext } from "../../../../contexts/UserContext";
import Posts from "../posts/Posts";
const MyLikes = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const myLikes = () => posts.filter((post) => post.likes.includes(user.uid));
  return (
    <>
      {myLikes().map((myLike) => {
        return <Posts myPost={myLike} key={myLike.id} />;
      })}
    </>
  );
};

export default MyLikes;
