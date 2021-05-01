import { ProfileType } from "./../types/types";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "730a1fd8-635a-48d9-b9c3-ee7a75a456f6",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(id: number) {
    return instance.post(`follow/${id}`);
  },
  unfollow(id: number) {
    return instance.delete(`follow/${id}`);
  },
  getProfile(userID: number) {
    console.warn("Obsolete method. Please use profileAPI object");
    return profileAPI.getProfile(userID);
  },
};

export const profileAPI = {
  getProfile(userID: number) {
    return instance.get(`profile/${userID}`);
  },
  getStatus(userID: number) {
    return instance.get(`profile/status/${userID}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  savePhoto(photoFile: any) {
    let formData = new FormData();
    formData.append("image", photoFile);

    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile);
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptha {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

type LoginResponseType = {
  data: { userId: number };
  resultCode: ResultCodesEnum | ResultCodeForCaptha;
  messages: Array<string>;
};

export const authAPI = {
  authUser() {
    return instance.get<MeResponseType>(`auth/me`).then((res) => res.data);
  },
  login(
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) {
    return instance.post<LoginResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    }).then((res) => res.data);;
  },
  logout() {
    return instance.delete(`auth/login`);
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};
