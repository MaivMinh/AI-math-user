import axios from "axios";

const chatbotSerivce = axios.create({
  baseURL: "https://ai-math.moviereservation.software/api",
});

export default chatbotSerivce;
