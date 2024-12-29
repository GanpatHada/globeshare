import React, { useEffect, useRef, useState } from "react";
import "./Post.css";
import { IoIosMore } from "react-icons/io";
import {
  FaRegBookmark,
  FaRegComment,
  FaRegHeart,
  FaRegSmile,
} from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import av1 from "../../../../images/av-2.png";
import EmojiPicker from "emoji-picker-react";
import useClickOutsideHandler from "../../../../hooks/useClickOutsideHandler";

const PostHeader = () => {
  return (
    <header className="post-header">
      <div className="post-profile all-centered">
        <img src={av1} alt="" />
      </div>
      <h4 className="user-name">@username</h4>
      <span className="post-time">2 years ago</span>

      <button className="more">
        <IoIosMore />
      </button>
    </header>
  );
};

const PostImage = ({images}) => {
  return (
    <section className="post-image">
      <img
        src={images[0]}
        alt="not found"
      />
    </section>
  );
};

const PostActions = () => {
  return (
    <section className="post-actions">
      <button className="all-centered">
        <FaRegHeart />
      </button>
      <button className="all-centered">
        <FaRegComment />
      </button>
      <button className="all-centered">
        <BsSend />
      </button>
      <button className="all-centered">
        <FaRegBookmark />
      </button>
    </section>
  );
};

const PostLikesComments = ({likes,comments}) => {
  return (
    <section className="post-likes-comments">
      <p className="likes">
        <span className="like-count">{likes.length}</span>Likes
      </p>
      <p className="comments">
        <span className="comments-count">{comments.length}</span>Comments
      </p>
    </section>
  );
};

const PostCaption = ({caption}) => {
  let finalCaption =caption;
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    if (finalCaption.length > 100) setShowMore(true);
  }, [caption]);

  return (
    <section className="post-caption">
      {showMore ? finalCaption.substring(0, 100) : finalCaption}
      {finalCaption.length>100&&<button onClick={() => setShowMore(!showMore)}>
        {showMore ? "read more" : "read less"}
      </button>}
    </section>
  );
};

const EmojiPopup = ({closeEmojiPopup,addEmojiToCaption}) => {
  const popupRef=useRef(null);
  useClickOutsideHandler(popupRef,closeEmojiPopup);
  return (
    <div ref={popupRef} className="emoji-popup">
      <EmojiPicker onEmojiClick={addEmojiToCaption} height={450} width={350} />
    </div>
  );
};

const PostComment = () => {
  const [emojiPopup, setEmojiPopup] = useState(false);
  const [commentText,setCommentText]=useState('');
  const closeEmojiPopup=()=>setEmojiPopup(false);
  const openEmojiPopup=()=>setEmojiPopup(true);
  const handleEmojiButtonClick=()=>{
    if(emojiPopup)
      return closeEmojiPopup();
    return openEmojiPopup();
  }

  const addEmojiToCaption=(emojiObject)=>setCommentText(commentText.concat(` ${emojiObject.emoji} `));


  return (
    <section className="post-comment">
      <section className="comment-input-section">
        <input
          type="text"
          value={commentText}
          onChange={(e)=>setCommentText(e.target.value)}
          className="comment-input"
          placeholder="Add a comment"
          maxLength={200}
        />
      </section>
      {commentText.trim().length>0&&<button className="post-comment-button"><strong>Post</strong></button>}
      {emojiPopup && <EmojiPopup closeEmojiPopup={closeEmojiPopup} addEmojiToCaption={addEmojiToCaption}/>}
      <button className="emoji"  onClick={handleEmojiButtonClick} >
        <FaRegSmile  />
      </button>
    </section>
  );
};

const Post = ({post}) => {
  const{images,comments,likes,caption,time}=post;
  return (
    <div className="post">
      <PostHeader time={time} />
      <PostImage images={images} />
      <PostActions />
      <PostLikesComments likes={likes} comments={comments} />
      <PostCaption caption={caption} />
      <PostComment />
    </div>
  );
};

export default Post;
