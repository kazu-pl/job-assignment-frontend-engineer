import { Article, SingleArticleResponse } from "types/conduit-api.types";

export const updateArticlesListOnFavChange = (
  stateArticlesList: Article[] | undefined,
  payloadArticle: Article
): void => {
  if (!stateArticlesList) return;

  const matchingArticleIndex = stateArticlesList.findIndex(article => article.slug === payloadArticle.slug);

  if (matchingArticleIndex >= 0) {
    stateArticlesList[matchingArticleIndex] = payloadArticle;
  }
};

export const updateSingleArticleOnFavChange = (
  SingleArticleResponse: SingleArticleResponse | null,
  returnedArticle: Article
): void => {
  if (!SingleArticleResponse) return;

  if (SingleArticleResponse.article.slug === returnedArticle.slug) {
    SingleArticleResponse.article = returnedArticle;
  }
};
