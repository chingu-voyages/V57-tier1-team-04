import axios from "axios";
import { useAuth } from "../components/context/AuthContext";

const axiosInstance= axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials:true,
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Token expired— logging out.");

      try {
        const { logout } = useAuth();
        logout?.();
      } catch(err) {
        console.log(err)
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;