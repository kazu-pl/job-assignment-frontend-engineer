import {
  fetchProfile,
  fetchArticlesWrittenByProfile,
  selectProfile,
  selectArticlesWrittenByProfile,
} from "features/profiles/store/profilesSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import FollowProfileButton from "../components/FollowProfileButton";
import AuthorImage from "components/AuthorImage";
import ArticlePreview from "components/ArticlePreview";

export default function Profile(): JSX.Element {
  const { username } = useParams<{ username: string }>();

  const { data: profileData, isLoading: isLoadingProfile } = useAppSelector(selectProfile);
  const { data: profileArticlesData, isLoading: isLoadingProfileArticles } =
    useAppSelector(selectArticlesWrittenByProfile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile(username));
    dispatch(fetchArticlesWrittenByProfile(username));
  }, [dispatch, username]);

  return (
    <>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* Add "active" class when you're on that page" */}
              <a className="nav-link active" href="/#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/editor">
                <i className="ion-compose" />
                &nbsp;New Article
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/login">
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/register">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              {!isLoadingProfile && profileData && (
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <AuthorImage imageUrl={profileData.profile.image} className="user-img" />
                  <h4>{profileData.profile.username}</h4>
                  <p>{profileData.profile.bio}</p>
                  {/* <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round" />
                    &nbsp; Follow Eric Simons
                  </button> */}
                  <FollowProfileButton />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {!isLoadingProfileArticles &&
                profileArticlesData?.articles.map(article => <ArticlePreview article={article} key={article.slug} />)}
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