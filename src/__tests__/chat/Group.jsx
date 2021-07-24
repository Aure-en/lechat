import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Group from "../../components/chat/Group";
import { author, ordered } from "../utils/messages";

describe("Messages are rendered", () => {
  beforeEach(() => {
    render(
      <Router>
        <Group messages={ordered} setEditing={() => {}} />
      </Router>
    );
  });

  test("Author's name is rendered", () => {
    const name = screen.getByText(author.username);
    expect(name).toBeInTheDocument();
  });

  test("Timestamp is rendered", () => {
    const timestamp = screen.getByText(/today at \d\d:\d\d/i);
    expect(timestamp).toBeInTheDocument();
  });

  test("All messages in the group are rendered", () => {
    ordered.messages.forEach((message) => {
      const content = screen.getByText(message.content);
      expect(content).toBeInTheDocument();
    });
  });
});
