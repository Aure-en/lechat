import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Messages from "../../../components/chat/Messages";
import { UnreadProvider } from "../../../context/UnreadContext";
import { AuthProvider } from "../../../context/AuthContext";
import { author, ordered } from "../../utils/messages";

describe("It orders messages by author and display them", () => {
  beforeEach(() =>
    render(
      <Router>
        <AuthProvider>
          <UnreadProvider>
            <Messages ordered={ordered} />
          </UnreadProvider>
        </AuthProvider>
      </Router>
    )
  );

  test("Author is only displayed once per group of messages", () => {
    const name = screen.getAllByText(author.username);
    expect(name.length).toBe(1);
  });

  test("All messages written by the author are displayed", () => {
    ordered[0].messages.map((message) => {
      const text = screen.getByText(message.content);
      expect(text).toBeInTheDocument();
    });
  });
});
