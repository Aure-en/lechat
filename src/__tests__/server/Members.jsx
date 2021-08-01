import React from "react";
import { render, screen, within } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../context/AuthContext";
import { usePermission } from "../../context/PermissionContext";
import useMembers from "../../hooks/server/server/useMembers";
import Members from "../../components/server/Members";

jest.mock("../../context/AuthContext");
jest.mock("../../context/PermissionContext");
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
  useAuth.mockReturnValue({ user: { _id: "1" } });
  usePermission.mockReturnValue({ server: ["1"] });

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

test("There is a special indicator next to the server admin's name", () => {
  const members = init();
  const admin = screen.getByText(members[0].username);
  const svg = within(admin).getByText("crown.svg");
  expect(svg).toBeInTheDocument();
});
