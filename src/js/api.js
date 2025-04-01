import axios from "axios";

const api = axios.create({
    baseURL: "https://admin.flixshow.xyz/api/v1/"
})

export default api;