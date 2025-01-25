import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "libs/axios/axiosInstance";
import { RootState } from "store";
import { MultipleArticlesResponse, ProfileResponse } from "types/conduit-api.types";

export interface ProfilesState {
  profile: {
    data: ProfileResponse | null;
    isLoading: boolean;
  };
  articles: {
    data: MultipleArticlesResponse | null;
    isLoading: boolean;
  };
}

const initialState: ProfilesState = {
  profile: {
    data: null,
    isLoading: true,
  },
  articles: {
    data: null,
    isLoading: true,
  },
};

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

export const fetchArticlesWrittenByProfile = createAsyncThunk(
  "profiles/fetchArticlesWrittenByProfile",
  async (username: string, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).user.data?.user.token;

    const response = await axiosInstance.get<MultipleArticlesResponse>(`/articles`, {
      headers: { Authorization: `bearer ${token}` },
      params: {
        author: username,
      },
    });

    return response.data;
  }
);

export const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProfile.pending, state => {
      state.profile.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile.isLoading = false;
      state.profile.data = action.payload;
    });
    builder.addCase(fetchProfile.rejected, state => {
      state.profile.isLoading = false;
    });

    builder.addCase(followProfile.fulfilled, (state, action) => {
      state.profile.data = action.payload;
    });

    builder.addCase(unfollowProfile.fulfilled, (state, action) => {
      state.profile.data = action.payload;
    });

    // -----------------
    builder.addCase(fetchArticlesWrittenByProfile.pending, state => {
      state.articles.isLoading = true;
    });
    builder.addCase(fetchArticlesWrittenByProfile.fulfilled, (state, action) => {
      state.articles.isLoading = false;
      state.articles.data = action.payload;
    });
    builder.addCase(fetchArticlesWrittenByProfile.rejected, state => {
      state.articles.isLoading = false;
    });
  },
});

export default profilesSlice.reducer;

export const selectProfile = (state: RootState): ProfilesState["profile"] => state.profiles.profile;
export const selectArticlesWrittenByProfile = (state: RootState): ProfilesState["articles"] => state.profiles.articles;
