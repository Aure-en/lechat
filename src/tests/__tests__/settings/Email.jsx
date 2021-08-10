import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../../context/AuthContext";
import Email from "../../../components/settings/Email";

jest.mock("../../../context/AuthContext");

const init = () => {
  render(
    <Router>
      <Email />
    </Router>
  );
};

const user = {
  _id: "1",
  username: "User",
  email: "user@user.com",
};

describe("Front-end validation", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ user });

    // Render
    init();
    const button = screen.getByRole("button", { name: /update email/i });
    userEvent.click(button);
  });

  test("Error is displayed if the user doesn't fill the email field", () => {
    const error = screen.getByText(/email must be specified/i);
    expect(error).toBeInTheDocument();
  });

  test("Error is displayed if the user doesn't fill the password field", () => {
    const error = screen.getByText(/password must be specified/i);
    expect(error).toBeInTheDocument();
  });
});

describe("Requests results", () => {
  beforeAll(() => {
    // Mock and render
    global.fetch = jest.fn(() => {});
  });

  beforeEach(() => {
    useAuth.mockReturnValue({ user });

    // Fill the form
    init();

    const emailInput = screen.getByPlaceholderText(/email/i);
    userEvent.type(emailInput, "user@email.com");

    const passwordInput = screen.getByPlaceholderText(/password/i);
    userEvent.type(passwordInput, "Password");
  });

  test("Error is displayed if the email is already taken", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            errors: [
              {
                msg: "Email is already taken.",
                param: "email",
              },
            ],
          }),
      })
    );

    // Submit the form
    const submit = screen.getByRole("button", { name: /update email/i });
    await act(async () => userEvent.click(submit));

    // Check for the error message
    const error = screen.getByText(/email is already taken/i);
    expect(error).toBeInTheDocument();
  });

  test("Error is displayed if the password is incorrect", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            errors: [
              {
                msg: "Incorrect password.",
                param: "password",
              },
            ],
          }),
      })
    );

    // Submit the form
    const submit = screen.getByRole("button", { name: /update email/i });
    await act(async () => userEvent.click(submit));

    // Check for the error message
    const error = screen.getByText(/incorrect password/i);
    expect(error).toBeInTheDocument();
  });
});
