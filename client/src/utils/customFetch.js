import axios from "axios";
// Use the environment variable for the base URL
const baseURL = import.meta.env.VITE_API_URL || "/api"; // Fallback to /api for local development
const customFetch = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_URL || "/api",
=======
  baseURL,
>>>>>>> d9ba041aec579a3420a3ab4a0605a199783cb85e
  withCredentials: true,
});
export default customFetch;
