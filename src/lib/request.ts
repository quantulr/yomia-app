import axios from "axios";
import useUserStore from "@/store/user.tsx";
import { toast } from "react-toastify";

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
  if (response.data.code !== 200) {
    toast.error(response.data.msg ?? "error", {
      position: toast.POSITION.TOP_CENTER,
      theme: "colored",
    });
    return Promise.reject(new Error(response.data.msg ?? "error"));
  }
  return response.data;
});

export default axiosInstance;
