import React, {useState } from "react";
import "./PostActions.css";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import {
  IoBookmark,
  IoBookmarkOutline,
  IoChatbubbleOutline,
} from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { useUser } from "../../hooks/useUser";
import { likePost, unlikePost } from "../../services/PostService";
import { usePosts } from "../../hooks/usePosts";
import { toast } from "react-toastify";
import { addToBookmark, removeFromBookmark } from "../../services/UserService";
import Spinner from "../../images/loading2.gif";
import { useModal } from "../../hooks/useModal";

const LikeButton = ({ post }) => {
  const {
    user: { userId },
  } = useUser();
  const { unlikePostOnClient, likePostOnClient } = usePosts();
  const [loading, setLoading] = useState(false);

  const isPostLiked = () => post.likes.includes(userId);

  const handleLikeClick = async () => {
    try {
      setLoading(true);
      if (isPostLiked()) {
        await unlikePost(userId, post.postId);
        unlikePostOnClient(userId, post.postId);
      } else {
        await likePost(userId, post.postId);
        likePostOnClient(userId, post.postId);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLikeClick}>
      {!loading ? (
        <>
          {isPostLiked() ? <IoIosHeart color="#e40000" /> : <IoIosHeartEmpty />}
        </>
      ) : (
        <img src={Spinner} />
      )}
    </button>
  );
};

const CommentButton = ({ post }) => {
  const { openModal} = useModal();

  const openPostDetails = () => {
    openModal(post.postId, "POST_DETAILS");
  };
  return (
    <button onClick={openPostDetails}>
      <IoChatbubbleOutline />
    </button>
  );
};

const BookMarkButton = ({ post }) => {
  const { user, addToBookmarkOnClient, removeFromBookmarkOnClient } = useUser();
  const [loading, setLoading] = useState(false);
  const isPostBookmarked = () => user.bookmarks.includes(post.postId);

  const handleBookmarkClick = async () => {
    try {
      setLoading(true);
      if (isPostBookmarked()) {
        await removeFromBookmark(user.userId, post.postId);
        removeFromBookmarkOnClient(post.postId);
      } else {
        await addToBookmark(user.userId, post.postId);
        addToBookmarkOnClient(post.postId);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleBookmarkClick}>
      {!loading ? (
        isPostBookmarked() ? (
          <IoBookmark />
        ) : (
          <IoBookmarkOutline />
        )
      ) : (
        <img src={Spinner} />
      )}
    </button>
  );
};

const ShareButton = () => {
  return (
    <button>
      <BsSend />
    </button>
  );
};

const PostActions = ({ post }) => {
  return (
    <div className="post-actions">
      <div>
        <LikeButton post={post} />
        <CommentButton post={post} />
        <ShareButton />
      </div>
      <div>
        <BookMarkButton post={post} />
      </div>
    </div>
  );
};

export default PostActions;
