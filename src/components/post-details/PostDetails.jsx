import { useRef, useEffect, useState } from "react";
import "./PostDetails.css";
import { MdMoreHoriz, MdOutlineCommentsDisabled } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import { getPostCreationDate } from "../../utils/PostsHelper";
import UserInfo from "../user-info/UserInfo";
import PostActions from "../post-actions/PostActions";
import DoComment from "../do-comment/DoComment";
import PostImages from "../post-images/PostImages";
import PostLikes from "../post-likes/PostLikes";
import { useModal } from "../../hooks/useModal";
import { useMenu } from "../../hooks/useMenu";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { getPostDetails } from "../../services/PostService";
import { toast } from "react-toastify";
import Loading from "../../images/loading2.gif";
import { usePosts } from "../../hooks/usePosts";

const PostComment = ({ userId, comment }) => (
  <div className="post-comment">
    <UserInfo userId={userId} comment={comment} />
  </div>
);

const PostDetails = (props) => {
  const { posts, addPosts } = usePosts();
  const postDetailsRef = useRef(null);
  const { modalContentId: contentId, closeModal } = useModal();
  const targetId = contentId || props.postId;
  const { openMenu } = useMenu();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleMenuClick = () => {
    const post = posts.find((p) => p.postId === targetId);
    if (post) openMenu(post.postId, "POST");
  };

  const handleBackButtonClick = () => {
    if (props.postId) return navigate(-1);
    return closeModal();
  };

  useEffect(() => {
    const postFromStore = posts.find((post) => post.postId === targetId);
    if (postFromStore) {
      setLoading(false);
    } else {
      const fetchPost = async () => {
        try {
          const post = await getPostDetails(targetId);
          if (post) {
            addPosts([post])
          }
        } catch (error) {
          toast.error("Unable to fetch post");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [posts, targetId, addPosts]);

  const currentPost = posts.find((post) => post.postId === targetId);

  if (!currentPost || loading) {
    return (
      <div className="all-centered loading">
        <img src={Loading} alt="Loading..." />
      </div>
    );
  }

  const { images, user, caption, comments, time, postId } = currentPost;

  return (
    <div id="post-details" ref={postDetailsRef}>
      <header>
        <button onClick={handleBackButtonClick}>
          <IoChevronBack />
        </button>
        <h1>{props.postId ? "Post" : "Comments"}</h1>
      </header>
      {images.length !== 0 && (
        <section className="image-section">
          <PostImages images={images} />
        </section>
      )}
      <section className="post-info-section">
        <header className="post-header">
          <UserInfo userId={user} />
          <button className="all-centered" onClick={handleMenuClick}>
            <MdMoreHoriz />
          </button>
        </header>
        <main className="post-comments">
          <div className="post-comment">
            <UserInfo userId={user} comment={caption} />
          </div>
          {comments.length === 0 ? (
            <div id="no-comments-box" className="all-centered">
              <span>
                <MdOutlineCommentsDisabled />
              </span>
              <p>No comments found</p>
            </div>
          ) : (
            <>
              {comments.map((comment) => (
                <PostComment
                  key={comment.commentId}
                  userId={comment.userId}
                  comment={comment.comment}
                />
              ))}
            </>
          )}
        </main>
        <PostActions post={currentPost} />
        <PostLikes post={currentPost} />
        <div className="post-time">
          <p>{getPostCreationDate(time)}</p>
        </div>
        <DoComment post={currentPost} />
      </section>
    </div>
  );
};

export default PostDetails;
