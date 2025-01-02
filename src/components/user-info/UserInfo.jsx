import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import defaultProfile from "../../images/profile.png";
import { fetchUserBasicInfo } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const UserInfo = ({ userId, comment = false,closeOnClickUser=false }) => {
  const { user: me } = useUser();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ profilePhoto: null, userName: null });
  const navigate = useNavigate();

  const getUserBasicInfo = async () => {
    try {
      if (userId === me.userId)
        return setUser({ profilePhoto: me.profilePhoto, userName: "You" });
      const user = await fetchUserBasicInfo(userId);
      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = () => {
    navigate(`/profile/${userId}`);
    if(closeOnClickUser)
      closeOnClickUser();
  };

  useEffect(() => {
    getUserBasicInfo();
  }, []);

  return (
    <div className="user-basic-info">
      <div className="profile-photo">
        <img
          src={user.profilePhoto ? user.profilePhoto.url : defaultProfile}
          alt=""
        />
      </div>
      <div>
        <button onClick={handleUserClick} className="username">
          {loading
            ? "Loading ..."
            : user.userName
            ? user.userName
            : "not found"}
        </button>
        {comment &&  <span className="user-comment">{comment}</span>}
      </div>
    </div>
  );
};

export default UserInfo;
