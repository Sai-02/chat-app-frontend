import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { createChatAPI, getChatListAPI } from "../../utils/api";
import { STATUS } from "../../utils/constant";
import { toast } from "react-hot-toast";
import { getAccessToken } from "../../utils/helpers";

// Define a type for the slice state
interface IChatState {
  chatList: Array<any>;
  chatListLength: Number;
  status: string;
  activeChatID: string;
}

// Define the initial state using that type
const initialState: IChatState = {
  chatList: [],
  chatListLength: 0,
  status: STATUS.IDLE,
  activeChatID: "",
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

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateActiveChatID: (state, action: PayloadAction<string>) => {
      state.activeChatID = action.payload;
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
      });
  },
});

export const chatActions = {
  ...chatSlice.actions,
  getChatList,
};

export default chatSlice.reducer;
