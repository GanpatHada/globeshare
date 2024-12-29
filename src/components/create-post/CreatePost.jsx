import React, { useContext, useReducer, useRef } from "react";
import "./CreatePost.css";
import CrossButton from "../cross-button/CrossButton";
import UploadImage from "./components/upload-image/UploadImage";
import ImagePreview from "./components/image-preview/ImagePreview";
import { GrEmoji } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import {
  createPostReducer,
  initialCreatePostState,
} from "../../reducers/CreatePostReducer";
import EmojiPicker from "emoji-picker-react";
import useClickOutsideHandler from "../../hooks/useClickOutsideHandler";
import { saveImages, savePostData } from "../../services/CreatePostService";
import Waiting from "../waiting/Waiting";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";

const CreatePostHeader = ({ mode,closeModal }) => {
  return (
    <header id="create-post-header">
      <h2>{mode.charAt(0) + mode.slice(1).toLowerCase()} Post</h2>
      <span id="cr-btn" onClick={closeModal}>
        <CrossButton />
      </span>
    </header>
  );
};

const CreatePostUploads = ({ state, dispatch }) => {
  return (
    <section className="image-section">
      <UploadImage state={state} dispatch={dispatch} />
      {state.images.length !== 0 && (
        <ImagePreview state={state} dispatch={dispatch} />
      )}
    </section>
  );
};

const CreatePostFooter = ({ state, dispatch }) => {
  const{state:userState}=useContext(UserContext)
  const { caption, images, emojiPopup } = state;
  const textRef = useRef(null);
  const emojiRef = useRef(null);

  const handleCaption = (e) => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    dispatch({ type: "SET_CAPTION", payload: e.target.value });
  };
  const closeEmojiPopup = () => dispatch({ type: "CLOSE_EMOJI" });
  const startLoading=(loadingInfo)=>dispatch({type:'START_LOADING',payload:loadingInfo})
  const stopLoading=()=>dispatch({type:'STOP_LOADING'})

  const handlePostSend=async()=>{  
    try {
      startLoading()
      await savePostData(userState.user,images,caption);
      toast.success("Posted successfully")
    } catch (error) {
      toast.error("Something went wrong")
    }
    finally{
      dispatch({type:'RESET_FIELDS'})
      stopLoading();

    }
  }
  useClickOutsideHandler(emojiRef, closeEmojiPopup);

  const handleEmojiClick = (obj) =>
    dispatch({ type: "SET_CAPTION", payload: caption.concat(obj.emoji) });
  return (
    <footer id="create-post-footer">
      <button
        id="create-post-emoji"
        onClick={() => dispatch({ type: "OPEN_EMOJI" })}
        className="all-centered"
      >
        <GrEmoji />
      </button>
      {emojiPopup && (
        <div id="create-post-emoji-picker" ref={emojiRef}>
          <EmojiPicker height={"570px"} onEmojiClick={handleEmojiClick} />
        </div>
      )}
      <div id="create-post-caption">
        <textarea
          value={caption}
          onChange={handleCaption}
          ref={textRef}
          placeholder="Enter your caption here "
          id="create-post-text-area"
          rows={1}
        ></textarea>
      </div>

      <button
        onClick={handlePostSend}
        id="create-post-send"
        disabled={caption.trim().length === 0 && images.length === 0}
        className="all-centered"
      >
        <IoMdSend />
      </button>
    </footer>
  );
};

const CreatePost = ({ mode,closeModal}) => {
  const [state, dispatch] = useReducer(
    createPostReducer,
    initialCreatePostState
  );
  const{loading}=state;
  return (
    <div id="create-post-box">
      {loading && <Waiting/>}
      <CreatePostHeader mode={mode} closeModal={closeModal} />
      <CreatePostUploads state={state} dispatch={dispatch} />
      <CreatePostFooter state={state} dispatch={dispatch} />
    </div>
  );
};

export default CreatePost;
