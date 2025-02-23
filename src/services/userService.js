import axios from "axios";

const userService = axios.create({
  baseURL: "https://randomuser.me/api?page=1&results=10",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default userService;