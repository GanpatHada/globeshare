import React, { useContext, useEffect, useRef, useState } from "react";
import "./Post.css";
import { MdMoreHoriz } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import defaultPhoto from '../../../../images/profile.png'
import EmojiPicker from "emoji-picker-react";
import useClickOutsideHandler from "../../../../hooks/useClickOutsideHandler";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import { commentOnPost, likePost, unlikePost } from "../../../../services/PostService";
import { usePosts } from "../../../../hooks/usePosts";
import {
  addToBookmark,
  fetchUserBasicInfo,
  removeFromBookmark,
} from "../../../../services/UserService";
import {
  getPostCreationDate,
  getTimeDifference,
} from "../../../../utils/PostsHelper";
import { nanoid } from 'nanoid';
import { ModalContext } from "../../../../contexts/ModalContext";
import { PostDetailsContext } from "../../../../contexts/PostDetailsContext";
import UserInfo from "../../../../components/user-info/UserInfo";


const PostHeader = ({time,user}) => {
  return (
    <header className="post-header">
      <UserInfo userId={user}/>
      <span className="post-time" title={getPostCreationDate(time)}>
        {getTimeDifference(time)} ago
      </span>

      <button className="more">
        <MdMoreHoriz />
      </button>
    </header>
  );
};

const PostImage = ({ images }) => {
  return (
    <section className="post-image">
      <img src={images[0]} alt="not found" />
    </section>
  );
};

const PostActions = ({ post,handleCommentsClick  }) => {
  const { user, addToBookmarkOnClient, removeFromBookmarkOnClient } = useUser();
  const { userId } = user;

  const { likePostOnClient, unlikePostOnClient } = usePosts();

  const isPostLiked = () => post.likes.includes(userId);
  const isPostBookmarked = () => user.bookmarks.includes(post.postId);

  const handleLikeClick = async () => {
    try {
      if (isPostLiked()) {
        await unlikePost(userId, post.postId);
        unlikePostOnClient(userId, post.postId);
      } else {
        await likePost(userId, post.postId);
        likePostOnClient(userId, post.postId);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  const handleBookmarkClick = async () => {
    try {
      if (isPostBookmarked()) {
        await removeFromBookmark(userId, post.postId);
        removeFromBookmarkOnClient(post.postId);
      } else {
        await addToBookmark(userId, post.postId);
        addToBookmarkOnClient(post.postId);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <section className="post-actions">
      <button
        className={`all-centered ${isPostLiked() && "liked-heart-button"}`}
        onClick={handleLikeClick}
      >
        {isPostLiked() ? <IoIosHeart /> : <IoIosHeartEmpty />}
      </button>

      <button className="all-centered" onClick={handleCommentsClick }>
        <IoChatbubbleOutline />
      </button>
      <button className="all-centered">
        <BsSend />
      </button>
      <button className="all-centered" onClick={handleBookmarkClick}>
        {isPostBookmarked() ? <IoBookmark /> : <IoBookmarkOutline />}
      </button>
    </section>
  );
};

const PostCaption = ({ post}) => {
  const { caption, images } = post;
  let finalCaption = caption;
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    if (finalCaption.length > 100) setShowMore(true);
  }, [caption]);

  return (
    <section
      className="post-caption"
      style={{ order: images.length === 0 ? "1" : "2" }}
    >
      {showMore ? finalCaption.substring(0, 100) : finalCaption}
      {finalCaption.length > 100 && (
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "read more" : "read less"}
        </button>
      )}
    </section>
  );
};

const EmojiPopup = ({ closeEmojiPopup, addEmojiToCaption }) => {
  const popupRef = useRef(null);
  useClickOutsideHandler(popupRef, closeEmojiPopup);
  return (
    <div ref={popupRef} className="emoji-popup">
      <EmojiPicker onEmojiClick={addEmojiToCaption} height={450} width={350} />
    </div>
  );
};

const PostComment = ({post:{postId}}) => {
  const [emojiPopup, setEmojiPopup] = useState(false);
  const [commentText, setCommentText] = useState("");
  const closeEmojiPopup = () => setEmojiPopup(false);
  const openEmojiPopup = () => setEmojiPopup(true);
  const handleEmojiButtonClick = () => {
    if (emojiPopup) return closeEmojiPopup();
    return openEmojiPopup();
  };
  const {user:{userId}}=useUser()

  const addEmojiToCaption = (emojiObject) =>
    setCommentText(commentText.concat(` ${emojiObject.emoji} `));

  const handlePostComment=async()=>{
    const commentObj={
      commentId:nanoid(),
      comment:commentText,
      userId,
      replies:[],
      likes:[]
    }
    try {
      await commentOnPost(postId,commentObj);
    } catch (error) {
      toast.error('Something went wrong ')
      console.log(error);
    }
    finally{
      setCommentText("")
    }
  }

  return (
    <section className="post-comment">
      <section className="comment-input-section">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="comment-input"
          placeholder="Add a comment"
          maxLength={200}
        />
      </section>
      {commentText.trim().length > 0 && (
        <button className="post-comment-button" onClick={handlePostComment}>
          <strong>Post</strong>
        </button>
      )}
      {emojiPopup && (
        <EmojiPopup
          closeEmojiPopup={closeEmojiPopup}
          addEmojiToCaption={addEmojiToCaption}
        />
      )}
      <button className="emoji" onClick={handleEmojiButtonClick}>
        <FaRegSmile />
      </button>
    </section>
  );
};


const Post = ({ post }) => {
  const { images, time, comments, likes, user } = post;
  const{openModal}=useContext(ModalContext)
  const{state,dispatch}=useContext(PostDetailsContext)
  const handleCommentsClick=()=>{
    dispatch({type:'SET_POST_DETAILS',payload:post})
    openModal('POST_DETAILS');
  }
  

  return (
    <div className="post">
      <PostHeader time={time} user={user} />
      {images.length !== 0 && <PostImage images={images} />}
      <PostActions post={post} handleCommentsClick={handleCommentsClick} />
      <button id="post-likes-button">
        <strong>{likes.length}</strong> Likes
      </button>
      <PostCaption post={post} />
      <button id="post-comments-button" onClick={handleCommentsClick}>{`view all comments`}</button>
      <PostComment post={post} />
    </div>
  );
};

export default Post;
