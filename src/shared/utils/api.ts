const baseUrl = process.env.REACT_APP_BASE_URL;

export const getSignUpAPI = () => {
  return `${baseUrl}/auth/signup`;
};
export const getLoginAPI = () => {
  return `${baseUrl}/auth/login`;
};

export const getCreateChatAPI = () => {
  return `${baseUrl}/chat/create`;
};
export const getChatListAPI = () => {
  return `${baseUrl}/chat/list`;
};

export const getMessagesListAPI = (chatID: String) => {
  return `${baseUrl}/message/list?chatID=${chatID}`;
};

export const getSendMessageAPI = () => {
  return `${baseUrl}/message/send`;
};

export const getSearchUsersAPI = (username: string) => {
  return `${baseUrl}/user/search?username=${username}`;
};
