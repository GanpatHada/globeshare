export const savePosts = (dispatch, postsToBeSaved) =>
  dispatch({ type: "SET_POSTS", payload: postsToBeSaved });
export const startLoading = (dispatch) => dispatch({ type: "START_LOADING" });
export const stopLoading = (dispatch) => dispatch({ type: "STOP_LOADING" });
export const likePost = (dispatch, userId, postId) =>
  dispatch({ type: "LIKE_POST", payload: { userId, postId } });
export const unlikePost = (dispatch, userId, postId) =>
  dispatch({ type: "UNLIKE_POST", payload: { userId, postId } });
export const commentOnPost = (dispatch, comment, postId) => {
  dispatch({ type: "ADD_COMMENT", payload: { comment, postId } });
};
export const deletePost = (dispatch, postId) =>
  dispatch({ type: "DELETE_POST", payload: postId });

export const editPost = (dispatch, editedPost) =>
  dispatch({ type: "EDIT_POST", payload: editedPost });
