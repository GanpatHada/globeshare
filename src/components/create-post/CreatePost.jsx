import {useEffect, useReducer, useRef } from "react";
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
import Waiting from "../waiting/Waiting";
import { toast } from "react-toastify";
import { useUser } from "../../hooks/useUser";
import { createPost, editPost } from "../../services/PostService";
import { useModal } from "../../hooks/useModal";
import { usePosts } from "../../hooks/usePosts";

const CreatePostHeader = ({ mode }) => {
  const { closeModal } = useModal();
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

const CreatePostFooter = ({ state, dispatch, mode }) => {
  const { caption, images, emojiPopup } = state;
  const textRef = useRef(null);
  const inputRef=useRef(null);
  const emojiRef = useRef(null);
  const { user } = useUser();
  const { closeModal, modalContentId } = useModal();
  const { addPosts, editPostOnClient } = usePosts();

  const handleCaption = (e) => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    dispatch({ type: "SET_CAPTION", payload: e.target.value });
  };

  


  
  const closeEmojiPopup = () => dispatch({ type: "CLOSE_EMOJI" });
  useClickOutsideHandler(emojiRef, closeEmojiPopup);
  const startLoading = (loadingInfo) =>
    dispatch({ type: "START_LOADING", payload: loadingInfo });
  const stopLoading = () => dispatch({ type: "STOP_LOADING" });
  


  const handlePostSend = async () => {
    try {
      startLoading();
      const newPost = await createPost(user.userId, images, caption);
      addPosts([newPost]);
      closeModal();
      toast.success("added successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      dispatch({ type: "RESET_FIELDS" });
      stopLoading();
    }
  };

  const handlePostUpdate = async () => {
    try {
      startLoading();
      const editedPost = await editPost(modalContentId, images, caption);
      if (editedPost) {
        editPostOnClient(editedPost);
      }

      closeModal();
      toast.success("edited successfully");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      dispatch({ type: "RESET_FIELDS" });
      stopLoading();
    }
  };
  

  const handleEmojiClick = (obj) =>
    dispatch({ type: "SET_CAPTION", payload: caption.concat(obj.emoji) });
  return (
    <footer id="create-post-footer" ref={inputRef}>
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
        onClick={mode === "EDIT" ? handlePostUpdate : handlePostSend}
        id="create-post-send"
        disabled={caption.trim().length === 0 && images.length === 0}
        className="all-centered"
      >
        <IoMdSend />
      </button>
    </footer>
  );
};

const CreatePost = ({ mode, closeModal }) => {
  const [state, dispatch] = useReducer(
    createPostReducer,
    initialCreatePostState
  );
  const { posts } = usePosts();
  const { modalContentId } = useModal();

  useEffect(() => {
    if (mode === "EDIT") {
      const currentPost = posts.find((post) => post.postId === modalContentId);
      if (currentPost.images.length !== 0)
        currentPost.images.forEach((image) => {
          return dispatch({ type: "SET_IMAGES", payload: image });
        });
      dispatch({ type: "SET_CAPTION", payload: currentPost.caption });
    }
  }, [modalContentId,mode,posts]);
  

  const { loading } = state;
  return (
    <div id="create-post-box">
      {loading && <Waiting />}
      <CreatePostHeader mode={mode} closeModal={closeModal} />
      <CreatePostUploads state={state} dispatch={dispatch} />
      <CreatePostFooter state={state} dispatch={dispatch} mode={mode} />
    </div>
  );
};

export default CreatePost;
