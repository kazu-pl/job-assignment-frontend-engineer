import { generateArticle } from "testUtils";
import { updateArticlesListOnFavChange } from "./articlesSlice.utils";
import { Article } from "types/conduit-api.types";

describe("articlesSlice.utils: updateArticlesListOnFavChange", () => {
  it("Should make no changes if provided new article doesn't match the ones from list", () => {
    const articles: Article[] = [generateArticle(1), generateArticle(2)];
    const newArticle = generateArticle(3);

    updateArticlesListOnFavChange(articles, newArticle);

    expect(articles).not.toContain(articles);
  });

  it("Should update list of articles as the new one matches elements from the list", () => {
    const articles: Article[] = [generateArticle(1), generateArticle(2)];
    const newArticle = generateArticle(2);

    updateArticlesListOnFavChange(articles, newArticle);

    expect(articles).toContain(newArticle);
  });

  it("Should update articles list on the correct index", () => {
    const articleToBeReplaced = generateArticle(2);
    const articles: Article[] = [generateArticle(1), articleToBeReplaced, generateArticle(3)];

    const indexOfOriginalArticle = articles.findIndex(article => article.slug === articleToBeReplaced.slug);

    const newArticle = generateArticle(2);

    updateArticlesListOnFavChange(articles, newArticle);

    const indexOfUpdatedArticle = articles.findIndex(article => article.slug === newArticle.slug);

    expect(indexOfOriginalArticle).toBe(indexOfUpdatedArticle);
  });
});
