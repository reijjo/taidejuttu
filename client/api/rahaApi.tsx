import axios from "axios";
import { Tapahtuma } from "../utils/types";

// const baseUrl = "http://localhost:3001/rahat";
const baseUrl = "https://taidejuttu.onrender.com/rahat";

const getAllTapahtumat = async () => {
  const res = await axios.get<Tapahtuma[]>(baseUrl);
  return res.data;
};

const addNewTapahtuma = async (tapahtuma: Tapahtuma) => {
  const res = await axios.post<Tapahtuma>(baseUrl, tapahtuma);
  return res.data;
};

const etiTapahtuma = async (id: string) => {
  const res = await axios.get<Tapahtuma>(`${baseUrl}/${id}`);
  return res.data;
};

const updateTapahtuma = async (id: string, updated: Tapahtuma) => {
  console.log("id uus", id, updated);
  const res = await axios.put<Tapahtuma>(`${baseUrl}/${id}`, updated);
  return res.data;
};

const poistaTapahtuma = async (id: string) => {
  const res = await axios.delete<Tapahtuma>(`${baseUrl}/${id}`);
  return res.data;
};

const rahaApi = {
  getAllTapahtumat,
  addNewTapahtuma,
  etiTapahtuma,
  updateTapahtuma,
  poistaTapahtuma,
};

export default rahaApi;
