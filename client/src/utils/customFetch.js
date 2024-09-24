import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || "/api";

const customFetch = axios.create({
  baseURL,
  withCredentials: true,
});
export default customFetch;
