import React from "react";
import { render, screen } from "@testing-library/react";
import Post from ".";

describe(Post, () => {
  it("can render a post without crashing", () => {
    const examplePost = {
      event: "Test event",
      location: "Trondheim",
      price: 100,
      user: 1,
    };
    render(<Post post={examplePost} />);
    screen.getByText(examplePost.event);
  });
});
