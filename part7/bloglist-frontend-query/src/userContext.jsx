import { useContext, createContext, useReducer } from "react";
import blogService from "./services/blogs";
const userReducer = (state, action) => {
  switch (action.type) {
    case "setUser": {
      blogService.setToken(action.payload.token);
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
      return action.payload;
    }
    case "removeUser": {
      return null;
    }
    default:
      return state;
  }
};
const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
export const initializeUser = (dispatch) => {
  const user = localStorage.getItem("loggedUser");
  if (user) {
    const userJson = JSON.parse(user);
    dispatch({ type: "setUser", payload: userJson });
  }
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};
