export const open = (dispatch, ContentId, ContentType) =>
    dispatch({
      type: "OPEN_DIALOG",
      payload: {dialogContentId:ContentId,dialogContentType:ContentType },
    });
  export const close=(dispatch)=>dispatch({type:"CLOSE_DIALOG"})