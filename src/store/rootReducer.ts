import { combineReducers } from "@reduxjs/toolkit";

import articlesReducer from "features/articles/store/articlesSlice";
import userReducer from "features/user/store/userSlice";

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
});

export default rootReducer;
