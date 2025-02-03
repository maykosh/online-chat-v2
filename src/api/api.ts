import axios from "axios";
import { ProfileType } from "../types/types";
import { AuthMeType, LoginType } from "./api.types";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": `69e2314b-fa87-4e85-ab7f-0d69a969a623`,
  },
});

export const userAPI = {
  getUsers: async (currentPage = 1, pageSize = 10) => {
    const res = await instance.get(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return res.data;
  },

  followUsers: async (userId: number) => {
    const res = await instance.post(`follow/${userId}`);
    return res.data;
  },

  unFollowUsers: async (userId: number) => {
    const res = await instance.delete(`follow/${userId}`);
    return res.data;
  },
};

export const authAPI = {
  getAuthMe: async () => {
    const res = await instance.get<AuthMeType>(`auth/me`);
    return res.data;
  },
  login: async (email: string, password: number | string, rememberMe: boolean = false) => {
    const res = await instance.post<LoginType>(`auth/login`, {
      email,
      password,
      rememberMe,
    });
    return res.data;
  },
  logout: async () => {
    const res = await instance.delete(`auth/login`);
    return res.data;
  },
};

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
    const res = await instance.put(`profile/status`, { status: status });
    return res.data;
  },
  savePhotosProfile: async (file: string) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); 
    return res.data;
  },
  updateProfile: async (data: ProfileType) => {
    const res = await instance.put(`profile`, data);
    return res.data;
  },
};
