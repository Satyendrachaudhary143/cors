import axios from "axios";

export const api = axios.create({
    baseURL: "https://cors-poif.vercel.app/api",
    withCredentials: true, // 🍪 cookies
});
