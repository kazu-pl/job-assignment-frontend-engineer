import { useAppDispatch } from "store/hooks";
import { Article } from "types/conduit-api.types";
import { favoriteArticle, unfavoriteArticle } from "features/articles/store/articlesSlice.thunks";

export interface FavoriteArticleBtnProps {
  article: Article;
  /**
   * Additional text to be displayed between heart icon and fav count
   */
  text?: string;
  isPulledToTheRight?: boolean;
}

const FavoriteArticleBtn = ({ article, text, isPulledToTheRight = true }: FavoriteArticleBtnProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handlefavoriteArticle = async (slug: string) => {
    try {
      article.favorited ? dispatch(unfavoriteArticle(slug)) : dispatch(favoriteArticle(slug));
    } catch (err) {
      console.log({ err });
    }
  };
  //// className for button that should indicate the article / profile is fav:
  // btn-primary

  return (
    <button
      className={`btn ${article.favorited ? "btn-primary" : "btn-outline-primary"} btn-sm ${
        isPulledToTheRight ? "pull-xs-right" : ""
      } `}
      onClick={() => handlefavoriteArticle(article.slug)}
    >
      <i className="ion-heart" /> {text ? `${text} (${article.favoritesCount})` : article.favoritesCount}
    </button>
  );
};

export default FavoriteArticleBtn;
