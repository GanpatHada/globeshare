import React from "react";
import "./PostLikes.css";
import { useDialog } from "../../hooks/useDialog";
const PostLikes = ({ post }) => {
  const { likes,postId} = post;
  const {openDialog}=useDialog()
  const showLikes=()=>{
     openDialog(postId,'LIKES')
  }
  return (
    <section>
      <button id="post-likes-button" onClick={showLikes} disabled={likes.length === 0}>
        <strong>{likes.length}</strong> Likes
      </button>
    </section>
  );
};

export default PostLikes;
