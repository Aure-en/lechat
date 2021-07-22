import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useUnread } from "../../context/UnreadContext";
import useSection from "../../hooks/server/server/useSection";
import Category from "../../components/category/Category";

jest.mock("../../context/UnreadContext");
jest.mock("../../hooks/server/server/useSection");

const init = () => {
  const server = {
    _id: "1",
  };

  const category = {
    name: "Category",
    _id: "2",
  };

  const channel = {
    name: "Channel",
    _id: "3",
  };

  // Mock hooks
  useUnread.mockReturnValue({
    unread: {
      servers: [
        {
          _id: "1",
          channels: [{ _id: "3", unread: 0 }],
        },
      ],
    },
  });

  useSection.mockReturnValue({
    sections: [channel],
    setSections: () => {},
  });

  render(
    <Router>
      <Category serverId={server._id} category={category} />
    </Router>
  );

  return { channel, category };
};

describe("Category is a dropdown that displays channels", () => {
  let category;
  let channel;

  beforeEach(() => {
    ({ channel, category } = init());
  });

  test("Dropdown is open by default", () => {
    const link = screen.getByRole("link", { name: channel.name });
    expect(link).toBeInTheDocument();
  });

  test("Dropdown can be closed and opened", () => {
    // Close the drop down
    // 🠒 Channels must be hidden
    const button = screen.getByRole("button", { name: category.name });
    userEvent.click(button);

    let link = screen.queryByRole("link", { name: channel.name });
    expect(link).not.toBeInTheDocument();

    // Open the dropdown
    // 🠒 Channels are now displayed
    userEvent.click(button);
    link = screen.getByRole("link", { name: channel.name });
    expect(link).toBeInTheDocument();
  });
});
