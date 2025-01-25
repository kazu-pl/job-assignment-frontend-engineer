import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "libs/axios/axiosInstance";
import { RootState } from "store";
import { ProfileResponse } from "types/conduit-api.types";

export const fetchProfile = createAsyncThunk("profiles/fetchProfile", async (username: string) => {
  const response = await axiosInstance.get<ProfileResponse>(`/profiles/${username}`);

  return response.data;
});

export const followProfile = createAsyncThunk("profiles/followProfile", async (username: string, thunkAPI) => {
  const token = (thunkAPI.getState() as RootState).user.data?.user.token;

  const response = await axiosInstance.post<ProfileResponse>(`/profiles/${username}/follow`, undefined, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response.data;
});

export const unfollowProfile = createAsyncThunk("profiles/unfollowProfile", async (username: string, thunkAPI) => {
  const token = (thunkAPI.getState() as RootState).user.data?.user.token;

  const response = await axiosInstance.delete<ProfileResponse>(`/profiles/${username}/follow`, {
    headers: { Authorization: `bearer ${token}` },
  });

  return response.data;
});
