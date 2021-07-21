import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";
import Conversations from "../../components/sidebar/conversations/Conversations";

jest.mock("../../hooks/server/server/useServers");
jest.mock("../../context/AuthContext");
jest.mock("../../context/UnreadContext");

const init = () => {
  // Renders
  render(
    <Router>
      <Conversations />
    </Router>
  );

  // Open the conversations dropdown
  const button = screen.getByRole("button", { name: /chat.svg/ });
  userEvent.click(button);
};

test("A special message is displayed when the user has no new messages", () => {
  useAuth.mockReturnValue({
    user: {
      _id: "0",
      username: "User",
      email: "user@email.com",
    },
  });
  useUnread.mockReturnValue({
    unread: {
      conversations: [],
    },
  });

  init();
  const message = screen.getByText(/you have no new messages/i);
  expect(message).toBeInTheDocument();
  const link = screen.getByRole("link", {
    name: /how about talking to a friend/i,
  });
  expect(link).toBeInTheDocument();
});

describe("Renders new messages list", () => {
  const conversation = {
    _id: "1",
    unread: 5,
    members: [
      { _id: "0", username: "User" },
      { _id: "1", username: "Friend" },
    ],
  };

  beforeEach(() => {
    useAuth.mockReturnValue({
      user: {
        _id: "0",
        username: "User",
        email: "user@email.com",
      },
    });

    useUnread.mockReturnValue({
      unread: {
        conversations: [conversation],
      },
    });
  });

  test("New conversations are rendered", () => {
    init();
    const link = document.querySelector(
      `[href='/conversations/${conversation.members[1]._id}]`
    );
    expect(link).toBeDefined();
  });

  test("An indicator displays the number of unread messages per conversation", () => {
    init();
    screen.debug();
    const unread = document.querySelector("[aria-label='unread']");
    expect(unread.textContent).toBe(`${conversation.unread}`);
  });
});
