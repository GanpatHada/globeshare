import { useRef, useState } from "react";
import "./Menu.css";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { useMenu } from "../../hooks/useMenu";
import { usePosts } from "../../hooks/usePosts";
import { useUser } from "../../hooks/useUser";
import { deletePost } from "../../services/PostService";
import { toast } from "react-toastify";
import { useModal } from "../../hooks/useModal";
const Menu = () => {
  const { closeMenu, menuContentId} = useMenu();
  const { closeModal,openModal} = useModal();
  const { posts, deletePostOnClient } = usePosts();
  const menuRef = useRef();
  useClickOutsideHandler(menuRef, closeMenu);
  const currentPost = posts.find((post) => post.postId === menuContentId);
  const { user: postOwnerId } = currentPost;
  const {
    user: { userId },
  } = useUser();
  const [loading, setLoading] = useState(false);
  const handleDeletePost = async () => {
    try {
      setLoading(true);
      await deletePost(menuContentId);
      deletePostOnClient(menuContentId);
      closeModal();
      closeMenu();
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Unable to delete");
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost=async()=>{
      openModal(menuContentId,'EDIT_POST')
      closeMenu();
    }
  



  return (
    <div>
      <div id="menu-wrapper" className="overlay all-centered">
        <div id="menu" ref={menuRef}>
          {postOwnerId === userId && (
            <button onClick={handleDeletePost} style={{ color: "red" }}>
              {loading ? "Deleting ..." : "Delete"}
            </button>
          )}
          {postOwnerId === userId && <button onClick={handleEditPost}>edit</button>}
          <button>go to post</button>
          <button onClick={closeMenu}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
