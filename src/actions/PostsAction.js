export const savePosts = (dispatch, postsToBeSaved) =>
  dispatch({ type: "SET_POSTS", payload: postsToBeSaved });
export const startLoading = (dispatch) => dispatch({ type: "START_LOADING" });
export const stopLoading = (dispatch) => dispatch({ type: "STOP_LOADING" });
export const likePost = (dispatch, userId, postId) =>
  dispatch({ type: "LIKE_POST", payload: { userId, postId } });
export const unlikePost = (dispatch, userId, postId) =>
  dispatch({ type: "UNLIKE_POST", payload: { userId, postId } });
