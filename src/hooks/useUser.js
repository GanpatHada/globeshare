import { useContext, useCallback } from "react";
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

  const followUserOnClient = useCallback(
    (userIdToFollow) => followUser(dispatch, userIdToFollow),
    [dispatch]
  );

  const unFollowUserOnClient = useCallback(
    (userIdToUnfollow) => unfollowUser(dispatch, userIdToUnfollow),
    [dispatch]
  );

  const removeFollowerOnClient = useCallback(
    (userToRemove) => removeFollower(dispatch, userToRemove),
    [dispatch]
  );

  const addToBookmarkOnClient = useCallback(
    (postId) => addToBookmark(dispatch, postId),
    [dispatch]
  );

  const removeFromBookmarkOnClient = useCallback(
    (postId) => removeFromBookmark(dispatch, postId),
    [dispatch]
  );

  const stopLoading = useCallback(
    () => stopUserLoading(dispatch),
    [dispatch]
  );

  const startLoading = useCallback(
    () => startUserLoading(dispatch),
    [dispatch]
  );

  const saveUser = useCallback(
    (userDetails) => saveUserDetails(dispatch, userDetails),
    [dispatch]
  );

  const logoutUser = useCallback(
    () => removeUser(dispatch),
    [dispatch]
  );

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