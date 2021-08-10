import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import Login from "../../../components/entry/Login";

const init = () => {
  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );
};

test("Renders properly", () => {
  init();

  // Check that the form fields are rendered.
  const identifier = screen.getByLabelText(/email \/ username/i);
  expect(identifier).toBeInTheDocument();

  const password = screen.getByLabelText(/password/i);
  expect(password).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /log in/i });
  expect(button).toBeInTheDocument();
});

describe("Validation", () => {
  beforeEach(() => {
    init();
  });
  test("Users must enter an username / email", () => {
    // Submit the form without entering an username
    const button = screen.getByRole("button", { name: /log in/i });
    userEvent.click(button);

    // Check that an error message appeared.
    const error = screen.getByText(/email \/ username must be specified/i);
    expect(error).toBeInTheDocument();
  });

  test("Users must enter a password", () => {
    // Submit the form without entering a password
    const button = screen.getByRole("button", { name: /log in/i });
    userEvent.click(button);

    // Check that an error message appeared.
    const error = screen.getByText(/password must be specified/i);
    expect(error).toBeInTheDocument();
  });
});

describe("Request results", () => {
  // Mock fetch
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            errors: [
              {
                value: "",
                param: "response",
                location: "body",
                msg: "Incorrect username/email.",
              },
            ],
          }),
      })
    );
  });

  test("If an account was not found, display an error message", async () => {
    init();

    const identifier = screen.getByLabelText(/email \/ username/i);
    userEvent.type(identifier, "Username");

    const password = screen.getByLabelText(/password/i);
    userEvent.type(password, "Password");

    const button = screen.getByRole("button", { name: /log in/i });
    await act(async () => {
      await userEvent.click(button);
    });

    expect(screen.getByText(/incorrect username\/email/i)).toBeInTheDocument();
  });
});
