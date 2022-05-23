import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from ".";

describe(RegisterPage, () => {
  it("render elements from registerPage", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
    expect(screen.getAllByText("Register").length).toBeGreaterThanOrEqual(1);
    screen.getByTestId("email-input");
    screen.getByTestId("firstname-input");
    screen.getByTestId("lastname-input");
    screen.getByTestId("password-input");
    screen.getByTestId("confirmPassword-input");
  });
});
