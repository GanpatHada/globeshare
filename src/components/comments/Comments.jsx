import { useContext, useEffect, useState } from "react";
import "./Comments.css";
import FeedHeader from "../../pages/feeds/components/feed-header/FeedHeader";
import FeedActions from "../../pages/feeds/components/feed-actions/FeedActions";
import FeedImage from "../../pages/feeds/components/feed-image/FeedImage";
import FeedCaption from "../../pages/feeds/components/feed-caption/FeedCaption";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../assets/Firebase";
import { toast } from "react-toastify";
import CommentBox from "../comment-box/CommentBox";
import { UserContext } from "../../contexts/UserContext";
import defaultProfile from '../../images/profile.png'
const EachComments = ({ comment: { comment, userId } }) => {
  const [user, setUser] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const { profilePhoto, userName } = docSnap.data();
        setUser({ profilePhoto, userName });
      }
    } catch (error) {
      toast.error("Could not fetch Users!");
    }
  };
  useEffect(() => {
    fetchUserDetails(userId);
  });

  return (
    <div className="each-comment">
      <header>
        <div className="profile-pic">
          <img src={user?.profilePhoto??defaultProfile} alt="" />
        </div>
        <div>
          <span>{user?.userName}</span>
          <div className="comment-text">{comment}</div>
        </div>
      </header>
    </div>
  );
};

const Comments = ({ currentPost, posts }) => {
  const{user:{uid}}=useContext(UserContext)
  const post = posts.find((eachPost) => eachPost.postId === currentPost);
  const { caption, likes, comments, images, user, time, postId } = post;
  return (
    <div id="comments-box">
      {images.length>0&&<section id="comment-image-section">
        <FeedImage images={images} />
      </section>}
      <section id="comments">
        <FeedHeader userId={user} time={time} postId={currentPost} />
        <FeedCaption caption={caption} post={post} />
        <section id="all-comments">
          {comments.map((comment) => {
            return <EachComments key={comment.commentId} comment={comment} />;
          })}
        </section>
        <FeedActions
          likes={likes}
          comments={comments}
          postId={postId}
          post={post}
        />
        <CommentBox postId={postId} userId={uid} />
      </section>
    </div>
  );
};

export default Comments;
