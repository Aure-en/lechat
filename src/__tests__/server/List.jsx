import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import useFetch from "../../hooks/shared/useFetch";
import { useAuth } from "../../context/AuthContext";
import List from "../../components/server/List";

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

  // Mocks
  useAuth.mockReturnValue({
    user: {
      _id: "1",
    },
  });

  useFetch.mockReturnValue({
    data: {
      _id: "1",
      server: servers,
    },
  });

  // Render
  render(
    <Router>
      <List />
    </Router>
  );

  return servers;
};

test("User's servers are rendered", () => {
  const servers = init();

  servers.forEach((server) => {
    const heading = screen.getByRole("heading", { name: server.name });
    expect(heading).toBeInTheDocument();
  });
});
