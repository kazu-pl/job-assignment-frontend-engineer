import APP_PATHS from "constants/appPaths";
import { Link } from "react-router-dom";
import { Article } from "types/conduit-api.types";
import AuthorImage from "components/AuthorImage";
import FavoriteArticleBtn from "components/buttons/FavoriteArticleBtn";

export interface ArticlePreviewProps {
  article: Article;
}

const ArticlePreview = ({ article }: ArticlePreviewProps): JSX.Element => {
  return (
    <div className="article-preview" key={article.slug}>
      <div className="article-meta">
        <AuthorImage
          createdAt={article.createdAt}
          to={APP_PATHS.PROFILE_SINGLE(article.author.username)}
          username={article.author.username}
          imageUrl={article.author.image}
        />

        <FavoriteArticleBtn article={article} />
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
