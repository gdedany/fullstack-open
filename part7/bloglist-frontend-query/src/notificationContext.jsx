import { useContext, createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "setNotification": {
      return action.payload;
    }
    case "removeNotification": {
      return null;
    }
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
export const showNotification = (dispatch, notification) => {
  dispatch({ type: "setNotification", payload: notification });
  setTimeout(() => dispatch({ type: "removeNotification" }), 3000);
};
export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};
