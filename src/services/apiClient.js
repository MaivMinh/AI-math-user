import axios from "axios";

const API_BASE_URL = "http://localhost:8080/";

/// Tạo instance tập trung.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
