import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../../context/AuthContext";
import { useUnread } from "../../../context/UnreadContext";
import useConversations from "../../../hooks/conversations/useConversations";
import { conversations, messages } from "../../utils/conversations";
import Conversations from "../../../components/conversations/Conversations";

global.fetch = jest.fn(() => {});
jest.mock("../../../context/AuthContext");
jest.mock("../../../context/UnreadContext");
jest.mock("../../../hooks/conversations/useConversations");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useRouteMatch: () => ({ params: { id: "1" } }),
}));

const init = () => {
  // Mocks
  useAuth.mockReturnValue({ user: conversations[0].members[0] });
  useUnread.mockReturnValue({
    unread: {
      conversations: [{ _id: conversations[0]._id, unread: 1 }],
    },
  });
  useConversations.mockReturnValue({
    conversations,
  });

  // Render
  render(
    <Router>
      <Conversations />
    </Router>
  );
};

describe("Display latest conversations in a dropdown", () => {
  beforeEach(async () => {
    init();
  });

  test("Dropdown is open by default", () => {
    const user = screen.getByText(conversations[0].members[1].username);
    expect(user).toBeInTheDocument();

    const message = screen.getByText(messages[0].content);
    expect(message).toBeInTheDocument();
  });

  test("Dropdown can be closed and opened", () => {
    const button = screen.getByRole("button", {
      name: /latest conversations/i,
    });

    // Close dropdown
    userEvent.click(button);
    let user = screen.queryByText(conversations[0].members[1].username);
    expect(user).not.toBeInTheDocument();

    // Open dropdown
    userEvent.click(button);
    user = screen.getByText(conversations[0].members[1].username);
    expect(user).toBeInTheDocument();
  });
});
