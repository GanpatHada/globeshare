import React, { useContext, useRef, useState } from "react";
import "./EditProfile.css";
import CrossButton from "../../components/cross-button/CrossButton";
import { UserContext } from "../../contexts/UserContext";
import Modal from "./components/modal/Modal";
const EditProfile = () => {
  const {userDetails,setUserDetails}=useContext(UserContext);
  const [updateDetails,setUpdateDetails]=useState(userDetails)
  const bio = useRef(null);

  const handleBioChange=(e)=>{
        bio.current.style.height = bio.current.scrollHeight + "px";
        onFieldChange('bio',e)
  }
 
  const onFieldChange=(field,e)=>{
       setUpdateDetails({...updateDetails,[field]:e.target.value})
  }

  return (
    <div id="edit-profile" className="all-centered">
      <Modal/>
      <div id="edit-profile-box">
        <h2>Edit Profile</h2>
        <div>
          <label htmlFor="profile-image" id="profile-image"><img src={updateDetails?.profilePic?updateDetails.profilePic:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} alt="" /></label>
          <div>
            <strong>{userDetails?.userName}</strong>
            <div><button id="profile-image-btn">{updateDetails?.profilePic?'Change':'Add'} profile photo</button></div>
          </div>
         
        </div>
        <div>
          <label htmlFor="name">
            <strong>user name</strong>
          </label>
          <div>
             <input id="name" value={updateDetails?.userName} onChange={(e)=>onFieldChange('userName',e)} type="text" />
             <span>username that to be displayed accross the globeshare enter the first name followed by space and then last name</span>
          </div>
          
        </div>
        <div>
          <label htmlFor="website">
            <strong>Website</strong>
          </label>
          <div>

          <input type="text" value={updateDetails?.website} onChange={(e)=>onFieldChange('website',e)} id="website" />
          <span>Enter the url of you personal website portfolio or any pages that you want to showcase</span>
          </div>
        </div>
        <div>
          <label htmlFor="bio">
            <strong>Bio</strong>
          </label>
          <div>
            <textarea
              value={updateDetails?.bio}
              id="bio"
              ref={bio}
              onChange={(e)=>handleBioChange(e)
              }
              style={{ minHeight: "80px" }}
            ></textarea>
          <span id="bio-counter">{updateDetails?.bio.length}/150</span>
          <span>Enter the bio about your interests and profession the bio should not be more than 150 words</span>
          </div>
        </div>
        <button className="profile-btns" id="upload-btn">Update</button>
        <button className="profile-btns" id="can-btn">Cancel</button>
      </div>
    </div>
  );
};

export default EditProfile;
