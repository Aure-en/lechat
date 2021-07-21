import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
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
  useAuth.mockReturnValue({ user });
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
  beforeEach(() => {
    useAuth.mockReturnValue({ user });
    init();

    // Open modal
    const button = screen.getByRole("button", { name: /add a friend/i });
    userEvent.click(button);
  });

  test("Cannot leave the field empty", () => {
    const sendBtn = screen.getByRole("button", { name: /send request/i });
    userEvent.click(sendBtn);

    const error = screen.getByText(/friend must be specified/i);
    expect(error).toBeInTheDocument();
  });

  test("Users cannot send requests to themselves", () => {
    // User enter their own username
    const identifier = screen.getByLabelText(/username \/ email/i);
    userEvent.type(identifier, user.username);

    // Submit the form
    const sendBtn = screen.getByRole("button", { name: /send request/i });
    userEvent.click(sendBtn);

    const error = screen.getByText(
      /you cannot send yourself a friend request/i
    );
    expect(error).toBeInTheDocument();
  });
});

describe("Request results", () => {
  beforeAll(() => {
    // Mock and render
    global.fetch = jest.fn(() => {});
  });

  beforeEach(() => {
    useAuth.mockReturnValue({ user });
    init();

    // Open modal
    const button = screen.getByRole("button", { name: /add a friend/i });
    userEvent.click(button);

    // Enter an user's name.
    const identifier = screen.getByLabelText(/username \/ email/i);
    userEvent.type(identifier, "Friend");
  });

  test("An error message is displayed if the user does not exist", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: "User not found.",
          }),
      })
    );

    // Submit the form
    const sendBtn = screen.getByRole("button", { name: /send request/i });
    await act(async () => userEvent.click(sendBtn));

    // Check that the error is displayed
    const error = screen.getByText(/user not found/i);
    expect(error).toBeInTheDocument();
  });

  test("An error is displayed if the user already sent a request to the person", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            error: "You have already sent this person a friend request.",
          }),
      })
    );

    // Submit the form
    const sendBtn = screen.getByRole("button", { name: /send request/i });
    await act(async () => userEvent.click(sendBtn));

    // Check that the error is displayed
    const error = screen.getByText(
      /you have already sent this person a friend request/i
    );
    expect(error).toBeInTheDocument();
  });

  test("A success message is displayed after sending a request successfully", async () => {
    // First mock: search for the user
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            _id: "2",
            username: "Random",
            email: "random@gmail.com",
          }),
      })
    );

    // Second mock: the friend request is sent to the user.
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              status: false,
              _id: "1",
              sender: {
                _id: "1",
                username: "User",
                email: "user@gmail.com",
              },
              recipient: {
                _id: "2",
                username: "Random",
                email: "random@gmail.com",
              },
            },
          ]),
      })
    );

    // Submit the form
    const sendBtn = screen.getByRole("button", { name: /send request/i });
    await act(async () => userEvent.click(sendBtn));

    // Check that the error is displayed
    const message = screen.getByText(/friend request successfully sent/i);
    expect(message).toBeInTheDocument();
  });
});
