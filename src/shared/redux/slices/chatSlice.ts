import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getChatListAPI,
  getCreateChatAPI,
  getMessagesListAPI,
  getSearchUsersAPI,
  getSendMessageAPI,
} from "../../utils/api";
import { STATUS } from "../../utils/constant";
import { toast } from "react-hot-toast";
import { getAccessToken } from "../../utils/helpers";

// Define a type for the slice state
interface IChatState {
  chatList: Array<any>;
  chatListLength: Number;
  status: string;
  activeChatID: string;
  chatMap: any;
  activeChatMessages: Array<any>;
  searchedUsers: Array<any>;
  personalChatMap: Array<any>;
}

// Define the initial state using that type
const initialState: IChatState = {
  chatList: [],
  chatListLength: 0,
  status: STATUS.IDLE,
  activeChatID: "",
  chatMap: {},
  activeChatMessages: [],
  searchedUsers: [],
  personalChatMap: [],
};

const getChatList = createAsyncThunk("chat/list", async () => {
  try {
    const res = await axios.get(getChatListAPI(), {
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
  } catch (e: any) {
    if (e.response.dasta.msg) {
      toast.error(e.response.data.msg);
    } else {
      toast.error("Something went wrong");
    }
    throw e;
  }
});

interface IGetMessageListPayload {
  chatID: String;
}
const getMessageList = createAsyncThunk(
  "message/list",
  async (payload: IGetMessageListPayload) => {
    try {
      const res = await axios.get(getMessagesListAPI(payload.chatID), {
        headers: {
          authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return { data: res.data, chatID: payload.chatID };
    } catch (e: any) {
      if (e?.response?.data?.msg) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
      throw e;
    }
  }
);

interface ISendMessagePayload {
  chatID: String;
  text: String;
}
const sendMessage = createAsyncThunk(
  "chat/message/send",
  async (payload: ISendMessagePayload) => {
    try {
      const res = await axios.post(
        getSendMessageAPI(),
        {
          chatID: payload.chatID,
          text: payload.text,
        },
        {
          headers: {
            authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      return res.data;
    } catch (e: any) {
      if (e?.response?.data?.msg) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
      throw e;
    }
  }
);

interface ISearchUsersPayload {
  username: string;
}

const searchUsers = createAsyncThunk(
  "users/search",
  async (payload: ISearchUsersPayload) => {
    try {
      const res = await axios.get(getSearchUsersAPI(payload.username), {
        headers: {
          authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return res.data;
    } catch (e: any) {
      if (e?.response?.data?.msg) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
      throw e;
    }
  }
);

interface ICreateChatPayload {
  name: string;
  members: Array<any>;
  admin: string;
  isGroup: boolean;
}
const createChat = createAsyncThunk(
  "chat/create",
  async ({ name, members, admin, isGroup }: ICreateChatPayload) => {
    try {
      const res = await axios.post(
        getCreateChatAPI(),
        {
          name,
          members,
          isGroup,
          admins: [admin],
        },
        {
          headers: {
            authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      return res.data;
    } catch (e: any) {
      if (e?.response?.data?.msg) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateActiveChatID: (state, action: PayloadAction<string>) => {
      state.activeChatID = action.payload;
    },
    updateChatMap: (state, action: any) => {
      state.chatMap = action.payload;
    },
    updateActiveChatMessages: (state, action: PayloadAction<Array<any>>) => {
      state.activeChatMessages = action.payload;
    },
    updateChatList: (state, action: PayloadAction<any>) => {
      state.chatList = action.payload;
    },
    updateChatListLength: (state, action: PayloadAction<any>) => {
      state.chatListLength = action.payload;
    },
    updateSearchedUsers: (state, action: PayloadAction<any>) => {
      state.searchedUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatList.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.chatList = action?.payload?.chatList;
        state.personalChatMap = action?.payload?.personalChatMap;
        state.chatListLength = action?.payload?.chatList.length;
        state.status = STATUS.SUCCESS;
      })
      .addCase(getChatList.rejected, (state, action) => {
        state.status = STATUS.FAILURE;
      })
      .addCase(getMessageList.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getMessageList.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        if (action.payload.data.messages) {
          const map = state.chatMap;
          const obj = { ...map };
          const chatID: any = action.payload.chatID;
          obj[chatID] = action.payload.data.messages;
          state.chatMap = obj;
        }
      })
      .addCase(getMessageList.rejected, (state, action) => {
        state.status = STATUS.FAILURE;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = STATUS.FAILURE;
      })
      .addCase(searchUsers.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.searchedUsers = action.payload.users;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.status = STATUS.FAILURE;
      })
      .addCase(createChat.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.status = STATUS.FAILURE;
      });
  },
});

export const chatActions = {
  ...chatSlice.actions,
  getChatList,
  getMessageList,
  sendMessage,
  searchUsers,
  createChat,
};

export default chatSlice.reducer;
