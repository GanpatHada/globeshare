import React, { useContext } from "react";
import "./MyLikes.css";

import Loader from "../../../../components/loader/Loader";
import { PostContext } from "../../../../contexts/PostContext";
import { UserContext } from "../../../../contexts/UserContext";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";
const MyLikes = () => {
  const { posts } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const myLikes = () => posts.filter((post) => post.likes.includes(user.uid));
  return (
    <>

      {myLikes().length>0?<div className='posts-wrapper'>
      {myLikes().map((myLike) => {
        return <PostsCard myPost={myLike} key={myLike.id} />;
      })}
      </div>:<NoDataFound mode="likes" />}
      
    </>
  );
};

export default MyLikes;
