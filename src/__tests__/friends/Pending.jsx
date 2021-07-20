import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Pending from "../../components/friends/Pending";
import usePending from "../../hooks/friends/usePending";
import { useAuth } from "../../context/AuthContext";

jest.mock("../../hooks/friends/usePending");
jest.mock("../../context/AuthContext");

const init = () => {
  render(
    <>
      <Router>
        <Pending />
      </Router>
    </>
  );
};

describe("Renders properly", () => {
  test("Renders a special message when the user has no pending requests", () => {
    usePending.mockReturnValue({
      friendships: [],
    });
    useAuth.mockReturnValue({});

    init();
    expect(
      screen.getByText(/you do not have any pending requests/i)
    ).toBeInTheDocument();
  });

  test("Renders an user's pending friend requests when he has any", () => {
    usePending.mockReturnValue({
      friendships: [
        {
          status: false,
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
        _id: "2",
        username: "Recipient",
        email: "recipient@gmail.com",
      },
    });

    init();
    expect(screen.getByText("Sender")).toBeInTheDocument();
  });
});
