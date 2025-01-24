import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "constants/env";
import { RootState } from "store";
import { MultipleArticlesResponse, SingleArticleResponse } from "types/conduit-api.types";

export interface ArticlesState {
  articlesList: {
    data: MultipleArticlesResponse | null;
    isFetching: boolean;
  };
  singleArticle: {
    data: SingleArticleResponse | null;
    isFetching: boolean;
  };
}

const initialState: ArticlesState = {
  articlesList: {
    data: null,
    isFetching: true,
  },
  singleArticle: {
    data: null,
    isFetching: true,
  },
};

export const fetchArticlesList = createAsyncThunk("articles/fetchArticlesList", async () => {
  const response = await axios.get<MultipleArticlesResponse>(`${API_URL}/articles`);
  return response.data;
});

export const fetchSingleArticle = createAsyncThunk("articles/fetchSingleArticle", async (slug: string) => {
  const response = await axios.get<SingleArticleResponse>(`${API_URL}/articles/${slug}`);
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
    // -----------------
    builder.addCase(fetchSingleArticle.pending, state => {
      state.singleArticle.isFetching = true;
    });
    builder.addCase(fetchSingleArticle.fulfilled, (state, action) => {
      state.singleArticle.isFetching = false;
      state.singleArticle.data = action.payload;
    });
    builder.addCase(fetchSingleArticle.rejected, state => {
      state.singleArticle.isFetching = false;
    });
  },
});

export default counterSlice.reducer;

export const selectArticlesList = (state: RootState): ArticlesState["articlesList"] => state.articles.articlesList;
export const selectSingleArticle = (state: RootState): ArticlesState["singleArticle"] => state.articles.singleArticle;
