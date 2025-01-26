import { fireEvent, render, screen } from "@testing-library/react";

import APP_PATHS from "constants/appPaths";
import AuthorImage from "./AuthorImage";
import { RouterWrapper } from "testUtils";

describe("<ArticlePreview />", () => {
  it("Should redirect to correct page after link click", () => {
    const destinatedPath = APP_PATHS.PROFILE_SINGLE("john");

    render(
      <RouterWrapper>
        <AuthorImage createdAt="2025-01-26T14:51:36.346Z" to={destinatedPath} username="John" imageUrl="" />
      </RouterWrapper>
    );

    const { pathname } = window.location;
    expect(pathname).toBe("/");

    const link = screen.getAllByRole("link")[0];

    fireEvent.click(link, {});

    const { pathname: pathnameAfterClick } = window.location;

    expect(pathnameAfterClick).toBe(destinatedPath);
  });
});
