import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/dev-api'
})

axiosInstance.interceptors.request.use((request) => {
    return request
})
axiosInstance.interceptors.response.use((response) => {
    return response.data
})

export default axiosInstance