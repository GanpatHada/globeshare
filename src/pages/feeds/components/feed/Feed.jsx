import React, { useContext, useState } from "react";
import "./Feed.css";

// Import Swiper styles

import FeedHeader from "../feed-header/FeedHeader";
import  FeedActions  from "../feed-actions/FeedActions";
import FeedImage from "../feed-image/FeedImage";

import FeedCaption from "../feed-caption/FeedCaption";
import CommentBox from "../../../../components/comment-box/CommentBox";
import { UserContext } from "../../../../contexts/UserContext";



const Feed = ({post}) => {
  const {user:{uid}}=useContext(UserContext)
  const {caption,likes,comments,images,user,time,postId}=post;
  return (
    <div className="feed">
      <FeedHeader userId={user} time={time} postId={postId}  />
      <FeedImage images={images} />
      <FeedActions likes={likes} comments={comments} postId={postId} post={post} />
      <div className="feed-info-wrapper">
      <p className="feed-likes">{likes.length} likes</p>
      <FeedCaption caption={caption} postId={postId}/>
      <CommentBox postId={postId} userId={uid}/>
      </div>
    </div>

  );
};

export default Feed;
