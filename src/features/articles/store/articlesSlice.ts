import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "constants/env";
import { RootState } from "store";
import { MultipleArticlesResponse } from "types/conduit-api.types";

export interface ArticlesState {
  articlesList: {
    data: MultipleArticlesResponse | null;
    isFetching: boolean;
  };
}

const initialState: ArticlesState = {
  articlesList: {
    data: null,
    isFetching: true,
  },
};

export const fetchArticlesList = createAsyncThunk("articles/fetchArticlesList", async () => {
  const response = await axios.get<MultipleArticlesResponse>(`${API_URL}/articles`);
  return response.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArticlesList.pending, state => {
      state.articlesList.isFetching = true;
    });
    builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
      state.articlesList.isFetching = false;
      state.articlesList.data = action.payload;
    });
    builder.addCase(fetchArticlesList.rejected, state => {
      state.articlesList.isFetching = false;
    });
  },
});

export default counterSlice.reducer;

export const selectArticlesList = (state: RootState): ArticlesState["articlesList"] => state.articles.articlesList;
