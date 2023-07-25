import React, { useContext,useState } from "react";
import "./CreatePost.css";
import { toast } from "react-toastify";
import { collection,addDoc,} from "firebase/firestore";
import { db, storage} from "../../assets/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UserContext } from "../../contexts/UserContext";
import Loader from "../loader/Loader";
import UploadImageSection from "./components/upload-image-section/UploadImageSection";
import PreviewImageSection from "./components/preview-image-section/PreviewImageSection";
import CaptionSection from "./components/caption-section/CaptionSection";
import CrossButton from "../cross-button/CrossButton";
import { ModalContext } from "../../contexts/ModalContext";

const CreatePost = () => {
  const{closeCreatePostModal}=useContext(ModalContext)
  //refs
  //states
  const[loading,setLoading]=useState(false);
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const[loadingInfo,setLoadingInfo]=useState('')
  const{user,userDetails}=useContext(UserContext)
  //fuctions



  const handlePostClick = async () => {
    try {
      setLoading(true);
      const imageUrls=[];
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
        await addDoc(collection(db, "posts"), {
        user: user.uid,
        userImage:userDetails.profilePic,
        userName:userDetails.userName,
        caption:caption,
        images:imageUrls,
        likes:[],
        comments:[]
      });
      setLoading(false)
      setLoadingInfo('')
      closeCreatePostModal()
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
