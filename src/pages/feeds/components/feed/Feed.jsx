import React, { useContext, useState } from "react";
import "./Feed.css";

// Import Swiper styles

import FeedHeader from "../feed-header/FeedHeader";
import  FeedActions  from "../feed-actions/FeedActions";
import FeedImage from "../feed-image/FeedImage";
import { BsEmojiSmile } from "react-icons/bs";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../assets/Firebase";
import { toast } from "react-toastify";
import { PostContext } from "../../../../contexts/PostContext";
import miniLoader from '../../../../images/miniLoader.svg'
import FeedCaption from "../feed-caption/FeedCaption";
import CommentBox from "../../../../components/comment-box/CommentBox";
import Modal from "../../../../components/modal/Modal";
import Comments from "../../../../components/comments/Comments";
import { ModalContext } from "../../../../contexts/ModalContext";



const Feed = ({post}) => {
  const {caption,likes,comments,images,user,time,postId}=post;
  return (
    <>
    <div className="feed">
      <FeedHeader userId={user} time={time} postId={postId}  />
      <FeedImage images={images} />
      <FeedActions likes={likes} comments={comments} postId={postId} post={post} />
      <div className="feed-info-wrapper">
      <p className="feed-likes">{likes.length} likes</p>
      <FeedCaption caption={caption} postId={postId}/>
      <CommentBox postId={postId} userId={user} />
      </div>
    </div>
    </>
  );
};

export default Feed;
