import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Conversations from "../../../components/sidebar/conversations/Panel";

jest.mock("../../../hooks/sidebar/useConversations");
jest.mock("../../../context/AuthContext");

const init = (conversations = []) => {
  useAuth.mockReturnValue({
    user: {
      _id: "0",
      username: "Recipient",
      email: "recipient@email.com",
    },
  });

  const mockRef = createRef();
  render(
    <Router>
      <Conversations
        ref={mockRef}
        toggleDropdown={() => {}}
        conversations={conversations}
      />
    </Router>
  );
};

test("A special message is displayed when the user has no new messages", () => {
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

  test("New conversations are rendered", () => {
    init([conversation]);
    const link = document.querySelector(
      `[href='/conversations/${conversation.members[1]._id}]`
    );
    expect(link).toBeDefined();
  });

  test("An indicator displays the number of unread messages per conversation", () => {
    init([conversation]);
    const unread = document.querySelector("[aria-label='unread']");
    expect(unread.textContent).toBe(`${conversation.unread}`);
  });
});
