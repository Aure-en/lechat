import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { usePermission } from "../../../context/PermissionContext";
import useMembers from "../../../hooks/server/server/useMembers";
import Members from "../../../components/server/members/Members";

jest.mock("../../../context/AuthContext");
jest.mock("../../../context/PermissionContext");
jest.mock("../../../hooks/server/server/useMembers");

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

describe("It renders members properly", () => {
  test("Members are displayed", () => {
    const members = init();

    members.forEach((member) => {
      const li = screen.getByText(member.username);
      expect(li).toBeInTheDocument();
    });
  });

  test("There is a special indicator next to the server admin's name", () => {
    init();
    const indicator = screen.getByLabelText("Server Owner");
    expect(indicator).toBeInTheDocument();
  });
});
