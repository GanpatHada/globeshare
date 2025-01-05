import React, { useState } from "react";
import "./MyFriends.css";
import { useDialog } from "../../../../hooks/useDialog";
import UserInfo from "../../../../components/user-info/UserInfo";
import { useUser } from "../../../../hooks/useUser";
import { followUser, removeUser, unfollowUser } from "../../../../services/UserService";
import { toast } from "react-toastify";
import { useProfile } from "../../../../hooks/useProfile";
import { isUserInMyFollowers, isUserInMyFollowing } from "../../../../utils/UserHelper";
import CrossButton from '../../../../components/cross-button/CrossButton'

const FriendList = ({ friend, mode }) => {
  const { closeDialog } = useDialog();
  const [loading, setLoading] = useState(false);
  const {
    user: { userId, followers, following },
    unFollowUserOnClient,followUserOnClient,removeFollowerOnClient
  } = useUser();
  const { profile } = useProfile();
  const handleUnfollowUser = async () => {
    try {
      setLoading(true);
      await unfollowUser(userId, friend);
      unFollowUserOnClient(friend);
    } catch (error) {
      toast.error("Unable to unfollow");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUser=async()=>{
    try {
      setLoading(true);
      await followUser(userId,friend);
      followUserOnClient(friend)
    } catch (error) {
      toast.error('unable to follow');
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  const handleRemoveFollower=async()=>{
    try {
      setLoading(true);
      await removeUser(userId,friend);
      removeFollowerOnClient(friend)

    } catch (error) {
      toast.error('Unable to remove')
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }

  const handleRemoveUser = async (friend) => {
    try {
      setLoading(true);
      await removeUser(userId, friend);
    } catch (error) {
      toast.error("Unable to remove");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div key={friend}>
      <UserInfo userId={friend} closeOnClickUser={closeDialog} />

      {/* for followers */}
      {mode === "FOLLOWERS" && friend!==userId &&
        (profile.userId === userId ? (
          <button className="secondary-btn" onClick={handleRemoveFollower}>{loading?'Wait':'Remove'}</button>
        ) : isUserInMyFollowing(following,friend) ? (
          <button className="secondary-btn" onClick={handleUnfollowUser}>{loading?'Wait ...':'Unfollow'}</button>
        ) : (
          <button className="primary-btn" onClick={handleFollowUser}>{loading?'Wait ...':'Follow'}</button>
        ))}

      {/* for following */}

      {mode === "FOLLOWING" &&  friend!==userId &&
        (isUserInMyFollowing(following,friend) ? (
          <button className="secondary-btn" onClick={handleUnfollowUser}>{loading?'Wait ...':'Unfollow'}</button>
        ) : (
          <button className="primary-btn" onClick={handleFollowUser}>{loading?'Wait ...':'Follow'}</button>
        ))}
    </div>
  );
};

const MyFriends = ({ mode }) => {
  const { profile } = useProfile();
  console.log(mode);
  console.log(profile);
  const{closeDialog} =useDialog()
  return (
    <div id="my-friends">
      <header className="dialog-header">
        <h1>{mode.charAt(0).concat(mode.slice(1).toLowerCase())}</h1>
        <CrossButton closeModal={closeDialog} />
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
