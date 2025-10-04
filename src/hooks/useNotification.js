import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";
import { hideNotification, showNotification } from "../actions/NotificationAction";

export const useNotification = () => {
  const { state, dispatch } = useContext(NotificationContext);
  const { notification } = state;

  const notify = (content, type = "info", duration = 3000) => {
    showNotification(dispatch, content, type);
    setTimeout(() => hideNotification(dispatch), duration);
  };
  const hide = () => hideNotification(dispatch);
  return { notification, notify, hide };
};
