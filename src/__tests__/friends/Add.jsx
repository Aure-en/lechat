import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../context/AuthContext";
import Add from "../../components/friends/Add";

jest.mock("../../context/AuthContext");

const init = () => {
  render(
    <>
      <Router>
        <Add />
      </Router>
      <div id="modal-root" />
    </>
  );
};

const user = {
  _id: "1",
  username: "User",
  email: "user@user.com",
};

test("Modal renders properly", () => {
  useAuth.mockReturnValue(user);

  init();

  // Open modal
  const button = screen.getByRole("button", { name: /add a friend/i });
  userEvent.click(button);

  // Check that the modal is opened
  // and the form displayed properly.
  const identifier = screen.getByLabelText(/username \/ email/i);
  expect(identifier).toBeInTheDocument();

  const sendBtn = screen.getByRole("button", { name: /send request/i });
  expect(sendBtn).toBeInTheDocument();
});

describe("Validation", () => {
  test("Front-end validation", () => {
    useAuth.mockReturnValue(user);

    init();

    // Open modal
    const button = screen.getByRole("button", { name: /add a friend/i });
    userEvent.click(button);

    const sendBtn = screen.getByRole("button", { name: /send request/i });
    userEvent.click(sendBtn);

    const error = screen.getByText(/friend must be specified/i);
    expect(error).toBeInTheDocument();
  });
});
