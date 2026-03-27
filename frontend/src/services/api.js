import axios from "axios";

// Base URL of your backend
const API = axios.create({
  baseURL: "https://chatppt-eob3.onrender.com/",
});

// Automatically add token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// CHAT
export const sendMessage = (data) => API.post("/chat", data);
