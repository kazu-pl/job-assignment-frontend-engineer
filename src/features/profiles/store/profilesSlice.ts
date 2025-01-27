import { createSlice } from "@reduxjs/toolkit";
import { MultipleArticlesResponse, ProfileResponse } from "types/conduit-api.types";
import { fetchProfile, followProfile, unfollowProfile } from "./profilesSlice.thunks";

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
  },
});

export default profilesSlice.reducer;
