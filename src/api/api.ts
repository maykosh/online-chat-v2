import axios from "axios";

export const instance = axios.create({
   baseURL: "https://social-network.samuraijs.com/api/1.0/",
   withCredentials: true,
   headers: {
      "API-KEY": `69e2314b-fa87-4e85-ab7f-0d69a969a623`,
   },
});
