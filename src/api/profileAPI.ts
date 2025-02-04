import { Photos, ProfileType } from "@/types/types";
import { instance } from "./api";
import { GeneralizedType } from "./api.types";

export const profileAPI = {
   getUserProfile: async (userId: number) => {
      const res = await instance.get<ProfileType>(`profile/${userId}`);
      return res.data;
   },
   getStatus: async (userId: number) => {
      const res = await instance.get<string>(`profile/status/${userId}`);
      return res.data;
   },
   updateStatus: async (status: string) => {
      const res = await instance.put<GeneralizedType>(`profile/status`, { status: status });
      return res.data;
   },
   savePhotosProfile: async (file: Photos) => {
      const formData = new FormData();
      formData.append("image", file.large as string);
      const res = await instance.put<GeneralizedType>(`profile/photo`, formData, {
         headers: {
            "Content-Type": "multipart/form-data",
         },
      });
      return res.data;
   },
   updateProfile: async (data: ProfileType) => {
      const res = await instance.put<GeneralizedType>(`profile`, data);
      return res.data;
   },
};
