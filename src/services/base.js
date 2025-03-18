import axios from "axios";

const base = axios.create({
  baseURL: "http://160.191.51.15:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default base;
