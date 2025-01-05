export const followUser = (dispatch, userIdToFollow) =>
  dispatch({ type: "FOLLOW_USER", payload: userIdToFollow});

export const unfollowUser = (dispatch, userIdToUnfollow) =>
  dispatch({ type: "UNFOLLOW_USER", payload: userIdToUnfollow });

export const removeFollower=(dispatch,userIdToRemove)=>{
  dispatch({type:'REMOVE_FOLLOWER',payload:userIdToRemove})
}

export const addToBookmark=(dispatch,postId)=>
  dispatch({type:'ADD_TO_BOOKMARK',payload:postId})

export const removeFromBookmark=(dispatch,postId)=>
  dispatch({type:'REMOVE_FROM_BOOKMARK',payload:postId})

export const saveUserDetails = (dispatch, user) =>
  dispatch({ type: "SET_USER", payload: user });

export const stopUserLoading = (dispatch) => 
    dispatch({ type: "STOP_LOADING" });
