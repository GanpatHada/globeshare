export const followUser = (dispatch, userIdToFollow) =>
  dispatch({ type: "FOLLOW_USER", payload: userIdToFollow});

export const unfollowUser = (dispatch, userIdToUnfollow) =>
  dispatch({ type: "UNFOLLOW_USER", payload: userIdToUnfollow });

export const saveUserDetails = (dispatch, user) =>
  dispatch({ type: "SET_USER", payload: user });

export const stopUserLoading = (dispatch) => 
    dispatch({ type: "STOP_LOADING" });
