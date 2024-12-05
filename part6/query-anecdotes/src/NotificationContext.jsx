import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "setNotification": {
      console.log("action.payload :", action);
      return action.payload;
    }
    case "clearNotification":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export const setNotification = (dispatch, notification) => {
  dispatch({
    type: "setNotification",
    payload: notification,
  });
  setTimeout(() => {
    dispatch({
      type: "clearNotification",
    });
  }, 5000);
};
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
export default NotificationContext;
