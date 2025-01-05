import React, {useRef } from "react";
import "./PostDetails.css";
import { MdMoreHoriz, MdOutlineCommentsDisabled } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import {
  getPostCreationDate,
} from "../../utils/PostsHelper";
import UserInfo from "../user-info/UserInfo";
import PostActions from "../post-actions/PostActions";
import DoComment from "../do-comment/DoComment";
import { usePosts } from "../../hooks/usePosts";
import PostImages from "../post-images/PostImages";
import PostLikes from '../post-likes/PostLikes'
import { useModal } from "../../hooks/useModal";
import { useMenu } from "../../hooks/useMenu";
import { IoChevronBack } from "react-icons/io5";

const PostComment = ({ userId, comment }) => {
  return (
    <div className="post-comment">
      <UserInfo userId={userId} comment={comment} />
    </div>
  );
};



const PostDetails = () => {
  const {posts}=usePosts()
  const postDetailsRef = useRef(null);
  const{modalContentId:contentId,closeModal}=useModal()
  const currentPost=posts.find(post=>post.postId===contentId);
  const {images,likes,user,caption,comments,time,postId}=currentPost;
  const {openMenu}=useMenu(); 
  const handleMenuClick=()=>{
    openMenu(postId,'POST')
  }


  return (
    <div id="post-details" ref={postDetailsRef}>
      <header>
              <button onClick={closeModal}><IoChevronBack /></button>
             <h1>Post</h1>
      </header>
      {images.length !== 0 && (
        <section className="image-section">
           <PostImages images={images}/>
        </section>
      )}
      <section className="post-info-section">
        <header className="post-header">
          <UserInfo userId={user} />
          <button className="all-centered" onClick={handleMenuClick}>
            <MdMoreHoriz />
          </button>
        </header>
        <main className="post-comments">
          <div className="post-comment">
            <UserInfo
              userId={user}
              comment={caption}
            />
          </div>
          {comments.length === 0 ? (
            <div id="no-comments-box" className="all-centered">
              <span>
                <MdOutlineCommentsDisabled />
              </span>
              <p>No comments found</p>
            </div>
          ) : (
            <>
              {comments.map((comment) => {
                return (
                  <PostComment
                    key={comment.commentId}
                    userId={comment.userId}
                    comment={comment.comment}
                  />
                );
              })}
            </>
          )}
        </main>
        <PostActions post={currentPost}/>
        <PostLikes post={currentPost}/>
        <div className="post-time">
          <p>{getPostCreationDate(time)}</p>
        </div>
        <DoComment post={currentPost}/>
      </section>
    </div>
  );
};

export default PostDetails;
