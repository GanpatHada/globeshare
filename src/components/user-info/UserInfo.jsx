import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import defaultProfile from "../../images/profile.png";
import { fetchUserBasicInfo } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const UserInfo = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({profilePhoto:null,userName:null});
  const navigate=useNavigate()

  const getUserBasicInfo = async () => {
    try {
      const user = await fetchUserBasicInfo(userId);
      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick=()=>navigate(`/profile/${userId}`)

  useEffect(() => {
    getUserBasicInfo();
  }, []);

  return (
    <div className="user-basic-info">
      <div className='profile-photo'>
        <img src={user.profilePhoto?user.profilePhoto.url: defaultProfile} alt="" />
      </div>
      <button onClick={handleUserClick} className='username'>{loading?'Loading ...':user.userName?user.userName:'not found'}</button>
    </div>
  );
};

export default UserInfo;
