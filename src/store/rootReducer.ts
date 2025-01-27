import { combineReducers } from "@reduxjs/toolkit";

import articlesReducer from "features/articles/store/articlesSlice";
import userReducer from "features/user/store/userSlice";
import profilesReducer from "features/profiles/store/profilesSlice";

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
  profiles: profilesReducer,
});

export default rootReducer;
