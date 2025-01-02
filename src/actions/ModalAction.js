export const open = (dispatch, ContentId, ContentType) =>
  dispatch({
    type: "OPEN_MODAL",
    payload: {modalContentId:ContentId,modalContentType:ContentType },
  });
export const close=(dispatch)=>dispatch({type:"CLOSE_MODAL"})