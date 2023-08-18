import React, { useContext } from "react";
import { PostContext } from "../../../../contexts/PostContext";
import "./MyPosts.css";
import Posts from "../../components/posts/Posts";
import emptyBox from "../../../../images/empty-box.png";
import { UserContext } from "../../../../contexts/UserContext";
import { ModalContext } from "../../../../contexts/ModalContext";
import NoDataFound from "../no-data-found/NoDataFound";

export const myPosts = (posts, user) =>
  posts.filter((post) => post.user === user);

const MyPosts = ({ userProfile: { userId } }) => {
  const { user } = useContext(UserContext);
  const { openCreatePostModal } = useContext(ModalContext);
  const { posts } = useContext(PostContext);

  return (
    <div className="posts-wrapper">
      {myPosts(posts, userId).length > 0 ? (
        <>
          {myPosts(posts, userId).map((myPost) => {
            return <Posts myPost={myPost} />;
          })}
        </>
      ) : (
        <NoDataFound mode="posts" userId={userId} />
      )}
    </div>
  );
};

export default MyPosts;
