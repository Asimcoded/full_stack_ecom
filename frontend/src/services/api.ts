import { refreshToken } from "@/apis/auth.api.ts";
import axios from "axios";

let isRefreshing = false;
let failedQueue: any[] = [];

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) =>
    error ? prom.reject(error) : prom.resolve(token)
  );
  failedQueue = [];
};

/* ---------------- REQUEST INTERCEPTOR ---------------- */

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ---------------- RESPONSE INTERCEPTOR ---------------- */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshToken();
        console.log(data);
        
        const newToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        localStorage.setItem("accessToken", newToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        api.defaults.headers.common["Authorization"] =
          "Bearer " + newToken;

        processQueue(null, newToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;