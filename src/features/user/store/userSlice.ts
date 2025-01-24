import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "libs/axios/axiosInstance";
import { LoginUserRequest, UserResponse } from "types/conduit-api.types";

export interface UserState {
  data: UserResponse | null;
  isLoading: boolean;
}

const initialState: UserState = {
  data: null,
  isLoading: true,
};

export const loginUser = createAsyncThunk("users/loginUser", async (data: LoginUserRequest) => {
  const response = await axiosInstance.post<UserResponse>(`/users/login`, data);

  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(loginUser.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;