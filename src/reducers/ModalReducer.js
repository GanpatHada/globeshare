export const initialModalState = {
  isModalOpen: false,
  modalContentId: null,
  modalContentType: null,
};

export function modalReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        modalContentId: action.payload.modalContentId,
        modalContentType: action.payload.modalContentType,
        isModalOpen: true,
      };
    case "CLOSE_MODAL":
      return { ...initialModalState };
    default:
      return { ...state };
  }
}
