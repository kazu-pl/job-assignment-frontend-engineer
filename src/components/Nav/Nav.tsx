import APP_PATHS from "constants/appPaths";
import { selectUserData } from "features/user/store/userSlice.selectors";
import { Link } from "react-router-dom";
import { useAppSelector } from "store/hooks";

const Nav = (): JSX.Element => {
  const userData = useAppSelector(selectUserData);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={APP_PATHS.ARTICLE_LIST}>
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" class when you're on that page" */}
            <Link className="nav-link active" to={APP_PATHS.ARTICLE_LIST}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={APP_PATHS.EDITOR_LIST}>
              <i className="ion-compose" />
              &nbsp;New Article
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={APP_PATHS.SETTINGS}>
              <i className="ion-gear-a" />
              &nbsp;Settings
            </Link>
          </li>

          {!userData && (
            <li className="nav-item">
              <Link className="nav-link" to={APP_PATHS.LOGIN}>
                Sign in
              </Link>
            </li>
          )}

          {!userData && (
            <li className="nav-item">
              <Link className="nav-link" to={APP_PATHS.REGISTER}>
                Sign up
              </Link>
            </li>
          )}

          {userData && (
            <li className="nav-item">
              <span className="nav-link">Welcome, {userData.user.username}</span>
            </li>
          )}

          {userData && (
            <li className="nav-item">
              <Link className="nav-link" to={APP_PATHS.LOGOUT}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
