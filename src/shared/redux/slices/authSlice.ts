import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getLoginAPI, getSignUpAPI } from "../../utils/api";
import { STATUS } from "../../utils/constant";
import { storeAccessToken } from "../../utils/helpers";
import { toast } from "react-hot-toast";

// Define a type for the slice state
interface IAuthState {
  value: number;
  status: string;
  authToken: string;
  user: any;
}

// Define the initial state using that type
const initialState: IAuthState = {
  value: 0,
  status: STATUS.IDLE,
  authToken: "",
  user: {},
};

interface IRegisterUserPayload {
  formData: any;
}
const registerUser = createAsyncThunk(
  "auth/register",
  async (payload: IRegisterUserPayload) => {
    const { formData } = payload;
    try {
      const user = await axios.post(getSignUpAPI(), formData, {
        headers: {
          "content-type": "multipart/form-data", // do not forget this
        },
      });
      return user.data;
    } catch (e: any) {
      if (e.response.data.msg) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
      throw e;
    }
  }
);

interface ILoginUserPayload {
  username: string;
  password: string;
}
const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: ILoginUserPayload, { rejectWithValue }) => {
    const { username, password } = payload;
    try {
      const user = await axios.post(getLoginAPI(), {
        username,
        password,
      });
      return user.data;
    } catch (e: any) {
      if (e.response.data.msg) {
        toast.error(e.response.data.msg);
      } else {
        toast.error("Something went wrong");
      }
      throw e;
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setUser(state, action: PayloadAction<object>) {
      state.user = action.payload;
    },
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.authToken = action?.payload?.token;
        storeAccessToken(action?.payload?.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = STATUS.FAILURE;
        throw action.error;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.authToken = action?.payload?.token;
        storeAccessToken(action?.payload?.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = STATUS.FAILURE;
        throw action.error;
      });
  },
});

export const authActions = {
  ...authSlice.actions,
  registerUser,
  loginUser,
};

export default authSlice.reducer;
