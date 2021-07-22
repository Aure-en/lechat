import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Form from "../../components/category/Form";

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

const init = (server, category = undefined) => {
  useAuth.mockReturnValue({ user });
  render(
    <Router>
      <Form serverId={server._id} category={category} />
    </Router>
  );
};

describe("Renders differently depending on the goal (create / update a category)", () => {
  // Heading and submit button have a different name.
  test("Create category", () => {
    init(server);

    const heading = screen.getByRole("heading", { name: /create category/i });
    expect(heading).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /create category/i });
    expect(submit).toBeInTheDocument();
  });

  test("Update category", () => {
    init(server, category);

    const heading = screen.getByRole("heading", {
      name: /update category/i,
    });
    expect(heading).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /update category/i });
    expect(submit).toBeInTheDocument();
  });
});

test("When updating a category, fields are autofilled", () => {
  init(server, category);

  // Check that the name is autofilled
  const name = screen.getByLabelText(/name/i);
  expect(name.value).toBe(category.name);
});

test("Validation - Name field must be filled", () => {
  init(server);

  // Submit the form
  const submit = screen.getByRole("button", { name: /category/i });
  userEvent.click(submit);

  // Check for the error message
  const error = screen.getByText(/name must be specified/i);
  expect(error).toBeInTheDocument();
});
