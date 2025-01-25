import { createSlice } from "@reduxjs/toolkit";
import { UserResponse } from "types/conduit-api.types";
import { loginUser } from "./userSlice.thunks";

export interface UserState {
  data: UserResponse | null;
  isLoading: boolean;
}

const initialState: UserState = {
  data: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser(state) {
      state.data = null;
    },
  },
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

export const { logoutUser } = userSlice.actions;
