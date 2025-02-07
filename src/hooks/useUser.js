import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  addToBookmark,
  followUser,
  removeFollower,
  removeFromBookmark,
  removeUser,
  saveUserDetails,
  startUserLoading,
  stopUserLoading,
  unfollowUser,
} from "../actions/UserAction";

export const useUser = () => {
  const { state, dispatch } = useContext(UserContext);
  const { user, loading } = state;

  const followUserOnClient = (userIdToFollow) =>
    followUser(dispatch, userIdToFollow);

  const unFollowUserOnClient = (userIdToUnfollow) =>
    unfollowUser(dispatch, userIdToUnfollow);

  const removeFollowerOnClient = (userToRemove) =>
    removeFollower(dispatch, userToRemove);

  const addToBookmarkOnClient = (postId) => addToBookmark(dispatch, postId);
  const removeFromBookmarkOnClient = (postId) =>
    removeFromBookmark(dispatch, postId);

  const stopLoading = () => stopUserLoading(dispatch);
  const startLoading = () => startUserLoading(dispatch);

  const saveUser = (userDetails) => saveUserDetails(dispatch, userDetails);

  const logoutUser = () => removeUser(dispatch);

  return {
    user,
    loading,
    followUserOnClient,
    unFollowUserOnClient,
    startLoading,
    stopLoading,
    saveUser,
    addToBookmarkOnClient,
    removeFromBookmarkOnClient,
    removeFollowerOnClient,
    logoutUser,
  };
};
