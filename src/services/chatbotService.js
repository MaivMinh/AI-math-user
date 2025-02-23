import axios from "axios";

const chatbotSerivce = axios.create({
  baseURL: "http://167.71.204.248:8000/api/",
});

export default chatbotSerivce;