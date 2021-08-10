import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useAuth } from "../../../context/AuthContext";
import { useUnread } from "../../../context/UnreadContext";
import useServers from "../../../hooks/server/server/useServers";
import Servers from "../../../components/sidebar/servers/Servers";

jest.mock("../../../hooks/server/server/useServers");
jest.mock("../../../context/AuthContext");
jest.mock("../../../context/UnreadContext");

const init = () => {
  // Renders
  render(
    <Router>
      <Servers />
    </Router>
  );

  // Open the servers dropdown
  const button = screen.getByRole("button", { name: "grid.svg" });
  userEvent.click(button);
};

describe("Renders servers list", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: {
        _id: "0",
        username: "User",
        email: "user@email.com",
      },
    });

    useUnread.mockReturnValue({
      unread: {
        servers: [
          {
            _id: "1",
            channels: [{ _id: "1", unread: 1 }],
          },
        ],
      },
    });
  });

  test("Links to the users the server joined are displayed", () => {
    // Generate servers
    const servers = [];

    for (let i = 1; i < 4; i += 1) {
      servers.push({
        name: `Server-${i}`,
        _id: `${i}`,
      });
    }

    useServers.mockReturnValue({ servers });
    init();

    servers.forEach((server) => {
      const link = document.querySelector(`[href="/servers/${server._id}"]`);
      expect(link).toBeDefined();
    });
  });

  test("Renders an indicator if a server has unread messages", () => {
    useServers.mockReturnValue({
      servers: [{ name: "Server", _id: "1" }],
    });

    init();
    const indicator = document.querySelector("[aria-label=unread]");
    expect(indicator).toBeDefined();
  });
});
