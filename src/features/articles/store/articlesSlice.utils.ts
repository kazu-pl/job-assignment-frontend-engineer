import { Article } from "types/conduit-api.types";

export const updateArticlesListOnFavChange = (
  articlesList: Article[] | undefined,
  slug: string,
  type: "+" | "-"
): void => {
  const favArticle = articlesList?.find(article => article.slug === slug);

  if (!favArticle) return;

  if (type === "+") {
    favArticle.favoritesCount += 1;
    favArticle.favorited = true;
  } else {
    favArticle.favoritesCount -= 1;
    favArticle.favorited = false;
  }
};
