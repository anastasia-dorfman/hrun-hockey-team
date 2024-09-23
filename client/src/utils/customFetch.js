import axios from "axios";
// Use the environment variable for the base URL
const baseURL = import.meta.env.VITE_API_URL || "/api"; // Fallback to /api for local development
const customFetch = axios.create({
  baseURL,
  withCredentials: true,
});
export default customFetch;
