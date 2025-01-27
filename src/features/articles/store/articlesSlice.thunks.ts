import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "libs/axios/axiosInstance";
import { MultipleArticlesResponse, SingleArticleResponse } from "types/conduit-api.types";

export const fetchArticlesList = createAsyncThunk("articles/fetchArticlesList", async () => {
  const response = await axiosInstance.get<MultipleArticlesResponse>(`/articles`);
  return response.data;
});

export const fetchSingleArticle = createAsyncThunk("articles/fetchSingleArticle", async (slug: string) => {
  const response = await axiosInstance.get<SingleArticleResponse>(`/articles/${slug}`);
  return response.data;
});

export const favoriteArticle = createAsyncThunk("articles/favoriteArticle", async (slug: string) => {
  const response = await axiosInstance.post<SingleArticleResponse>(`/articles/${slug}/favorite`);
  return response.data;
});

export const unfavoriteArticle = createAsyncThunk("articles/unfavoriteArticle", async (slug: string) => {
  const response = await axiosInstance.delete<SingleArticleResponse>(`/articles/${slug}/favorite`);
  return response.data;
});

export const fetchArticlesWrittenByProfile = createAsyncThunk(
  "articles/fetchArticlesWrittenByProfile",
  async (username: string) => {
    const response = await axiosInstance.get<MultipleArticlesResponse>(`/articles`, {
      params: {
        author: username,
      },
    });

    return response.data;
  }
);
