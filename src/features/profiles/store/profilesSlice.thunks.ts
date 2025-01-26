import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "libs/axios/axiosInstance";
import { ProfileResponse } from "types/conduit-api.types";

export const fetchProfile = createAsyncThunk("profiles/fetchProfile", async (username: string) => {
  const response = await axiosInstance.get<ProfileResponse>(`/profiles/${username}`);

  return response.data;
});

export const followProfile = createAsyncThunk("profiles/followProfile", async (username: string) => {
  const response = await axiosInstance.post<ProfileResponse>(`/profiles/${username}/follow`);

  return response.data;
});

export const unfollowProfile = createAsyncThunk("profiles/unfollowProfile", async (username: string) => {
  const response = await axiosInstance.delete<ProfileResponse>(`/profiles/${username}/follow`);

  return response.data;
});
