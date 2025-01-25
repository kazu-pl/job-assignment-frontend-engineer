import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "libs/axios/axiosInstance";
import { RootState } from "store";
import { MultipleArticlesResponse, SingleArticleResponse } from "types/conduit-api.types";

export const fetchArticlesList = createAsyncThunk("articles/fetchArticlesList", async () => {
  const response = await axiosInstance.get<MultipleArticlesResponse>(`/articles`);
  return response.data;
});

export const fetchSingleArticle = createAsyncThunk("articles/fetchSingleArticle", async (slug: string, thunkAPI) => {
  const token = (thunkAPI.getState() as RootState).user.data?.user.token;

  const response = await axiosInstance.get<SingleArticleResponse>(`/articles/${slug}`, {
    headers: { Authorization: `bearer ${token}` },
  });
  return response.data;
});

export const favoriteArticle = createAsyncThunk("articles/favoriteArticle", async (slug: string, thunkAPI) => {
  const token = (thunkAPI.getState() as RootState).user.data?.user.token;

  const response = await axiosInstance.post<SingleArticleResponse>(`/articles/${slug}/favorite`, undefined, {
    headers: { Authorization: `bearer ${token}` },
  });
  return response.data;
});

export const unfavoriteArticle = createAsyncThunk("articles/unfavoriteArticle", async (slug: string, thunkAPI) => {
  const token = (thunkAPI.getState() as RootState).user.data?.user.token;

  const response = await axiosInstance.delete<SingleArticleResponse>(`/articles/${slug}/favorite`, {
    headers: { Authorization: `bearer ${token}` },
  });
  return response.data;
});

export const fetchArticlesWrittenByProfile = createAsyncThunk(
  "articles/fetchArticlesWrittenByProfile",
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
