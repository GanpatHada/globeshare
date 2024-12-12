import React, { useContext, useState } from 'react'
import './FeedCaption.css'
import { ModalContext } from '../../../../contexts/ModalContext';
import { PostContext } from '../../../../contexts/PostContext';
const FeedCaption = ({caption,postId}) => {
  const {openCommentsModal,showCommentsModal,setCurrentPost}=useContext(ModalContext)
  const [fullCaption, setFullCaption] = useState(caption.length<100);
  const{posts}=useContext(PostContext)
  let post=posts.find(post=>post.postId===postId)

  const handleCommentsModal=()=>{
    setCurrentPost(postId);
    openCommentsModal();
  }
  return (
    <div>
        <div className="caption">
          <p>{ fullCaption? caption : `${caption.substring(0, 100)} .....`}</p>
          {caption.length > 100 && (
            <button
              onClick={() => setFullCaption(!fullCaption)}
              className="show-more"
            >
              show {fullCaption ? "less" : "more"}
            </button>
          )}
        </div>
        <div>
          {!showCommentsModal&&post.comments.length!==0&&<button className="view-all-comments-btn" onClick={handleCommentsModal}>vew all {post.comments.length} comments</button>}
        </div>
    </div>
  )
}

export default FeedCaption