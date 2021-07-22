import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Form from "../../components/channel/Form";

jest.mock("../../context/AuthContext");

const user = {
  _id: "1",
  username: "User",
  email: "user@user.com",
};

const server = {
  name: "Server",
  about: "About",
  _id: "1",
};

const category = {
  name: "Category",
  _id: "2",
};

const channel = {
  name: "Channel",
  about: "About",
  _id: "3",
};

function init(server, category, channel = undefined) {
  useAuth.mockReturnValue({ user });
  render(
    <Router>
      <Form serverId={server._id} categoryId={category._id} channel={channel} />
    </Router>
  );
}

describe("Renders differently depending on the goal (create / update a channel)", () => {
  // Heading and submit button have a different name.
  test("Create channel", () => {
    init(server, category);

    const heading = screen.getByRole("heading", { name: /create channel/i });
    expect(heading).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /create channel/i });
    expect(submit).toBeInTheDocument();
  });

  test("Update channel", () => {
    init(server, category, channel);

    const heading = screen.getByRole("heading", {
      name: /update channel/i,
    });
    expect(heading).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /update channel/i });
    expect(submit).toBeInTheDocument();
  });
});

test("When updating a channel, fields are autofilled", () => {
  init(server, category, channel);

  // Check that the name is autofilled
  const name = screen.getByLabelText(/name/i);
  expect(name.value).toBe(channel.name);

  // Check that the about is autofilled
  const about = screen.getByLabelText(/description/i);
  expect(about.textContent).toBe(channel.about);
});

test("Validation - Name field must be filled", () => {
  init(server, category);

  // Submit the form
  const submit = screen.getByRole("button", { name: /channel/i });
  userEvent.click(submit);

  // Check for the error message
  const error = screen.getByText(/name must be specified/i);
  expect(error).toBeInTheDocument();
});
