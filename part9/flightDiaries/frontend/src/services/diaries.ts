import { DiaryEntry, NewDiaryEntry } from "../types";
import axios from "axios";
const backendUrl = "http://localhost:3000/api/diaries";
const getAll = (): Promise<DiaryEntry[]> => {
  return axios
    .get<DiaryEntry[]>(backendUrl)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

const create = (newEntry: NewDiaryEntry): Promise<DiaryEntry> => {
  return axios.post(backendUrl, newEntry).then((response) => response.data);
};
export default { getAll, create };
