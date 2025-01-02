export const initialMenuState = {
  isMenuOpen: false,
  menuContentId: null,
  menuContentType: null,
};
export function menuReducer(state, action) {
  switch (action.type) {
    case "OPEN_MENU": {
      const { menuContentId, menuContentType } = action.payload;
      return {
        ...state,
        isMenuOpen: true,
        menuContentId,
        menuContentType,
      };
    }

    case "CLOSE_MENU" : return{...initialMenuState}
  }
}
