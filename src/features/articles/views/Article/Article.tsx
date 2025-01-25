import AuthorImage from "components/AuthorImage";
import { clearSingleArticle } from "features/articles/store/articlesSlice";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Markdown from "react-markdown";
import APP_PATHS from "constants/appPaths";
import FavoriteArticleBtn from "components/buttons/FavoriteArticleBtn";
import Nav from "components/Nav";
import FollowProfileBtn from "components/buttons/FollowProfileBtn";
import { selectSingleArticle } from "features/articles/store/articlesSlice.selectors";
import { fetchSingleArticle } from "features/articles/store/articlesSlice.thunks";
import { fetchProfile } from "features/profiles/store/profilesSlice.thunks";
import { selectProfile } from "features/profiles/store/profilesSlice.selectors";

export default function Article(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { data: articleData } = useAppSelector(selectSingleArticle);
  const { data: profileData } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSingleArticle(slug));

    return () => {
      // we can make clean up here etc
      dispatch(clearSingleArticle());
    };
  }, [dispatch, slug]);

  useEffect(() => {
    if (!profileData && articleData) {
      dispatch(fetchProfile(articleData?.article.author.username));
    }
  }, [articleData, dispatch, profileData]);

  return (
    <>
      <Nav />

      <div className="article-page">
        <div className="banner">
          {articleData && (
            <div className="container">
              <h1>{articleData.article.title}</h1>

              <div className="article-meta">
                <AuthorImage
                  createdAt={articleData.article.createdAt}
                  to={APP_PATHS.PROFILE_SINGLE(articleData.article.author.username)}
                  username={articleData.article.author.username}
                  imageUrl={articleData.article.author.image}
                />
                <FollowProfileBtn />
                &nbsp;&nbsp;
                <FavoriteArticleBtn article={articleData.article} text="Favorite Post" isPulledToTheRight={false} />
              </div>
            </div>
          )}
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">{articleData && <Markdown>{articleData.article.body}</Markdown>}</div>
          </div>

          <hr />

          <div className="article-actions">
            {articleData && (
              <>
                <div className="article-meta">
                  <AuthorImage
                    createdAt={articleData.article.createdAt}
                    to={APP_PATHS.PROFILE_SINGLE(articleData.article.author.username)}
                    username={articleData.article.author.username}
                    imageUrl={articleData.article.author.image}
                  />
                  <FollowProfileBtn />
                  &nbsp;
                  <FavoriteArticleBtn article={articleData.article} text="Favorite Post" isPulledToTheRight={false} />
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
