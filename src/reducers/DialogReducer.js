export const initialDialogState = {
    isDialogOpen: false,
    dialogContentId: null,
    dialogContentType: null,
  };
  
  export function DialogReducer(state, action) {
    switch (action.type) {
      case "OPEN_DIALOG":
        return {
          ...state,
          dialogContentId: action.payload.dialogContentId,
          dialogContentType: action.payload.dialogContentType,
          isDialogOpen: true,
        };
      case "CLOSE_DIALOG":
        return { ...initialDialogState };
      default:
        return { ...state };
    }
  }
  