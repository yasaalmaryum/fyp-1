import axios from "axios";
import {BASE_URL} from "../../settings/settings";

//Create a new axios instance with a custom config.


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
})


export const axiosInstanceUnAuthorized = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
})

//Add a request interceptor


export default axiosInstance;