import React, { useRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePermission } from "../../context/PermissionContext";
import Menu from "../../components/channel/Menu";

// -- SETUP --
jest.mock("../../context/AuthContext");
jest.mock("../../context/PermissionContext");

/**
 * Generate:
 * - Server
 * - Category
 * - Channel
 * - User
 */
const create = () => {
  const server = {
    _id: "1",
  };

  const category = {
    _id: "2",
  };

  const channel = {
    name: "Channel",
    _id: "3",
  };

  // Create two users
  const user = {
    name: "User",
    _id: "4",
  };

  return {
    server,
    category,
    channel,
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
function Component({ serverId, categoryId, channel }) {
  const outerRef = useRef();
  return (
    <Router>
      <div ref={outerRef}>Right click here to open the contextual menu.</div>
      <Menu
        serverId={serverId}
        categoryId={categoryId}
        channel={channel}
        outerRef={outerRef}
      />
    </Router>
  );
}

const renderElems = (serverId, categoryId, channel) => {
  render(
    <>
      <Component
        serverId={serverId}
        categoryId={categoryId}
        channel={channel}
      />
      <div id="modal-root" />
    </>
  );
};

// -- TESTS --
describe("The menu only opens if the user has the necessary permissions", () => {
  let server;
  let category;
  let channel;
  let user;

  beforeAll(() => {
    ({ server, category, channel, user } = create());
  });

  test("If the user doesn't have any permissions, the menu doesn't open", () => {
    mock(user, []);
    renderElems(server._id, category._id, channel);

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
    renderElems(server._id, category._id, channel);

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
  let category;
  let channel;
  let user;

  beforeEach(() => {
    // Open the contextual menu
    ({ server, category, channel, user } = create());
    mock(user, [user._id]);
    renderElems(server._id, category._id, channel);
    const elem = screen.getByText(
      /right click here to open the contextual menu/i
    );
    fireEvent.contextMenu(elem);
  });

  test("User can open the create channel modal from the contextual menu", () => {
    // Click on the contextual menu button
    const createBtn = screen.getByRole("button", { name: /create channel/i });
    userEvent.click(createBtn);

    // Check that the create modal was opened.
    const createHeading = screen.getByRole("heading", {
      name: /create channel/i,
    });
    expect(createHeading).toBeInTheDocument();
  });

  test("User can open the update channel modal from the contextual menu", () => {
    // Click on the contextual menu button
    const updateBtn = screen.getByRole("button", { name: /update channel/i });
    userEvent.click(updateBtn);

    // Check that the update modal was opened.
    const updateHeading = screen.getByRole("heading", {
      name: /update channel/i,
    });
    expect(updateHeading).toBeInTheDocument();
  });

  test("User can open the delete channel modal from the contextual menu", () => {
    // Click on the contextual menu button
    const deleteBtn = screen.getByRole("button", { name: /delete channel/i });
    userEvent.click(deleteBtn);

    // Check that the delete modal was opened.
    const deleteHeading = screen.getByRole("heading", {
      name: /delete channel/i,
    });
    expect(deleteHeading).toBeInTheDocument();
  });
});
