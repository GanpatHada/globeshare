import React, { useContext, useRef } from "react";
import "./LikesModal.css";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import CrossButton from "../cross-button/CrossButton";
import UserInfo from "../user-info/UserInfo";
import { ModalContext } from "../../contexts/ModalContext";
import { usePosts } from "../../hooks/usePosts";
import { isUserInMyFollowing } from "../../utils/UserHelper";
import { useUser } from "../../hooks/useUser";
import { useDialog } from "../../hooks/useDialog";
const LikesModal = () => {
  const { posts } = usePosts();
  const {
    user: { following, userId },
  } = useUser();
  const {dialogContentId:contentId,closeDialog}=useDialog()
  const likesRef = useRef(null);
  const requiredPost = posts.find((post) => post.postId === contentId);
  const { likes } = requiredPost;

  const doesIFollowUser = (userId) => isUserInMyFollowing(following, userId);

  return (
    <div id="likes-modal" className="modal" ref={likesRef}>
      <header className="dialog-header">
        <h1>Likes</h1>
        <CrossButton closeModal={closeDialog} />
      </header>
      <main className="dialog-content">
        {likes.map((like) => (
          <div key={like}>
            <UserInfo closeOnClickUser={closeDialog} userId={like} />
            {like !== userId && (
              <button
                className={
                  doesIFollowUser(like) ? "secondary-btn" : "primary-btn"
                }
                disabled={doesIFollowUser(like)}
              >
                {doesIFollowUser(like) ? "Following" : "Follow"}
              </button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};
export default LikesModal;
