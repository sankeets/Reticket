import React from "react";
import ReactDOM from "react-dom";
import { AddIcon } from "@chakra-ui/icons";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import NavLink from "..";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("renders withour crashing", () => {
  const div = document.createElement("div");
  const HeaderItems = [{ href: "/new-post", icon: AddIcon, text: "New post" }];

  ReactDOM.render(
    <BrowserRouter>
      {HeaderItems.map(({ href, icon, text }) => (
        <NavLink key={href} icon={icon} href={href} text={text} />
      ))}
    </BrowserRouter>,
    div
  );
});

/*
it("Check if data passed is correct when saved i element", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <NavLink
        key="/messages"
        icon={ChatIcon}
        href="/messages"
        text="Messages"
      />
    </BrowserRouter>
  );
  expect(getByTestId("link-to-/messages")).toHaveAttribute("href", "/messages");
  expect(getByTestId("link-to-/messages")).toHaveAttribute("text", "Messages");
  expect(getByTestId("link-to-/messages")).toHaveAttribute("icon", {
    icon: ChatIcon,
  });
});

*/
