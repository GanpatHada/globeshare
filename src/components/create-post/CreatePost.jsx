import React, { useEffect, useRef, useState } from "react";
import "./CreatePost.css";
import { BsEmojiSmile } from "react-icons/bs";
import CrossButton from "../cross-button/CrossButton";
import add_photo from "../../images/add_photo.svg";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";
import { getFirestore, collection, addDoc, updateDoc, setDoc } from "firebase/firestore";
import { db, storage, imageRef } from "../../assets/Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Translate, Try } from "@mui/icons-material";
const CreatePost = () => {
  //refs
  const textareaRef = useRef(null);
  const fileRef = useRef(null);

  //states
  const [caption, setCaption] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [images, setImages] = useState([]);

  //fuctions

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImages([...images, file]);
    fileRef.current.value = "";
  };

  const deletePreview = (index) => {
    setImages(images.filter((e, i) => i !== index));
  };



  const handlePostClick = async () => {
    if (images.length === 0 && caption.trim().length === 0)
      return toast.warning("Nothing to post");
    try {
      const imageUrls=[];
      for(let image of images)
        {
          const storageRef = ref(storage, `${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadUrl)         
        }

      const docRef = await addDoc(collection(db, "posts"), {
        user: uuid(),
        caption:caption,
        images:imageUrls,
        likes:[],
        comments:[{id:uuid(),comment:'nice pic'},{id:uuid(),comment:'cool'},{id:uuid(),comment:'awesome'}]
      });
      
        
      
      
    } catch (error) {
        console.log(error)
    }
    finally{
      console.log('closeLoading');
    }





 
  }
  const handleTextareaChange = (e) => {
    setCaption(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = "0px"; // Reset the height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height based on scrollHeight
  };

  return (
    <div id="create-post-box" onClick={() => setShowEmoji(false)}>
      <div>
        <h2>Create Post</h2>
      </div>
      <div
        id="emoji-picker-in-createPost"
        // style={{ display: showEmoji ? "block" : "none" }}
        style={{transform:showEmoji?'scale(1,1)':'scale(0,0)'}}
        onClick={(e) => e.stopPropagation()}
      >
        <EmojiPicker
          onEmojiClick={(emoji) => setCaption(caption.concat(emoji.emoji))}
        />
      </div>
      <section
        id="upload-image"
        className="all-centered"
        htmlFor="photo-upload"
      >
        <span>
          <img src={add_photo} alt="" />
        </span>
        <label
          htmlFor="photo-upload"
          style={{ display: images.length <= 4 ? "block" : "none" }}
          className="all-centered"
        >
          upload {images.length === 0 ? "image" : "more images"}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            id="photo-upload"
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange}
          />
        </label>
      </section>
      {images.length > 0 && (
        <section id="preview-section">
          {images.map((image, index) => {
            const objectUrl = URL.createObjectURL(image);

            return (
              <div className="each-preview" key={index}>
                <span
                  className="prev-cross-btn"
                  onClick={() => deletePreview(index)}
                >
                  <CrossButton />
                </span>
                <img src={objectUrl} alt={`Preview ${index}`} />
              </div>
            );
          })}
        </section>
      )}
      <section id="caption">
        <textarea
          ref={textareaRef}
          autoFocus={true}
          onChange={handleTextareaChange}
          placeholder="What is in your mind"
          style={{ overflow: "hidden", height: "55px" }}
          value={caption}
          maxLength={150}
        />
        <button
          id="emoji-btn-main"
          onClick={(e) => {
            e.stopPropagation();
            setShowEmoji(!showEmoji);
          }}
        >
          <BsEmojiSmile />
        </button>
      </section>

      <div id="word-counter" style={{color:caption.length===150&&'red'}}>{caption.length}/150</div>
      <div id="post-btn-wrapper">
        <button id="post-btn" onClick={handlePostClick}>
          Post
        </button>
        <button id="canc-btn">Cancel</button>
      </div>
    </div>
  );
};

export default CreatePost;
