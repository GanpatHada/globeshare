export const initialCreatePostState = {
  loading: false,
  images: [],
  caption: "",
  loadingInfo: false,
  emojiPopup: false,
};

export function createPostReducer(state, action) {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        loading: true,
        loadingInfo: action.payload,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
        loadingInfo: "",
      };

    case "SET_IMAGES":
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    case "REMOVE_IMAGE":
      return {
        ...state,
        images: state.images.filter((_, index) => index !== action.payload),
      };
    case "SET_CAPTION":
      return {
        ...state,
        caption: action.payload,
      };
    case "RESET_FIELDS":
      return {
        ...initialCreatePostState,
      };
    case "OPEN_EMOJI":
      return {
        ...state,
        emojiPopup: true,
      };
    case "CLOSE_EMOJI":
      return {
        ...state,
        emojiPopup: false,
      };
  }
}
