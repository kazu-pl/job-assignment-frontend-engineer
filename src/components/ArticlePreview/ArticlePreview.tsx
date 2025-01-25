import APP_PATHS from "constants/appPaths";
import { Link } from "react-router-dom";
import { Article } from "types/conduit-api.types";
import AuthorImage from "components/AuthorImage";
import { useAppDispatch } from "store/hooks";
import { favoriteArticle } from "features/articles/store/articlesSlice";

export interface ArticlePreviewProps {
  article: Article;
}

const ArticlePreview = ({ article }: ArticlePreviewProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handlefavoriteArticle = async (slug: string) => {
    try {
      dispatch(favoriteArticle(slug));
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div className="article-preview" key={article.createdAt}>
      <div className="article-meta">
        <AuthorImage imageUrl={article.author.image} to={APP_PATHS.PROFILE_SINGLE(article.author.username)} />
        <div className="info">
          <Link className="author" to={APP_PATHS.PROFILE_SINGLE(article.author.username)}>
            {article.author.username}
          </Link>
          <span className="date">{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        <button
          className="btn btn-outline-primary btn-sm pull-xs-right"
          onClick={() => handlefavoriteArticle(article.slug)}
        >
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <Link to={APP_PATHS.ARTICLE_SINGLE(article.slug)} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default ArticlePreview;
