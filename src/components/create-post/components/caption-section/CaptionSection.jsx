import React, { useEffect, useRef, useState } from "react";
import "./CaptionSection.css";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import sendImage from "../../../../images/send.png";
const Emoji = ({ setCaption, caption, emojiMove}) => {
  return (
    <div className="emoji-picker" style={{ transform: emojiMove }}>
      <EmojiPicker
        height={400}
        width={600}
        onEmojiClick={(e) => setCaption(`${caption} ${e.emoji}`)}
      />
    </div>
  );
};

const CaptionSection = ({images,handlePostClick,caption,setCaption}) => {
  const textAreaRef=useRef(null)
  const [emojiMove, setEmojiMove] = useState("translateY(300px)");
  const handleTextareaChange = (e) => {
    setCaption(e.target.value);
    textAreaRef.current.style.height = "42px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };
  const closeEmoji = () => setEmojiMove("translateY(0px)");
  const openEmoji = () => setEmojiMove("translateY(300px)");
  
  const isDisabled=()=>(caption.trim().length===0&&images.length===0)


  useEffect(() => {
    textAreaRef.current.style.height = "42px";
  }, [textAreaRef]);
  return (
    <>
      <Emoji emojiMove={emojiMove} setCaption={setCaption} caption={caption} />
      <section id="caption">
        <button
          id="emoji-btn-main"
          onClick={emojiMove === "translateY(0px)" ? openEmoji : closeEmoji}
        >
          <BsEmojiSmile />
        </button>
        <textarea
          id="caption-input"
          ref={textAreaRef}
          onChange={handleTextareaChange}
          placeholder="What is in your mind!"
          maxLength={150}
          autoFocus={true}
          value={caption}
        />
        <button onClick={handlePostClick} className="secondary-btn" disabled={isDisabled()} id="post-btn">
          <img src={sendImage} alt=".." />
        </button>
      </section>
    </>
  );
};

export default CaptionSection;
