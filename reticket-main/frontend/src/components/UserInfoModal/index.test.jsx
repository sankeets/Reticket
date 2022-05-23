import { render } from "@testing-library/react";
import React from "react";
import UserInfoModal from ".";

describe(UserInfoModal, () => {
  it("can open UserInfoModal without crashing", () => {
    render(<UserInfoModal userId={1} onClose={jest.fn()} />);
  });
});
