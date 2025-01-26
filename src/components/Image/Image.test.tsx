import { render, screen } from "@testing-library/react";

import Image, { defaultAuthorImageUrl } from "./Image";

describe("<Image />", () => {
  it("Should use default image url if it wasn't provided via prop", () => {
    render(<Image />);

    const imgTag = screen.getByRole("img");

    expect(imgTag).toHaveAttribute("src", defaultAuthorImageUrl);
  });

  it("Should use the given image url instead of the default one", () => {
    const imgUrl = "my-url";

    render(<Image url={imgUrl} />);

    const imgTag = screen.getByRole("img");

    expect(imgTag).toHaveAttribute("src", imgUrl);
  });
});
