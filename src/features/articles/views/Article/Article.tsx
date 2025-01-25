import AuthorImage from "components/AuthorImage";
import { fetchSingleArticle, selectSingleArticle } from "features/articles/store/articlesSlice";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Markdown from "react-markdown";
import APP_PATHS from "constants/appPaths";
import FavoriteArticleBtn from "components/FavoriteArticleBtn";
import Nav from "components/Nav";

export default function Article(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useAppSelector(selectSingleArticle);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSingleArticle(slug));
  }, [dispatch, slug]);

  return (
    <>
      <Nav />

      <div className="article-page">
        <div className="banner">
          {data && (
            <div className="container">
              <h1>{data.article.title}</h1>

              <div className="article-meta">
                <AuthorImage
                  imageUrl={data.article.author.image}
                  to={APP_PATHS.PROFILE_SINGLE(data.article.author.username)}
                />
                <div className="info">
                  <Link to={APP_PATHS.PROFILE_SINGLE(data.article.author.username)} className="author">
                    {data.article.author.username}
                  </Link>

                  <span className="date">{new Date(data.article.createdAt).toLocaleDateString()}</span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round" />
                  &nbsp; Follow {data.article.author.username} <span className="counter">(10)</span>
                </button>
                &nbsp;&nbsp;
                <FavoriteArticleBtn article={data.article} text="Favorite Post" isPulledToTheRight={false} />
              </div>
            </div>
          )}
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">{data && <Markdown>{data.article.body}</Markdown>}</div>
          </div>

          <hr />

          <div className="article-actions">
            {data && (
              <>
                <div className="article-meta">
                  <a href="/#/profile/ericsimmons">
                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                  </a>
                  <div className="info">
                    <a href="/#/profile/ericsimmons" className="author">
                      {data.article.author.username}
                    </a>
                    <span className="date">{new Date(data.article.createdAt).toLocaleDateString()}</span>
                  </div>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="ion-plus-round" />
                    &nbsp; Follow {data.article.author.username}
                  </button>
                  &nbsp;
                  {/* <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart" />
                    &nbsp; Favorite Post <span className="counter">(29)</span>
                  </button> */}
                  <FavoriteArticleBtn article={data.article} text="Favorite Post" isPulledToTheRight={false} />
                </div>
              </>
            )}
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="/#/profile/jacobschmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-edit" />
                    <i className="ion-trash-a" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <a href="/#" className="logo-font">
            conduit
          </a>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
            licensed under MIT.
          </span>
        </div>
      </footer>
    </>
  );
}
