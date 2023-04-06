export enum URL_PATHS {
  SIGNUP = "/signup",
  DASHBOARD = "/",
  LOGIN = "/login",
}

export enum CONSTANT_VALUE {
  AUTH_TOKEN = "authToken",
}

export enum STATUS {
  IDLE = "IDLE",
  LOADING = "LOADING",
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
}

export enum WINDOW_SIZE {
  SM = 640,
}

export enum SOCKET_EVENTS {
  CONNECT = "connect",
  SEND_MESSAGE = "send_message",
  RECIEVE_MESSAGE = "recieve_message",
  MARK_AS_READ = "/mark_as_read",
  GET_CHAT_LIST = "/get_chat_list",
}
