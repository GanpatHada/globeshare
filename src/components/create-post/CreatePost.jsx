import React, { useContext, useEffect, useState } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../assets/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../loader/Loader";
import UploadImageSection from "./components/upload-image-section/UploadImageSection";
import PreviewImageSection from "./components/preview-image-section/PreviewImageSection";
import CaptionSection from "./components/caption-section/CaptionSection";
import CrossButton from "../cross-button/CrossButton";
import { ModalContext } from "../../contexts/ModalContext";
import { PostContext } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ mode}) => {
  const { closeCreatePostModal, closeEditPostModal, currentPost } =
    useContext(ModalContext);
  const { handleCreatePostInClient,handleUpdatePostInClient,posts} = useContext(PostContext);
  //refs
  //states

  const { user } = useContext(UserContext);
  //fuctions

  const handleCloseBtn = () => {
    if (mode === "EDIT") return closeEditPostModal();
    return closeCreatePostModal();
  };

  const getCurrentPost = () => {
    return posts.find((post) => post.postId === currentPost);
  };

  const getCaption = () => {
    if (mode === "EDIT") 
        return getCurrentPost().caption;
    return "";
  };

  const getImages = () => {
    if (mode === "EDIT") 
        return getCurrentPost().images;
    return [];
  };

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(getImages());
  const [caption, setCaption] = useState(getCaption());
  const [loadingInfo, setLoadingInfo] = useState("");

  const handlePostEditClick = async () => {
    const imageUrls = [];
    try {
      setLoading(true);
      for (let image of images) {
        setLoadingInfo("Updating Images ...");
        if (typeof image === "string") {
          imageUrls.push(image);
        } else {
          const storageRef = ref(storage, `${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadUrl);
        }
      }
      setLoadingInfo("Updating data");
      const postRef = doc(db, "posts", currentPost);
      await updateDoc(postRef, {
        images:imageUrls,
        caption,
      });
      toast.success('Post edited successfully')
      handleUpdatePostInClient(imageUrls,caption,currentPost)
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingInfo("");
      closeEditPostModal();
    }
  };

  const handlePostClick = async () => {
    let postId = null;
    const imageUrls = [];
    try {
      setLoading(true);

      for (let image of images) {
        setLoadingInfo("Uploading Images ...");
        if (typeof image === "string") {
          imageUrls.push(image);
        } else {
          const storageRef = ref(storage, `${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadUrl);
        }
      }
      setLoadingInfo("Uploading data");
      const docRef = await addDoc(collection(db, "posts"), {
        user: user.uid,
        caption: caption,
        images: imageUrls,
        likes: [],
        comments: [],
        time: Date.now(),
      });
      postId = docRef.id;
      handleCreatePostInClient({
        user: user.uid,
        caption: caption,
        images: imageUrls,
        likes: [],
        comments: [],
        time: Date.now(),
        postId,
      });

      toast.success("Posted Successfully");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
      setLoadingInfo("");
      closeCreatePostModal();
    }
  };
  return (
    <div id="create-post-box">
      {loading && <Loader info={loadingInfo} />}
      <header>
        <h2>{mode.charAt(0) + mode.slice(1).toLowerCase()} Post</h2>
        <span id="cr-btn" onClick={handleCloseBtn}>
          <CrossButton />
        </span>
      </header>
      <UploadImageSection images={images} setImages={setImages} />
      <PreviewImageSection images={images} setImages={setImages} />
      <CaptionSection
        images={images}
        handlePostClick={handlePostClick}
        caption={caption}
        setCaption={setCaption}
        mode={mode}
        handlePostEditClick={handlePostEditClick}
        currentPost={getCurrentPost()}
      />
    </div>
  );
};

export default CreatePost;
