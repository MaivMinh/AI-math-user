import axios from "axios";

const API_BASE_URL = "http://157.245.62.32:8080";

/// Tạo instance tập trung.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  timeout: 10000,
});

/// Interceptors cho request.
apiClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Interceptors cho response.
apiClient.interceptors.response.use((response) => {
  // Do something with response data
  if (response.data && response.data.status) {
    if (response.data.status === 401) {
      alert("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
    }
  }
  return response;
});

apiClient.getData = async (url, params = {}, config = {}) => {
  const response = await apiClient.get(url, {
    params,
    ...config,
  });
  return response.data;
};

apiClient.postData = async (url, data = {}, config = {}) => {
  const response = await apiClient.post(url, data, config);
  return response.data;
};

apiClient.putData = async (url, data = {}, config = {}) => {
  const response = await apiClient.put(url, data, config);
  return response.data;
};

apiClient.patchData = async (url, data = {}, config = {}) => {
  const response = await apiClient.patch(url, data, config);
  return response.data;
};

apiClient.deleteData = async (url, config = {}) => {
  const response = await apiClient.delete(url, config);
  return response.data;
};

export default apiClient;