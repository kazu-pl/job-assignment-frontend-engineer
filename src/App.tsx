import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "./features/articles/views/Article";
import ArticleList from "./features/articles/views/ArticleList";
import Editor from "./Editor";
import LoginRegister from "./features/user/views/LoginRegister";
import Logout from "./features/user/views/Logout";
import Profile from "./features/profiles/views/Profile";
import Settings from "./Settings";

import APP_PATHS from "constants/appPaths";

function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path={APP_PATHS.EDITOR_LIST} exact component={Editor} />
        <Route path={APP_PATHS.EDITOR_SINGLE(":slug")} exact component={Editor} />
        <Route path={APP_PATHS.LOGIN} exact component={LoginRegister} />
        <Route path={APP_PATHS.LOGOUT} exact component={Logout} />
        <Route path={APP_PATHS.PROFILE_SINGLE(":username")} exact component={Profile} />
        <Route path={APP_PATHS.PROFILE_SINGLE_FAV(":username")} exact component={Profile} />
        <Route path={APP_PATHS.REGISTER} exact component={LoginRegister} />
        <Route path={APP_PATHS.SETTINGS} exact component={Settings} />
        <Route path={APP_PATHS.ARTICLE_SINGLE(":slug")} exact component={Article} />
        <Route path={APP_PATHS.ARTICLE_LIST} component={ArticleList} />
      </Switch>
    </Router>
  );
}

export default App;
