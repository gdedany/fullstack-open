const baseUrl = "http://localhost:3000/api/users";
import axios from "axios";
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  return `Bearer ${user.token}`;
};

const getAll = async () => {
  try {
    const token = getToken();
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.get(baseUrl, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
const getOne = async (id) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const response = await axios.get(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export default { getAll, getOne };
