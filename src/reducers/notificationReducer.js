export const initialNotificationState = {
  notification: null
};

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: {
          type: action.payload.type,
          content: action.payload.content,
        },
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
};
