import axios from "axios";
import Cookies from "js-cookie";
const baseURL = import.meta.env.VITE_API_URL as string;

export const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");

  // 토큰이 필요한 요청인지 확인
  const isAuthRequest =
    config.url?.includes("/api/auth/login") ||
    config.url?.includes("/api/auth/verified-signup") ||
    config.url?.includes("/api/auth/verify-email-code") ||
    config.url?.includes("/api/auth/check-email");

  if (token && !isAuthRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
