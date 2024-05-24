import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "https://smart-home-1-0.onrender.com",
  // baseURL: "http://192.168.2.250:8000/",
  // baseURL: "https://a0ba-14-172-15-33.ngrok-free.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
