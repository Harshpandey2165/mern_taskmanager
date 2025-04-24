import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //Handle common errors globally here 
        if (error.response) {
            if(error.response.status === 401){
                //Handle unauthorized error
                window.location.href = "/login";
            }else if(error.response.status === 500){
                //Handle forbidden error
                console.log("Internal Server Error, Please try again later.");
            }
        }else if(error.code === "ECONNABORTED"){
            //Handle timeout error
            console.log("Request timed out, Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;