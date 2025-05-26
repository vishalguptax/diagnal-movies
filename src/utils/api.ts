import { envs } from "@/constants/envs";

import axios, { type AxiosInstance } from "axios";

const baseURL = envs.API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL,
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
