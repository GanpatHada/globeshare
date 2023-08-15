import React, { useContext, useEffect, useState } from "react";
import "./FeedActions.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "../../../../contexts/UserContext";
import { BsBookmarks, BsBookmarksFill, BsSend } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../assets/Firebase";
import { toast } from "react-toastify";
import { PostContext } from "../../../../contexts/PostContext";
import { ModalContext } from "../../../../contexts/ModalContext";
import Modal from "../../../../components/modal/Modal";
import Comments from "../../../../components/comments/Comments";

const FeedActions = ({ postId, post }) => {
  const { openCommentsModal, setCurrentPost } = useContext(ModalContext);
  const { handleLikesInServer, isLiked } = useContext(PostContext);
  const { handleBookmarkInServer, isPostBookmarked } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const handleLike = () => {
    console.log(isLiked(user.uid, postId) ? "unliked" : "liked");
    if (isLiked(user.uid, postId)) return handleLikesInServer(postId, "UNLIKE");
    return handleLikesInServer(postId, "LIKE");
  };

  const handleCommentsModal = () => {
    setCurrentPost(postId);
    openCommentsModal();
  };

  const handleShare = async() => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "globeshare",
          url: `https://globeshare.vercel.app/post/${postId}`,
        });
      } catch (error) {
        toast.error("Couldn't share at this moment");
      }
    } 
  };

  return (
    <section className="feed-actions">
      <ul>
        <li>
          <button
            title={isLiked(user.uid, postId) ? "UnLike" : "Like"}
            onClick={handleLike}
            className="like-btn"
          >
            {isLiked(user.uid, postId) ? (
              <AiFillHeart id="fill-heart-icon" />
            ) : (
              <AiOutlineHeart id="outlined-heart" />
            )}
          </button>
        </li>
        <li>
          <button title="Comments" onClick={handleCommentsModal}>
            <FaRegComment />
          </button>
        </li>
        <li>
          <button title="Share" onClick={handleShare}>
            <BsSend />
          </button>
        </li>
      </ul>
      <ul>
        <li>
          <button
            title="Bookmark"
            onClick={() => handleBookmarkInServer(postId)}
          >
            {isPostBookmarked(postId) ? <BsBookmarksFill /> : <BsBookmarks />}
          </button>
        </li>
      </ul>
    </section>
  );
};
export default FeedActions;
