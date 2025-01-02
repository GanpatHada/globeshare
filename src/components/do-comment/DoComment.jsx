import React, { useRef, useState } from "react";
import "./DoComment.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { useUser } from "../../hooks/useUser";
import { nanoid } from "nanoid";
import { commentOnPost } from "../../services/PostService";
import { usePosts } from "../../hooks/usePosts";
import { toast } from "react-toastify";

const EmojiPopup = ({ addEmojiToComment, closeEmoji }) => {
  const popupRef = useRef(null);
  useClickOutsideHandler(popupRef, closeEmoji);
  return (
    <div ref={popupRef} className="emoji-popup">
      <EmojiPicker
        onEmojiClick={(obj) => addEmojiToComment(obj.emoji)}
        height={450}
        width={350}
      />
    </div>
  );
};

const DoComment = ({ post }) => {
  const { postId } = post;
  const {
    user: { userId },
  } = useUser();
  const { commentOnPostOnClient } = usePosts();
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleCommentText = (text) => {
    setCommentText(text);
  };
  const addEmojiToComment = (emoji) => {
    setCommentText(commentText.concat(emoji));
  };

  const commentObj = {
    commentId: nanoid(),
    comment: commentText,
    userId,
    replies: [],
    likes: [],
  };

  const handlePostComment = async () => {
    try {
      setLoading(true);
      await commentOnPost(postId, commentObj);
      commentOnPostOnClient(commentObj, postId);
    } catch (error) {
      toast.error("Something went wrong ");
      console.log(error);
    } finally {
      setCommentText("");
      setLoading(false);
    }
  };

  const closeEmoji = () => setShowEmoji(false);

  return (
    <div className="do-comment">
      <section>
        <input
          value={commentText}
          onChange={(e) => handleCommentText(e.target.value)}
          type="text"
          className="comment-input"
          placeholder="Add a comment"
          maxLength={200}
        />
      </section>
      {commentText.trim().length !== 0 && (
        <section>
          <button
            className="post-comment-button all-centered"
            disabled={loading}
            onClick={handlePostComment}
          >
            {loading ? "Posting ..." : "Post"}
          </button>
        </section>
      )}
      <section>
        <button
          className="emoji-button all-centered"
          onClick={() => setShowEmoji(true)}
        >
          {showEmoji && (
            <EmojiPopup
              closeEmoji={closeEmoji}
              addEmojiToComment={addEmojiToComment}
            />
          )}
          <BsEmojiSmile />
        </button>
      </section>
    </div>
  );
};
export default DoComment;
