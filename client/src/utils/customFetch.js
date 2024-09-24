import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || "/api";

const customFetch = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || "/api",
=======
  baseURL,
>>>>>>> main
  withCredentials: true,
});
export default customFetch;
