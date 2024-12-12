import React, { useContext } from "react";
import { PostContext } from "../../../../contexts/PostContext";
import "./MyPosts.css";

import NoDataFound from "../no-data-found/NoDataFound";
import PostsCard from "../../../../components/posts-card/PostsCard";

export const myPosts = (posts, user) =>
  posts.filter((post) => post.user === user);

const MyPosts = ({ userProfile: { userId } }) => {
  const { posts } = useContext(PostContext);

  return (
    <>
      {myPosts(posts, userId).length > 0 ? (
        <div className="posts-wrapper">
          {myPosts(posts, userId).map((myPost) => {
            return <PostsCard myPost={myPost} />;
          })}
        </div>
      ) : (
        <NoDataFound mode="posts" userId={userId} />
      )}
    </>
  );
};

export default MyPosts;
