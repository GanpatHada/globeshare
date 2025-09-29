import { useRef, useState } from "react";
import "./Menu.css";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { useMenu } from "../../hooks/useMenu";
import { usePosts } from "../../hooks/usePosts";
import { useUser } from "../../hooks/useUser";
import { deletePost } from "../../services/PostService";
import { toast } from "react-toastify";
import { useModal } from "../../hooks/useModal";
import Loading from '../../images/loading2.gif';
import { followUser, unfollowUser } from "../../services/UserService";
import { FaWhatsapp, FaLink } from "react-icons/fa";

const Menu = () => {
  const { closeMenu, menuContentId } = useMenu();
  const { closeModal, openModal } = useModal();
  const { posts, deletePostOnClient } = usePosts();
  const { user, unFollowUserOnClient, followUserOnClient } = useUser();

  const menuRef = useRef();
  useClickOutsideHandler(menuRef, closeMenu);

  const [loading, setLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const currentPost = posts.find((post) => post.postId === menuContentId);
  if (!currentPost) return null;

  const { user: postOwnerId, postId } = currentPost;
  const isOwner = postOwnerId === user.userId;
  const isFollowing = user.following.includes(postOwnerId);

  /** Handlers **/
  const handleDeletePost = async () => {
    try {
      setLoading(true);
      await deletePost(menuContentId);
      deletePostOnClient(menuContentId);
      closeModal();
      closeMenu();
      toast.success("Post deleted successfully");
    } catch {
      toast.error("Unable to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = () => {
    openModal(menuContentId, "EDIT_POST");
    closeMenu();
  };

  const handleFollowToggle = async () => {
    try {
      setLoading(true);
      if (isFollowing) {
        await unfollowUser(user.userId, postOwnerId);
        unFollowUserOnClient(postOwnerId);
        toast.info("Unfollowed user");
      } else {
        await followUser(user.userId, postOwnerId);
        followUserOnClient(postOwnerId);
        toast.success("Followed user");
      }
    } catch {
      toast.error("Action failed");
    } finally {
      setLoading(false);
      closeMenu();
    }
  };

  const handleCopyLink = async () => {
    const url = `https://globeshare.vercel.app/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
    closeMenu();
  };

  const handleWhatsappShare = () => {
    const url = `https://globeshare.vercel.app/${postId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, "_blank");
    closeMenu();
  };

  const toggleShareOptions = () => {
    setShowShareOptions((prev) => !prev);
  };

  return (
    <div id="menu-wrapper" className="overlay all-centered">
      <div id="menu" ref={menuRef}>
        {loading && (
          <div className="loading">
            <img src={Loading} alt="loading..." />
          </div>
        )}

        {!isOwner && <button className="menu-btn danger">Report</button>}

        {isOwner && (
          <>
            <button onClick={handleDeletePost} className="menu-btn danger">
              Delete
            </button>
            <button onClick={handleEditPost} className="menu-btn">
              Edit Post
            </button>
          </>
        )}

        {!isOwner && (
          <button
            onClick={handleFollowToggle}
            className={`menu-btn ${isFollowing ? "danger" : ""}`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        <button className="menu-btn">Go to post</button>

        <button onClick={toggleShareOptions} className="menu-btn">
          Share to...
        </button>

        {showShareOptions && (
          <div className="share-options">
            <button onClick={handleWhatsappShare} className="menu-btn share-btn">
              <FaWhatsapp /> WhatsApp
            </button>
            <button onClick={handleCopyLink} className="menu-btn share-btn">
              <FaLink /> Copy Link
            </button>
          </div>
        )}
        <button onClick={handleCopyLink} className="menu-btn">
          Copy link
        </button>
        <button onClick={closeMenu} className="menu-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Menu;
