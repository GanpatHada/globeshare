import "./PostsCard.css";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useModal } from "../../hooks/useModal";
import { IoCopy } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks/usePosts";

const PostsCard = ({ post }) => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const { posts } = usePosts();

  
  const currentPost = posts.find((p) => p.postId === post.postId) || post;

  const handlePostClick = () => {
    const width = window.innerWidth;
    if (width < 768) {
      navigate(`/${currentPost.postId}`);
    } else {
      openModal(currentPost.postId, "POST_DETAILS");
    }
  };

  return (
    <section id="user-posts-image" onClick={handlePostClick}>
      <div className="like-comment-box all-centered">
        <span>
          <AiFillHeart /> {currentPost.likes.length}
        </span>
        <span>
          <FaComment /> {currentPost.comments.length}
        </span>
      </div>
      {currentPost.images.length > 1 && (
        <div className="more-images-sign all-centered">
          <IoCopy />
        </div>
      )}
      {currentPost.images.length > 0 ? (
        <span>
          <img src={currentPost.images[0]} alt="..." />
        </span>
      ) : (
        <span className="post-caption">{currentPost.caption}</span>
      )}
    </section>
  );
};

export default PostsCard;
