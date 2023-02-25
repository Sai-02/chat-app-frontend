import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createChatAPI,
  getChatListAPI,
  getMessagesListAPI,
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
}

// Define the initial state using that type
const initialState: IChatState = {
  chatList: [],
  chatListLength: 0,
  status: STATUS.IDLE,
  activeChatID: "",
  chatMap: {},
  activeChatMessages: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatList.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.chatList = action?.payload?.chats;
        state.chatListLength = action?.payload?.size;
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
        if (action.payload.messages) {
          const map = state.chatMap;
          const obj = { ...map };
          const chatID: any = state.activeChatID;
          obj[chatID] = action.payload.messages;
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
      });
  },
});

export const chatActions = {
  ...chatSlice.actions,
  getChatList,
  getMessageList,
  sendMessage,
};

export default chatSlice.reducer;
