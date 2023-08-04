import React, { useContext,useEffect,useState } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import { collection,addDoc, Timestamp,} from "firebase/firestore";
import { db, storage} from "../../assets/Firebase";
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

const CreatePost = () => {
  const{closeCreatePostModal}=useContext(ModalContext)
  const{ handleCreatePostInClient}=useContext(PostContext)
  //refs
  //states
  const[loading,setLoading]=useState(false);
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const[loadingInfo,setLoadingInfo]=useState('')
  const{user,userDetails}=useContext(UserContext)
  const navigate=useNavigate()
  //fuctions
   




  const handlePostClick = async () => {
    let postId=null;
    const imageUrls=[]
    try {
      setLoading(true);
      
      for(let image of images)
        {
          setLoadingInfo('Uploading Images ...')
          if(typeof(image)==='string')
          {
            imageUrls.push(image)
          }
          else
          {
           
          const storageRef = ref(storage, `${image.name}`);
          const snapshot = await uploadBytes(storageRef, image);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          imageUrls.push(downloadUrl) 
          }
                  
        }
        setLoadingInfo('Uploading data')
        const docRef=await addDoc(collection(db, "posts"), {
        user: user.uid,
        caption:caption,
        images:imageUrls,
        likes:[],
        comments:[],
        time:Date.now()
      });
      postId=docRef.id
      console.log(docRef)
      setLoading(false)
      setLoadingInfo('')
      closeCreatePostModal()
      handleCreatePostInClient({user:user.uid,caption:caption,images:imageUrls,likes:[],comments:[],time:Date.now(),postId})
      
      toast.success('Posted Successfully');
    } catch (error) {
        toast.error('Something went wrong!')
        console.log(error);
    }
    finally{
      setLoading(false)
    }


  }

  

  return (

    <div id="create-post-box">
      {
        loading&&<Loader info={loadingInfo}/>
      }
      <header>
        <h2>Create Post</h2>
        <span id="cr-btn" onClick={closeCreatePostModal}><CrossButton/></span>
      </header>
      <UploadImageSection images={images} setImages={setImages}/>
      <PreviewImageSection images={images} setImages={setImages}/>
      <CaptionSection images={images} handlePostClick={handlePostClick} caption={caption} setCaption={setCaption}/>
    </div>
  );
};

export default CreatePost;
