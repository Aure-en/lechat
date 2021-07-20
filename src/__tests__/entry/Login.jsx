import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Login from "../../components/entry/Login";

const init = () => {
  render(
    <Router>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </Router>
  );
}

test("Renders properly", () => {
  init();

  // Check that the form fields are rendered.
  const identifier = screen.getByLabelText(/email \/ username/i);
  expect(identifier).toBeInTheDocument();

  const password = screen.getByLabelText(/password/i);
  expect(password).toBeInTheDocument();

  const button = screen.getByRole('button', { name: /log in/i });
  expect(button).toBeInTheDocument();
});

describe("Validation", () => {
  test("Users must enter an username / email", () => {
    init();

    // Submit the form without entering an username
    const button = screen.getByRole('button', { name: /log in/i });
    userEvent.click(button);

    // Check that an error message appeared.
    const error = screen.getByText(/email \/ username must be specified/i);
    expect(error).toBeInTheDocument();
  })

  test("Users must enter a password", () => {
    init();

    // Submit the form without entering a password
    const button = screen.getByRole('button', { name: /log in/i });
    userEvent.click(button);

    // Check that an error message appeared.
    const error = screen.getByText(/password must be specified/i);
    expect(error).toBeInTheDocument();
  })
})