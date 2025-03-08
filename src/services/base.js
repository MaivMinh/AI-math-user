import axios from "axios";

const base = axios.create({
  baseURL: "https://aimathprojectv2.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default base;
