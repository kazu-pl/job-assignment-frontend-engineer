const APP_PATHS = {
  EDITOR_LIST: "/editor",
  EDITOR_SINGLE: (slug: string): string => `/editor/${slug}`,
  LOGIN: "/login",
  LOGOUT: "/logout",
  PROFILE_SINGLE: (username: string): string => `/profile/${username}`,
  PROFILE_SINGLE_FAV: (username: string): string => `/profile/${username}/favorites`,
  REGISTER: "/register",
  SETTINGS: "/settings",
  ARTICLE_SINGLE: (slug: string): string => `/${slug}`,
  ARTICLE_LIST: "/",
};

export default APP_PATHS;
