import {useRef } from "react";
import "./LikesModal.css";
import CrossButton from "../cross-button/CrossButton";
import UserInfo from "../user-info/UserInfo";
import { usePosts } from "../../hooks/usePosts";
import { isUserInMyFollowing } from "../../utils/UserHelper";
import { useUser } from "../../hooks/useUser";
import { useDialog } from "../../hooks/useDialog";

const LikeBox = ({ like: targetUser }) => {
  const { closeDialog } = useDialog();
  const {
    user: { following, userId },
  } = useUser();
  return (
    <>
      <UserInfo closeOnClickUser={closeDialog} userId={targetUser} />
      {userId !== targetUser && (!isUserInMyFollowing(following, targetUser) ? (
        <button className="primary-btn">Follow</button>
      ) : (
        <button className="secondary-btn">Following</button>
      ))}
    </>
  );
};

const LikesModal = () => {
  const { posts } = usePosts();
  const { dialogContentId: contentId, closeDialog } = useDialog();
  const likesRef = useRef(null);
  const requiredPost = posts.find((post) => post.postId === contentId);
  const { likes } = requiredPost;

  return (
    <div id="likes-modal" className="modal" ref={likesRef}>
      <header className="dialog-header">
        <h1>Likes</h1>
        <CrossButton closeModal={closeDialog} />
      </header>
      <main className="dialog-content">
        {likes.map((like) => (
          <div key={like}>
            <LikeBox like={like} />
          </div>
        ))}
      </main>
    </div>
  );
};
export default LikesModal;
