import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import { v4 as uuid } from 'uuid';
import miniLoader from '../../images/miniLoader.svg'
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import './CommentBox.css'
import useClickOutsideHandler from '../../hooks/useClickOutsideHandler'
import { useRef } from "react";
const CommentBox = ({postId,userId}) => {
    const emojiRef=useRef(null)
    const[emojiOpen,setEmojiOpen]=useState(false)
    const{handleCommentInServer}=useContext(PostContext)
    const[comment,setComment]=useState('')
    const[loading,setLoading]=useState(false)
    const handleComment=()=>{
       handleCommentInServer(comment,uuid(),userId,postId,setLoading)
       setComment('')
    }
    const closeEmoji=()=>setEmojiOpen(false)
    useClickOutsideHandler(emojiRef,closeEmoji)
     return (
        <div className="feed-comment-box">
         {emojiOpen&&<div className="emoji-box" ref={emojiRef}>
           <EmojiPicker onEmojiClick={(e)=>setComment(comment.concat(` ${e.emoji}`))} />
         </div>
         }
         <input type="text" placeholder="add a comment" value={comment} onChange={e=>setComment(e.target.value)} />
         <button disabled={comment.length===0} onClick={handleComment} className="post-btn">{
         loading?<img src={miniLoader} alt="..."/>:'Post'
   
         }</button>
         <button  className="emoji-btn" onClick={()=>setEmojiOpen(!emojiOpen)}>
           <BsEmojiSmile />
         </button>
       </div>
       
     );
   };
export default CommentBox  