import axios from "axios";

export const api = axios.create({
    baseURL: "https://cors-poif.vercel.app/api", // ✅ backend
    withCredentials: true,                       // ✅ cookies
});
