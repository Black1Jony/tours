import axios from "axios";

const api = axios.create({
    baseURL: "https://gallant-insight-production.up.railway.app", 
    withCredentials: false
});

export default api;