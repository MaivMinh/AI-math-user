import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default base;
