import axios from "axios";

export const api = axios.create({
    baseURL: "https://corsn.onrender.com/api", // ✅ backend
    withCredentials: true,                       // ✅ cookies
});
