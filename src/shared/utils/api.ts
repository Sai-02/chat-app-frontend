const baseUrl = process.env.REACT_APP_BASE_URL;

export const getSignUpAPI = () => {
  return `${baseUrl}/auth/signup`;
};