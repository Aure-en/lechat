import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Form from "../../components/server/Form";

jest.mock("../../context/AuthContext");

const user = {
  _id: "1",
  username: "User",
  email: "user@user.com",
};

const server = {
  name: "Server",
  about: "About",
};

const init = (server = undefined) => {
  useAuth.mockReturnValue({ user });
  render(
    <Router>
      <Form server={server} />
    </Router>
  );
};

describe("Renders differently depending on the goal (create / update a server)", () => {
  // Heading and submit button have a different name.
  test("Create server", () => {
    init();

    const heading = screen.getByRole("heading", { name: /create a server/i });
    expect(heading).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /create server/i });
    expect(submit).toBeInTheDocument();
  });

  test("Update server", () => {
    init(server);

    const heading = screen.getByRole("heading", {
      name: /update your server/i,
    });
    expect(heading).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /update server/i });
    expect(submit).toBeInTheDocument();
  });
});

test("When updating a server, fields are autofilled", () => {
  init(server);

  // Check that the name is autofilled
  const name = screen.getByLabelText(/name/i);
  expect(name.value).toBe(server.name);

  // Check that the about is autofilled
  const about = screen.getByLabelText(/description/i);
  expect(about.textContent).toBe(server.about);
});

test("Validation - Name field must be filled", () => {
  init();

  // Submit the form
  const submit = screen.getByRole("button", { name: /server/i });
  userEvent.click(submit);

  // Check for the error message
  const error = screen.getByText(/name must be specified/i);
  expect(error).toBeInTheDocument();
});
