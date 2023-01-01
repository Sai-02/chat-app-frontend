import { CONSTANT_VALUE } from "./constant";

export const storeAccessToken = (accessToken: any) => {
  localStorage.setItem(CONSTANT_VALUE.AUTH_TOKEN, JSON.stringify(accessToken));
};

export const getAccessToken = () => {
  return localStorage.getItem(CONSTANT_VALUE.AUTH_TOKEN);
};
