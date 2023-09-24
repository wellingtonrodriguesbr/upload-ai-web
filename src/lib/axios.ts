import axios from "axios";

const baseURL = import.meta.env.VITE_API_URI;

export const api = axios.create({
  baseURL: "http://localhost:3333",
});
