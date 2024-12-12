import React, { useContext, useEffect, useState } from "react";
import "./FeedHeader.css";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { db } from "../../../../assets/Firebase";
import { toast } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";
import defaultProfile from '../../../../images/profile.png'
import { ModalContext } from "../../../../contexts/ModalContext";
import { UserContext } from "../../../../contexts/UserContext";
const FeedHeader = ({ userId, time , postId }) => {
  const [userBasic, setUserBasic] = useState(null);
  const [timeDifference, setTimeDifference] = useState("");
  const {setCurrentPost,openEditMenu}=useContext(ModalContext)
  const {user}=useContext(UserContext);

  const handleMenuClick=()=>{
      setCurrentPost(postId);
      openEditMenu();
  }

  function getDateDifference(startDate, endDate) {
    const seconds = Math.floor(endDate / 1000 - startDate / 1000);
    if (seconds < 60) {
      return `${seconds} seconds`;
    }

    // Convert to minutes
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes`;
    }

    // Convert to hours
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours`;
    }

    // Convert to days
    const days = Math.floor(hours / 24);
    if (days < 31) {
      return `${days} days`;
    }

    // Convert to months
    const months = Math.floor(days / 31);
    if (months < 12) {
      return `${months} months`;
    }

    // Convert to years
    const years = Math.floor(months / 12);
    return `${years} years`;
  }

  const fetchBasicUserDetails = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserBasic(docSnap.data());
      } else {
        toast.error("Something went wrong a!");
      }
    } catch (error) {
      toast.error("something went wrong b");
    }
  };

  useEffect(() => {
    fetchBasicUserDetails(userId);
    setTimeDifference(getDateDifference(time, Date.now()));
  }, []);

  return (
    <header className="feed-headers">
      <div>
        <div className="feed-owner-image">
          <img src={userBasic?.profilePhoto?userBasic.profilePhoto:defaultProfile} alt="" />
        </div>
        <div className="feed-owner-name">
          <h5>{userBasic?.userName}</h5>
        </div>
        <div className="feed-time">{`${timeDifference} ago`}</div>
      </div>
      <div>
        <button onClick={handleMenuClick}>
            {userId===user.uid&&<BsThreeDots />}
        </button>
      </div>
    </header>
  );
};
export default FeedHeader;
