import axios from "axios";

const chatbotSerivce = axios.create({
  baseURL: "http://localhost:8000/api",
});

export default chatbotSerivce;
