import React, { useContext } from "react";
import Icon from "../../components/copy/Copy";
import "./PostsCard.css";
import {AiFillHeart} from 'react-icons/ai'
import {FaComment} from 'react-icons/fa'
import { ModalContext } from "../../contexts/ModalContext";
import { PostDetailsContext } from "../../contexts/PostDetailsContext";

const PostsCard = ({ post }) => {
  const {openModal}=useContext(ModalContext)
  const {state,dispatch}=useContext(PostDetailsContext);

  const handlePostClick=()=>{
      dispatch({type:'SET_POST_DETAILS',payload:post})
      openModal('POST_DETAILS');
  }
  
  return (
    <section id="user-posts-image" onClick={handlePostClick}>
      <div className="like-comment-box all-centered">
        <span><AiFillHeart/>{post.likes.length}</span>
        <span> <FaComment/>{post.comments.length}</span>
      </div>
      {post.images.length > 1 && (
        <div className="more-images-sign">
          <Icon />
        </div>
      )}
      {post.images.length > 0 ? (
         <span><img src={post.images[0]} alt="..." /></span>
      ) : (
        <span className="post-caption">{post.caption}</span>
      )}
    </section>
  );
};

export default PostsCard;