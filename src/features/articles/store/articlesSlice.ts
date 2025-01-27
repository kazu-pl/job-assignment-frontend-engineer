import { createSlice } from "@reduxjs/toolkit";
import { MultipleArticlesResponse, SingleArticleResponse } from "types/conduit-api.types";
import { updateArticlesListOnFavChange, updateSingleArticleOnFavChange } from "./articlesSlice.utils";
import {
  favoriteArticle,
  fetchArticlesList,
  fetchArticlesWrittenByProfile,
  fetchSingleArticle,
  unfavoriteArticle,
} from "./articlesSlice.thunks";

export interface ArticlesState {
  articlesList: {
    data: MultipleArticlesResponse | null;
    isLoading: boolean;
  };
  singleArticle: {
    data: SingleArticleResponse | null;
    isLoading: boolean;
  };
  profileArticleList: {
    data: MultipleArticlesResponse | null;
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
  profileArticleList: {
    data: null,
    isLoading: true,
  },
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearSingleArticle(state) {
      state.singleArticle = initialState.singleArticle;
    },
  },
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
      updateArticlesListOnFavChange(state.articlesList.data?.articles, action.payload.article);
      updateSingleArticleOnFavChange(state.singleArticle.data, action.payload.article);
      updateArticlesListOnFavChange(state.profileArticleList.data?.articles, action.payload.article);
    });
    builder.addCase(favoriteArticle.rejected, () => {
      //
    });
    builder.addCase(unfavoriteArticle.pending, () => {
      //
    });
    builder.addCase(unfavoriteArticle.fulfilled, (state, action) => {
      updateArticlesListOnFavChange(state.articlesList.data?.articles, action.payload.article);
      updateSingleArticleOnFavChange(state.singleArticle.data, action.payload.article);
      updateArticlesListOnFavChange(state.profileArticleList.data?.articles, action.payload.article);
    });
    builder.addCase(unfavoriteArticle.rejected, () => {
      //
    });

    builder.addCase(fetchArticlesWrittenByProfile.pending, state => {
      state.profileArticleList.isLoading = true;
    });
    builder.addCase(fetchArticlesWrittenByProfile.fulfilled, (state, action) => {
      state.profileArticleList.isLoading = false;
      state.profileArticleList.data = action.payload;
    });
    builder.addCase(fetchArticlesWrittenByProfile.rejected, state => {
      state.profileArticleList.isLoading = false;
    });
  },
});

export const { clearSingleArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
