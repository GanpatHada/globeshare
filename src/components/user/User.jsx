import React, { useContext, useEffect, useState } from "react";
import defaultProfilePhoto from "../../images/profile.png";
import "./User.css";
import { followUser } from "../../services/UserService";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const User = ({ user: { profilePhoto, userName, userId } }) => {
  const navigate=useNavigate()
  const { state, dispatch } = useContext(UserContext);
  const[buttonText,setButtonText]=useState('Follow');
  const handleActionOnUser = async () => {
   try {
      setButtonText('Following...');
      await followUser(state.user, userId);
      dispatch({type:'ADD_FOLLOWING',payload:userId})
      toast.success('Started following '+userName);
   } catch (error) {
      toast.error('Unable to follow at the moment')
   }
   finally{
      setButtonText('Follow')
   }
    
  };

  const handleUserClick=()=>navigate(`/profile/${userId}`)

  return (
    <div className="user-box">
      <div>
        <div className="user-profile-photo">
          <img
            src={profilePhoto ? profilePhoto.url : defaultProfilePhoto}
            alt=""
          />
        </div>

        <button className="user-name-button" onClick={handleUserClick}>
          <span>{userName}</span>
        </button>
      </div>
      <button className="user-action" onClick={handleActionOnUser}>
      {buttonText}
      </button>
    </div>
  );
};

export default User;
