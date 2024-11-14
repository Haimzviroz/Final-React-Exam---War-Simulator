import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, RootState } from "../types/index";

// הגדרת טיפוס למצב ההתחלתי

interface UserStateType {
  user: null | User;
  status: string;
  error: string | null;
}
const initialState: UserStateType = {
  user: null,
  status: "idle",
  error: null,
};

export const fetchRegister = createAsyncThunk(
  "register/post",
  async (user: User) => {
    const response = await axios.post(
      "http://localhost:3000/auth/register/",
      user
    );
    return response.data;
  }
);
export const fetchlogin = createAsyncThunk(
  "login/post",
  async (user: { username: string; password: string }) => {
    const response = await axios.post(
      "http://localhost:3000/auth/login/",
      user
    );
    console.log(response.data);

    const token = response.data.token;
    localStorage.setItem("token", token);

    return response.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload) state.user = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "failed";
        state.error = "can not fetch posts";
      })
      .addCase(fetchlogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchlogin.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (action.payload) state.user = action.payload;
      })
      .addCase(fetchlogin.rejected, (state) => {
        state.status = "failed";
        state.error = "can not fetch posts";
      });
  },
});

// סלקטור עם טיפוס מדויק
export const selectUser = (state: RootState): User | null => state.user;
export default userSlice.reducer;
