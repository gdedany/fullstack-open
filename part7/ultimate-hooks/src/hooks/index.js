import { useState } from "react";
import axios from "axios";

const useResourse = (name) => {
  const baseUrl = `http://localhost:3005/${name}`;
  const [resourse, setResourse] = useState();
  const getAll = async () => {
    console.log(name);
    const response = await axios.get(baseUrl);
    setResourse(response.data);
  };

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);

    setResourse(resourse.concat(response.data));
  };

  const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    setResourse(resourse.concat(response.data));
  };
  const services = { getAll, create, update };
  return [resourse, services];
};
export default useResourse;
