import axios from "axios";
const loginUrl = "/api/login";

const setUserJson = (user) => {
  const userString = JSON.stringify(user);
  console.log(userString);
  window.localStorage.setItem("loggedUser", userString);
};
const getUserJson = () => {
  return JSON.parse(window.localStorage.getItem("loggedUser"));
};

const login = async (username, password) => {
  try {
    const response = await axios.post(loginUrl, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const logout = () => {
  window.localStorage.removeItem("loggedUser");
};
export default { login, setUserJson, getUserJson, logout };
