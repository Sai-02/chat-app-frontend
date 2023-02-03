import { CONSTANT_VALUE } from "./constant";

export const storeAccessToken = (accessToken: any) => {
  localStorage.setItem(CONSTANT_VALUE.AUTH_TOKEN, JSON.stringify(accessToken));
};

export const getAccessToken = () => {
  const token = localStorage.getItem(CONSTANT_VALUE.AUTH_TOKEN);
  return token ? token : "";
};
