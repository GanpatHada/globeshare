import React, { useRef } from "react";
import "./CreatePost.css";
import { BsEmojiSmile, BsUpload } from "react-icons/bs";
import CrossButton from "../cross-button/CrossButton";

const CreatePost = () => {
  const textareaRef = useRef(null);

  const handleTextareaChange = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "30px"; // Reset the height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height based on scrollHeight
  };
  return (
    <div id="create-post-box">
      <div>
        <h1>Create Post</h1>
        <CrossButton/>
      </div>
      <section id="upload-image" className="all-centered">
        <label htmlFor="photo-upload" className="all-centered">
          <span>
            {" "}
            <BsUpload />
          </span>
          upload file
          <input type="file" id="photo-upload" style={{ display: "none" }} />
        </label>
      </section>
      <section id="caption">
        <textarea
          ref={textareaRef}
          onChange={handleTextareaChange}
          placeholder="What is in your mind"
          style={{ height: "55px", overflow: "hidden" }}
        />
        <button id="emoji-btn-main">
          <BsEmojiSmile />
        </button>
      </section>

      <span id="word-counter">10/200</span>
      <button id="post-btn">Post</button>
    </div>
  );
};

export default CreatePost;
