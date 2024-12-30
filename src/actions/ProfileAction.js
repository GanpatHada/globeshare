export const saveProfile = (dispatch, profile) =>
  dispatch({ type: "SET_PROFILE", payload: profile });
export const stopLoading = (dispatch) => dispatch({ type: "STOP_LOADING" });
