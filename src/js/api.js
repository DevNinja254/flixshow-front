import axios from "axios";

const api = axios.create({
    baseURL: "https://admin.kingstonemovies.xyz/api/v1/"
    // baseURL: "http://localhost:8000/api/v1/"
})

export default api;
export const config =  {
    headers: {
      'Authorization': '1012', // Send the custom token in the header
    },
  }