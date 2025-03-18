import axios from "axios";

const chatbotSerivce = axios.create({
  baseURL: "http://160.191.51.15:8000/api",
});

export default chatbotSerivce;
