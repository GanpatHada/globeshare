import React, { useContext } from "react";
import Icon from "../../../../components/copy/Copy";
import "./Posts.css";
import {AiFillHeart} from 'react-icons/ai'
import {FaComment} from 'react-icons/fa'
import { ModalContext } from "../../../../contexts/ModalContext";
const Posts = ({ myPost }) => {
  const{setCurrentPost,openCommentsModal}=useContext(ModalContext)

  const handlePostClick=()=>{
      setCurrentPost(myPost.postId);
      openCommentsModal()
  }
  
  return (
    <section id="user-posts-image" onClick={handlePostClick}>
      <div className="like-comment-box all-centered">
        <span><AiFillHeart/>{myPost.likes.length}</span>
        <span> <FaComment/>{myPost.comments.length}</span>
      </div>
      {myPost.images.length > 1 && (
        <div className="more-images-sign">
          <Icon />
        </div>
      )}
      {myPost.images.length > 0 ? (
         <span><img src={myPost.images[0]} alt="..." /></span>
      ) : (
        <span>{myPost.caption}</span>
      )}
    </section>
  );
};

export default Posts;
