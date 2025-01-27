import { RootState } from "store";
import { ArticlesState } from "./articlesSlice";

export const selectArticlesList = (state: RootState): ArticlesState["articlesList"] => state.articles.articlesList;
export const selectSingleArticle = (state: RootState): ArticlesState["singleArticle"] => state.articles.singleArticle;
export const selectArticlesWrittenByProfile = (state: RootState): ArticlesState["profileArticleList"] =>
  state.articles.profileArticleList;
