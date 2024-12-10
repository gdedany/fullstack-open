import axios from "axios";
const baseUrl = "/api/blogs";

const getToken = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  return `Bearer ${user.token}`;
};

const getAll = () => {
  try {
    const config = {
      headers: { Authorization: getToken() },
    };
    const request = axios.get(baseUrl, config);

    return request.then((response) => response.data);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
const getOne = (id) => {
  try {
    const config = {
      headers: { Authorization: getToken() },
    };
    const request = axios.get(`${baseUrl}/${id}`, config);

    return request.then((response) => response.data);
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const create = async (newObject) => {
  try {
    const config = {
      headers: { Authorization: getToken() },
    };
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};

const update = async (newObject) => {
  try {
    const config = {
      headers: { Authorization: getToken() },
    };
    const request = await axios.put(
      `${baseUrl}/${newObject.id}`,
      newObject,
      config
    );
    return request;
  } catch (error) {
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};
const deleteBlog = async (id, objectToDelete) => {
  try {
    const config = {
      headers: { Authorization: getToken() },
      data: objectToDelete,
    };
    const request = await axios.delete(`${baseUrl}/${id}`, config);
    return request;
  } catch (error) {
    const errorMessage = error.response?.data?.error;
    throw new Error(errorMessage);
  }
};
export default { getOne, getAll, create, update, deleteBlog };
