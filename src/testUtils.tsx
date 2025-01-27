import { BrowserRouter } from "react-router-dom";
import { Article } from "types/conduit-api.types";

export const RouterWrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export const generateArticle = (index: number): Article => ({
  author: {
    bio: "",
    following: false,
    image: "",
    username: "username-name" + index,
  },
  body: "",
  createdAt: "",
  description: "",
  favorited: false,
  slug: "article-slug" + index,
  favoritesCount: 0,
  tagList: [],
  title: "article title",
  updatedAt: "",
});
