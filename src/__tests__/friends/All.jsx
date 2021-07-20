import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import All from "../../components/friends/All";
import useFriend from "../../hooks/friends/useFriend";

jest.mock("../../hooks/friends/useFriend");
jest.mock("../../context/AuthContext");

const init = () => {
  render(
    <Router>
      <All />
    </Router>
  );
};

describe("Renders properly", () => {
  test("Renders a special message when the user has no friends", () => {
    useFriend.mockReturnValue({
      friendships: [],
    });
    useAuth.mockReturnValue({});
    init();
    expect(screen.getByText(/there is nothing here/i)).toBeInTheDocument();
  });
});

test("Renders an user's friends when he has any", () => {
  useFriend.mockReturnValue({
    friendships: [
      {
        status: true,
        _id: "1",
        sender: {
          _id: "1",
          username: "Sender",
          email: "sender@gmail.com",
        },
        recipient: {
          _id: "2",
          username: "Recipient",
          email: "recipient@gmail.com",
        },
      },
    ],
  });

  // User is needed to compare the friendship's members to the user.
  useAuth.mockReturnValue({
    user: {
      _id: "1",
      username: "Sender",
      email: "sender@gmail.com",
    },
  });

  init();

  // Check if the friend is displayed properly
  expect(screen.getByText("Recipient")).toBeInTheDocument();
});
