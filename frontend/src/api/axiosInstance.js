import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: true, // penting jika backend kirim refresh token lewat cookie HttpOnly
});

export default axiosInstance;