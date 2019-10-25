import axios from "axios";
import { AUTH_TOKEN } from "../constants";

const instance = axios.create();

instance.defaults.baseURL = process.env.REACT_APP_API_URL;

instance.interceptors.request.use(
  async config => {
    console.log("Interceptor")
    const token = await window.localStorage.getItem(AUTH_TOKEN);
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

function client(endpoint, { method = "get", data, options } = {}) {
  return instance[method](endpoint, data, options);
}

export default client;