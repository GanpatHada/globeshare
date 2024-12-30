import React, { useEffect, useRef, useState } from "react";
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
import av1 from "../../../../images/av-2.png";
import EmojiPicker from "emoji-picker-react";
import useClickOutsideHandler from "../../../../hooks/useClickOutsideHandler";
import { useUser } from "../../../../hooks/useUser";
import { toast } from "react-toastify";
import { likePost, unlikePost } from "../../../../services/PostService";
import { usePosts } from "../../../../hooks/usePosts";
import {
  addToBookmark,
  removeFromBookmark,
} from "../../../../services/UserService";
import {
  getPostCreationDate,
  getTimeDifference,
} from "../../../../utils/PostsHelper";

const PostHeader = ({ time }) => {
  return (
    <header className="post-header">
      <div className="post-profile all-centered">
        <img src={av1} alt="" />
      </div>
      <h4 className="user-name">@username</h4>
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

const PostActions = ({ post }) => {
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

      <button className="all-centered">
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

const PostCaption = ({ post }) => {
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

const PostComment = () => {
  const [emojiPopup, setEmojiPopup] = useState(false);
  const [commentText, setCommentText] = useState("");
  const closeEmojiPopup = () => setEmojiPopup(false);
  const openEmojiPopup = () => setEmojiPopup(true);
  const handleEmojiButtonClick = () => {
    if (emojiPopup) return closeEmojiPopup();
    return openEmojiPopup();
  };

  const addEmojiToCaption = (emojiObject) =>
    setCommentText(commentText.concat(` ${emojiObject.emoji} `));

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
        <button className="post-comment-button">
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
  return (
    <div className="post">
      <PostHeader time={time} user={user} />
      {images.length !== 0 && <PostImage images={images} />}
      <PostActions post={post} />
      <button id="post-likes-button">
        <strong>{likes.length}</strong> Likes
      </button>
      <PostCaption post={post} />
      <button id="post-comments-button">{`view all ${comments.length} comments`}</button>
      <PostComment />
    </div>
  );
};

export default Post;
