import React, { useEffect, useState } from "react";
import "./Followers.css";
import User from "../user/User";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../assets/Firebase";
import { toast } from "react-toastify";

const UserData = ({ userId }) => {
  const [userInfo, setUserInfo] = useState({});

  const fetchUserDetails = async (userId) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserInfo({ userId, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUserDetails(userId);
  }, []);

  return <User userInfo={userInfo} />;
};

const Followers = ({ modalFor, userProfile }) => {
  return (
    <div id="connections-modal">
      <h4 className="all-centered">{modalFor}</h4>
      <div>
        {userProfile[modalFor].map((user) => (
          <UserData key={user} userId={user} />
        ))}
      </div>
    </div>
  );
};

export default Followers;
