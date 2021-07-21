import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import usePending from "../../hooks/friends/usePending";
import Friends from "../../components/sidebar/links/Friends";

jest.mock("../../hooks/friends/usePending");
jest.mock("../../context/AuthContext");

const init = () => {
  render(
    <Router>
      <Friends />
    </Router>
  );
};

describe("Displays the number of pending friends requests", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: {
        _id: "0",
        username: "Recipient",
        email: "recipient@gmail.com",
      },
    });
  });

  test("Renders nothing if the user has no pending friends requests", () => {
    usePending.mockReturnValue({
      friendships: [],
    });
    init();
    expect(screen.queryByText(/[0-9]/)).not.toBeInTheDocument();
  });

  test("Renders the exact number of requests if there are <9 requests", () => {
    // Create pending friends
    const friendships = [];

    for (let i = 1; i < 6; i += 1) {
      friendships.push({
        status: false,
        _id: `${i}`,
        sender: {
          _id: `${i}`,
          username: `Sender-${i}`,
          email: `sender-${i}@gmail.com`,
        },
        recipient: {
          _id: "0",
          username: "Recipient",
          email: "recipient@gmail.com",
        },
      });
    }

    usePending.mockReturnValue({
      friendships,
    });

    init();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("Renders '9+' if there are >9 requests", () => {
    // Create pending friends
    const friendships = [];

    for (let i = 1; i < 11; i += 1) {
      friendships.push({
        status: false,
        _id: `${i}`,
        sender: {
          _id: `${i}`,
          username: `Sender-${i}`,
          email: `sender-${i}@gmail.com`,
        },
        recipient: {
          _id: "0",
          username: "Recipient",
          email: "recipient@gmail.com",
        },
      });
    }

    usePending.mockReturnValue({
      friendships,
    });

    init();
    expect(screen.getByText("9+")).toBeInTheDocument();
  });
});
