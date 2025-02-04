import { instance } from "./api";
import { AuthMeType, GeneralizedType, LoginType } from "./api.types";

export const authAPI = {
   getAuthMe: async () => {
      const res = await instance.get<AuthMeType>(`auth/me`);
      return res.data;
   },
   login: async (
      email: string,
      password: number | string,
      rememberMe: boolean = false
   ) => {
      const res = await instance.post<LoginType>(`auth/login`, {
         email,
         password,
         rememberMe,
      });
      return res.data;
   },
   logout: async () => {
      const res = await instance.delete<GeneralizedType>(`auth/login`);
      return res.data;
   },
};
