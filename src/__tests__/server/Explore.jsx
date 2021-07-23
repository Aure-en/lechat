import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import useFetch from "../../hooks/shared/useFetch";
import { useAuth } from "../../context/AuthContext";
import Explore from "../../routes/dashboard/Explore";

jest.mock("../../hooks/shared/useFetch");
jest.mock("../../context/AuthContext");

const init = () => {
  // Create servers
  const servers = [];

  for (let i = 1; i < 4; i += 1) {
    const server = {
      name: `Server ${i}`,
      _id: `${i}`,
    };

    servers.push(server);
  }

  // Create user
  const user = {
    username: "User",
    _id: 1,
    server: [servers[0]._id], // Only joined server 1.
  };

  // Mock
  useAuth.mockReturnValue({ user });

  useFetch.mockReturnValue({
    data: servers,
  });

  // Render
  render(
    <Router>
      <Explore />
    </Router>
  );

  return { user, servers };
};

test("User's servers preview link to the server", () => {
  const { user } = init();

  user.server.forEach((server) => {
    const link = document.querySelector(`a[href="/servers/${server}"]`);
    expect(link).toBeDefined();
  });
});

test("Other servers preview link to the servers' join page", () => {
  const { user, servers } = init();

  servers.forEach((server) => {
    if (!user.server.includes(server)) {
      const link = document.querySelector(`a[href="/join/${server}"]`);
      expect(link).toBeDefined();
    }
  });
});
