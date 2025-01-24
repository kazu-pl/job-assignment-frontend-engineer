import { combineReducers } from "@reduxjs/toolkit";

import articlesReducer from "features/articles/store/articlesSlice";

const rootReducer = combineReducers({
  articles: articlesReducer,
});

export default rootReducer;
