import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Preview from "../../components/server/Preview";

/**
 * Create a server and render the preview component.
 * @param {boolean} join - false if the user is already in the server, true otherwise.
 */
const init = (join) => {
  const server = {
    name: "Server",
    about: "About",
    _id: "1",
  };

  render(
    <Router>
      <Preview server={server} join={join} />
    </Router>
  );

  return server;
};

test("Display the server's information", () => {
  const server = init();

  const heading = screen.getByRole("heading", { name: server.name });
  expect(heading).toBeInTheDocument();

  const description = screen.getByText(server.about);
  expect(description).toBeInTheDocument();
});

describe("Link changes depending on whether the user has joined the server or not", () => {
  test("If the user already joined the server, the links leads to the server page", () => {
    const server = init(false);
    const link = document.querySelector("a");
    expect(link).toHaveAttribute("href", `/servers/${server._id}`);
    expect(link).not.toHaveAttribute("href", `/join/${server._id}`);
  });

  test("If the user hasn't joined the server, the links leads to the join page", () => {
    const server = init(false);
    const link = document.querySelector("a");
    expect(link).toHaveAttribute("href", `/servers/${server._id}`);
    expect(link).not.toHaveAttribute("href", `/join/${server._id}`);
  });
});
