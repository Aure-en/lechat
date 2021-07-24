import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUnread } from "../../context/UnreadContext";
import { conversation } from "../utils/conversations";
import Conversation from "../../components/conversations/Conversation";

jest.mock("../../context/AuthContext");
jest.mock("../../context/UnreadContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useRouteMatch: () => ({ params: { id: "1" } }),
}));

const init = () => {
  // Mocks
  useAuth.mockReturnValue({ user: conversation.members[0] });
  useUnread.mockReturnValue({
    unread: {
      conversations: [{ _id: conversation._id, unread: 1 }],
    },
  });

  // Render
  render(
    <Router>
      <Conversation conversation={conversation} />
    </Router>
  );
};

describe("Conversation is rendered properly", () => {
  beforeEach(() => init());

  test("Links to the conversation", () => {
    const link = document.querySelector(
      `a[href='${conversation.members[1]._id}']`
    );
    expect(link).toBeDefined();
  });

  test("Display the name of conversation members who aren't the current user", () => {
    // Check that the current member's (members[0]) name isn't displayed
    const current = screen.queryByText(conversation.members[0].username);
    expect(current).not.toBeInTheDocument();

    // Check that the other conversation member's (members[1]) name is displayed.
    const other = screen.getByText(conversation.members[1].username);
    expect(other).toBeInTheDocument();
  });

  test("Display the latest message sent in the conversation", () => {
    const message = screen.getByText(conversation.message.content);
    expect(message).toBeInTheDocument();
  });

  test("Display the timestamp of the conversation's latest message", () => {
    const timestamp = screen.getByText(/\d\d:\d\d/);
    expect(timestamp).toBeInTheDocument();
  });
});

describe("Display the number of unread messages in the conversation", () => {
  test("If there are <9 unread messages, display the exact number", () => {
    init();
    const number = screen.getByText(/^\d$/);
    expect(number).toBeInTheDocument();
  });

  test("If there are >9 unread messages, display 9+", () => {
    // Mocks
    useAuth.mockReturnValue({ user: conversation.members[0] });
    useUnread.mockReturnValue({
      unread: {
        conversations: [{ _id: conversation._id, unread: 10 }],
      },
    });
    // Render
    render(
      <Router>
        <Conversation conversation={conversation} />
      </Router>
    );

    const number = screen.getByText("9+");
    expect(number).toBeInTheDocument();
  });
});
