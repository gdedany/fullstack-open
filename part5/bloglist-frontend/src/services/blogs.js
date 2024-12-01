import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

const getAll = () => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const request = axios.get(baseUrl, config);

    return request.then((response) => response.data);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const create = async (newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};

const update = async (id, newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const request = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return request;
  } catch (error) {
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};
const deleteBlog = async (id, objectToDelete) => {
  try {
    const config = {
      headers: { Authorization: token },
      data: objectToDelete,
    };
    const request = await axios.delete(`${baseUrl}/${id}`, config);
    return request;
  } catch (error) {
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};
export default { setToken, getAll, create, update, deleteBlog };
