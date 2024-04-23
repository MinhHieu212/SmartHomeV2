import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "https://smart-home-1-0.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
