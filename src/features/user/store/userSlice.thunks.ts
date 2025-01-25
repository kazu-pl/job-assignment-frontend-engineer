import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "libs/axios/axiosInstance";
import { LoginUserRequest, UserResponse } from "types/conduit-api.types";

export const loginUser = createAsyncThunk("users/loginUser", async (data: LoginUserRequest, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<UserResponse>(`/users/login`, data);

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
