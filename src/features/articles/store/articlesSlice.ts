import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "constants/env";
import { MultipleArticlesResponse } from "types/conduit-api.types";

export interface CounterState {
  data: MultipleArticlesResponse | null;
  isFetching: boolean;
}

const initialState: CounterState = {
  data: null,
  isFetching: true,
};

export const fetchArticles = createAsyncThunk("counter/fetchArticles", async () => {
  const response = await axios.get<MultipleArticlesResponse>(`${API_URL}/articles`);
  return response.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // increment: state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: builder => {
    builder.addCase(fetchArticles.pending, state => {
      state.isFetching = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
    });
    builder.addCase(fetchArticles.rejected, state => {
      state.isFetching = false;
    });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
