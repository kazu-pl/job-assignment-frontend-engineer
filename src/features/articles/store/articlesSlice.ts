import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "libs/axios/axiosInstance";
import { RootState } from "store";
import { MultipleArticlesResponse, SingleArticleResponse } from "types/conduit-api.types";

export interface ArticlesState {
  articlesList: {
    data: MultipleArticlesResponse | null;
    isLoading: boolean;
  };
  singleArticle: {
    data: SingleArticleResponse | null;
    isLoading: boolean;
  };
}

const initialState: ArticlesState = {
  articlesList: {
    data: null,
    isLoading: true,
  },
  singleArticle: {
    data: null,
    isLoading: true,
  },
};

export const fetchArticlesList = createAsyncThunk("articles/fetchArticlesList", async () => {
  const response = await axiosInstance.get<MultipleArticlesResponse>(`/articles`);
  return response.data;
});

export const fetchSingleArticle = createAsyncThunk("articles/fetchSingleArticle", async (slug: string) => {
  const response = await axiosInstance.get<SingleArticleResponse>(`/articles/${slug}`);
  return response.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArticlesList.pending, state => {
      state.articlesList.isLoading = true;
    });
    builder.addCase(fetchArticlesList.fulfilled, (state, action) => {
      state.articlesList.isLoading = false;
      state.articlesList.data = action.payload;
    });
    builder.addCase(fetchArticlesList.rejected, state => {
      state.articlesList.isLoading = false;
    });
    // -----------------
    builder.addCase(fetchSingleArticle.pending, state => {
      state.singleArticle.isLoading = true;
    });
    builder.addCase(fetchSingleArticle.fulfilled, (state, action) => {
      state.singleArticle.isLoading = false;
      state.singleArticle.data = action.payload;
    });
    builder.addCase(fetchSingleArticle.rejected, state => {
      state.singleArticle.isLoading = false;
    });
  },
});

export default counterSlice.reducer;

export const selectArticlesList = (state: RootState): ArticlesState["articlesList"] => state.articles.articlesList;
export const selectSingleArticle = (state: RootState): ArticlesState["singleArticle"] => state.articles.singleArticle;
