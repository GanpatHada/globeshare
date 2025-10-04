export const showNotification = (dispatch, content, type = "info") =>
  dispatch({
    type: "SET_NOTIFICATION",
    payload: { content, type },
  });

export const hideNotification = (dispatch) =>
  dispatch({ type: "CLEAR_NOTIFICATION" });
