import "./PostsCard.css";
import {AiFillHeart} from 'react-icons/ai'
import {FaComment} from 'react-icons/fa'
import { useModal } from "../../hooks/useModal";
import { IoCopy} from "react-icons/io5";


const PostsCard = ({ post }) => {
  const{openModal}=useModal()
  const handlePostClick=()=>{
      openModal(post.postId,'POST_DETAILS')
  }
  return (
    <section id="user-posts-image" onClick={handlePostClick}>
      <div className="like-comment-box all-centered">
        <span><AiFillHeart/>{post.likes.length}</span>
        <span> <FaComment/>{post.comments.length}</span>
      </div>
      {post.images.length > 1 && (
        <div className="more-images-sign all-centered" >
          <IoCopy />
        </div>
      )}
      {post.images.length > 0 ? (
         <span><img src={post.images[0]} alt="..." /></span>
      ) : (
        <span className="post-caption">{post.caption}</span>
      )}
    </section>
  );
};

export default PostsCard;