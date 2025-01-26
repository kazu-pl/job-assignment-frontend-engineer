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

  const handlefavoriteArticle: React.MouseEventHandler<HTMLButtonElement> = () => {
    article.favorited ? dispatch(unfavoriteArticle(article.slug)) : dispatch(favoriteArticle(article.slug));
  };

  return (
    <button
      className={`btn btn-sm ${article.favorited ? "btn-primary" : "btn-outline-primary"} ${
        isPulledToTheRight ? "pull-xs-right" : ""
      } `}
      onClick={handlefavoriteArticle}
    >
      {text ? (
        <>
          <i className="ion-heart" /> {text} ({article.favoritesCount})
        </>
      ) : (
        <>
          <i className="ion-heart" /> {article.favoritesCount}
        </>
      )}
    </button>
  );
};

export default FavoriteArticleBtn;
