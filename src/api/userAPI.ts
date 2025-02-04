import { UserType } from "@/types/types";
import { instance } from "./api";
import { GeneralizedType } from "./api.types";

export const userAPI = {
   getUsers: async (currentPage = 1, pageSize = 10) => {
      const res = await instance.get<UserType>("users", {
         params: {
            page: currentPage,
            count: pageSize,
         },
      });
      return res.data;
   },

   followUsers: async (userId: number) => {
      const res = await instance.post<GeneralizedType>(`follow/${userId}`);
      return res.data;
   },

   unFollowUsers: async (userId: number) => {
      const res = await instance.delete<GeneralizedType>(`follow/${userId}`);
      return res.data;
   },
};
