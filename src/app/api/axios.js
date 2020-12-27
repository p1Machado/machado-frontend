import Axios from "axios";
export const baseURL = (Axios.defaults.baseURL = "/api");
Axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
Axios.interceptors.request.use(
  async function(config) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function(error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  },
);
