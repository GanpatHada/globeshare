import React, { useState } from "react";
import "./MyFriends.css";
import { useDialog } from "../../../../hooks/useDialog";
import UserInfo from "../../../../components/user-info/UserInfo";
import { useUser } from "../../../../hooks/useUser";
import { removeUser, unfollowUser } from "../../../../services/UserService";
import { toast } from "react-toastify";
import { useProfile } from "../../../../hooks/useProfile";


const FriendList = ({friend,mode}) => {
  const{closeDialog}=useDialog();
  const[loading,setLoading]=useState(false);
  const{user:{userId},unFollowUserOnClient}=useUser();
  const handleUnfollowUser=async(friend)=>{
    try {
      setLoading(true);
      await unfollowUser(userId,friend);
      unFollowUserOnClient(friend);
    } catch (error) {
      toast.error('Unable to unfollow')
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }
  const handleRemoveUser=async(friend)=>{
    try {
      setLoading(true);
      await removeUser(userId,friend)
    } catch (error) {
      toast.error('Unable to remove')
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div key={friend}>
      <UserInfo userId={friend} closeOnClickUser={closeDialog} />
      {mode === "FOLLOWING" && <button className="secondary-btn" onClick={()=>handleUnfollowUser(friend)}>
               {loading?'Wait..':'Unfollow'}
      </button>}
      {mode==='FOLLOWERS' && <button className="secondary-btn" onClick={()=>handleRemoveUser(friend)}>
              {loading?'Wait..':'Remove'}
      </button>}
    </div>
  );
};

const MyFriends = ({ mode }) => {
  const {profile}=useProfile();
  console.log(mode);
  console.log(profile);
  return (
    <div id="my-friends">
      <header className="dialog-header">
        <h1>{mode.charAt(0).concat(mode.slice(1).toLowerCase())}</h1>
      </header>
      <div className="dialog-content">
        {profile[mode.toLowerCase()].map((friend) => {
          return <FriendList friend={friend} mode={mode} />;
        })}
      </div>
    </div>
  );
};

export default MyFriends;
