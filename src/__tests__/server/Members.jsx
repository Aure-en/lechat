import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import useMembers from "../../hooks/server/server/useMembers";
import Members from "../../components/server/Members";

jest.mock("../../hooks/server/server/useMembers");

const init = () => {
  // Create server and members
  const server = {
    _id: "1",
  };

  const members = [];

  for (let i = 1; i < 4; i += 1) {
    const member = {
      username: `User ${i}`,
      _id: `${i}`,
    };
    members.push(member);
  }

  // Mock users
  useMembers.mockReturnValue({ members });

  // Render
  render(
    <Router>
      <Members serverId={server._id} />
    </Router>
  );

  return members;
};

describe("Dropdown renders members properly", () => {
  test("Members are displayed by default", () => {
    const members = init();

    members.forEach((member) => {
      const li = screen.getByText(member.username);
      expect(li).toBeInTheDocument();
    });
  });

  test("Dropdown can be closed and opened", () => {
    const members = init();

    // Dropdown can be closed
    const button = screen.getByRole("button", { name: /members/i });
    userEvent.click(button);

    members.forEach((member) => {
      const li = screen.queryByText(member.username);
      expect(li).not.toBeInTheDocument();
    });

    // Dropdown can be opened again
    userEvent.click(button);
    members.forEach((member) => {
      const li = screen.getByText(member.username);
      expect(li).toBeInTheDocument();
    });
  });
});
