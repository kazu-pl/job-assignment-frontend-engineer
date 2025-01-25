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

export const articlesSlice = createSlice({
  name: "articles",
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

    builder.addCase(favoriteArticle.pending, () => {
      //
    });
    builder.addCase(favoriteArticle.fulfilled, (state, action) => {
      const favArticle = state.articlesList.data?.articles.find(
        article => article.slug === action.payload.article.slug
      );

      if (favArticle) {
        favArticle.favoritesCount += 1;
        favArticle.favorited = true;
      }

      if (state.singleArticle.data?.article.slug === action.payload.article.slug) {
        state.singleArticle.data.article.favoritesCount += 1;
        state.singleArticle.data.article.favorited = true;
      }
    });
    builder.addCase(favoriteArticle.rejected, () => {
      //
    });
    builder.addCase(unfavoriteArticle.pending, () => {
      //
    });
    builder.addCase(unfavoriteArticle.fulfilled, (state, action) => {
      const favArticle = state.articlesList.data?.articles.find(
        article => article.slug === action.payload.article.slug
      );

      if (favArticle) {
        if (favArticle.favoritesCount > 0) {
          favArticle.favoritesCount -= 1;
        }

        favArticle.favorited = false;
      }

      if (state.singleArticle.data?.article.slug === action.payload.article.slug) {
        if (state.singleArticle.data.article.favoritesCount > 0) {
          state.singleArticle.data.article.favoritesCount -= 1;
        }

        state.singleArticle.data.article.favorited = false;
      }
    });
    builder.addCase(unfavoriteArticle.rejected, () => {
      //
    });
  },
});

export default articlesSlice.reducer;

export const selectArticlesList = (state: RootState): ArticlesState["articlesList"] => state.articles.articlesList;
export const selectSingleArticle = (state: RootState): ArticlesState["singleArticle"] => state.articles.singleArticle;
