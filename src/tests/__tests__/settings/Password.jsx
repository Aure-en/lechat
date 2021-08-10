import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../../context/AuthContext";
import Password from "../../../components/settings/Password";

jest.mock("../../../context/AuthContext");

const init = () => {
  render(
    <Router>
      <Password />
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
    const button = screen.getByRole("button", { name: /update password/i });
    userEvent.click(button);
  });

  test("Error is displayed if the user doesn't fill the current password field", () => {
    const error = screen.getByText(/current password must be specified/i);
    expect(error).toBeInTheDocument();
  });

  test("Error is displayed if the user doesn't fill the new password field", () => {
    const error = screen.getByText(/new password must be specified/i);
    expect(error).toBeInTheDocument();
  });

  test("Error is displayed if the user doesn't fill the confirmation field", () => {
    const error = screen.getByText(/confirmation password must be specified/i);
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

    const current = screen.getByPlaceholderText(/current password/i);
    userEvent.type(current, "current");

    const newPassword = screen.getByPlaceholderText(/^new password$/i);
    userEvent.type(newPassword, "new_password");

    const confirmation = screen.getByPlaceholderText(/confirm new password/i);
    userEvent.type(confirmation, "new_password");
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
    const submit = screen.getByRole("button", { name: /update password/i });
    await act(async () => userEvent.click(submit));

    // Check for the error message
    const error = screen.getByText(/incorrect password/i);
    expect(error).toBeInTheDocument();
  });
});
