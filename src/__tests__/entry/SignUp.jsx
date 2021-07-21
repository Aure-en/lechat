import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import SignUp from "../../components/entry/SignUp";

const init = () => {
  render(
    <Router>
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </Router>
  );
};

test("Renders properly", () => {
  init();

  // Check that the form fields are rendered.
  const username = screen.getByLabelText(/username/i);
  expect(username).toBeInTheDocument();

  const email = screen.getByLabelText(/email/i);
  expect(email).toBeInTheDocument();

  const password = screen.getByLabelText(/^password$/i);
  expect(password).toBeInTheDocument();

  const confirmation = screen.getByLabelText(/password confirmation/i);
  expect(confirmation).toBeInTheDocument();

  const button = screen.getByRole("button", { name: /sign up/i });
  expect(button).toBeInTheDocument();
});

test("All fields must be filled before submitting", () => {
  init();

  // Submit the form without entering anything.
  const button = screen.getByRole("button", { name: /sign up/i });
  userEvent.click(button);

  // Check that error messages appeared.
  const fields = ["username", "email", "password", "confirmation"];

  fields.forEach((field) => {
    expect(
      screen.getByText(new RegExp(`${field} must be specified`, "i"))
    ).toBeInTheDocument();
  });
});
