import axios from "axios";
import useUserStore from "@/store/user.tsx";

const axiosInstance = axios.create({
  baseURL: "/dev-api",
});

axiosInstance.interceptors.request.use((request) => {
  const token = useUserStore.getState().token;
  if (token)
    request.headers["Authorization"] = `Bearer ${
      useUserStore.getState().token
    }`;
  return request;
});
axiosInstance.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    useUserStore.getState().logout();
  }
  return response.data;
});

export default axiosInstance;
