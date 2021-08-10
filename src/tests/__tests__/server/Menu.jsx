import React, { useRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { usePermission } from "../../../context/PermissionContext";
import Menu from "../../../components/server/sidebar/Menu";

// -- SETUP --
jest.mock("../../../context/AuthContext");
jest.mock("../../../context/PermissionContext");

/**
 * Generate:
 * - Server
 * - Category
 * - User
 */
const create = () => {
  const server = {
    _id: "1",
  };

  const category = {
    _id: "2",
  };

  const user = {
    name: "User",
    _id: "3",
  };

  return {
    server,
    category,
    user,
  };
};

// Mock user and permissions.
const mock = (user, permissions) => {
  useAuth.mockReturnValue({
    user,
  });
  usePermission.mockReturnValue({ sections: permissions });
};

// Create the component on which the right click will open the contextual menu.
function Component({ serverId }) {
  const outerRef = useRef();
  return (
    <Router>
      <div ref={outerRef}>Right click here to open the contextual menu.</div>
      <Menu serverId={serverId} outerRef={outerRef} />
    </Router>
  );
}

const renderElems = (serverId) => {
  render(
    <>
      <Component serverId={serverId} />
      <div id="modal-root" />
    </>
  );
};

// -- TESTS --
describe("The menu only opens if the user has the necessary permissions", () => {
  let server;
  let user;

  beforeAll(() => {
    ({ server, user } = create());
  });

  test("If the user doesn't have any permissions, the menu doesn't open", () => {
    mock(user, []);
    renderElems(server._id);

    // Try to open the menu
    const elem = screen.getByText(
      /right click here to open the contextual menu/i
    );
    fireEvent.contextMenu(elem);

    // Check that the menu did not open.
    const root = document.body.querySelector("#modal-root");
    expect(root.innerHTML).toBe("");
  });

  test("If the user has the necessary permissions, the menu open", () => {
    mock(user, [user._id]);
    renderElems(server._id);

    // Try to open the menu
    const elem = screen.getByText(
      /right click here to open the contextual menu/i
    );
    fireEvent.contextMenu(elem);

    // Check that the menu was opened.
    const root = document.body.querySelector("#modal-root");
    expect(root.innerHTML).not.toBe("");
  });
});

describe("The contextual menu buttons work as expected", () => {
  let server;
  let user;

  beforeEach(() => {
    // Open the contextual menu
    ({ server, user } = create());
    mock(user, [user._id]);
    renderElems(server._id);
    const elem = screen.getByText(
      /right click here to open the contextual menu/i
    );
    fireEvent.contextMenu(elem);
  });

  test("User can open the create category modal from the contextual menu", () => {
    // Click on the contextual menu button
    const createBtn = screen.getByRole("button", { name: /create category/i });
    userEvent.click(createBtn);

    // Check that the create modal was opened.
    const createHeading = screen.getByRole("heading", {
      name: /create category/i,
    });
    expect(createHeading).toBeInTheDocument();
  });
});
