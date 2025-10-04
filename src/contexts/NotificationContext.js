import { createContext, useReducer } from "react";
import { initialNotificationState, notificationReducer } from "../reducers/notificationReducer";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialNotificationState);
  return (
    <NotificationContext.Provider
      value={{state,dispatch}}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

