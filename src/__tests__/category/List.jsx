import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePermission } from "../../context/PermissionContext";
import { useUnread } from "../../context/UnreadContext";
import useSection from "../../hooks/server/server/useSection";
import List from "../../components/category/List";

jest.mock("../../hooks/server/server/useSection");
jest.mock("../../context/AuthContext");
jest.mock("../../context/UnreadContext");
jest.mock("../../context/PermissionContext");

const init = () => {
  const server = {
    _id: "1",
  };

  // Generate categories
  const categories = [];

  for (let i = 1; i < 4; i += 1) {
    const category = {
      _id: `${i}`,
      name: `Category ${i}`,
      server: server._id,
    };
    categories.push(category);
  }

  // Mock hooks
  useAuth.mockReturnValue({ user: { _id: "4" } });
  usePermission.mockReturnValue({ sections: [] });

  // Only mocks categories, not channels.
  useSection
    .mockReturnValueOnce({
      sections: categories,
      setSections: () => {},
    })
    .mockReturnValue({
      sections: [],
      setSections: () => {},
    });

  useUnread.mockReturnValue({
    getRoomUnread: () => 0,
  });

  render(
    <Router>
      <List serverId={server._id} />
    </Router>
  );

  return categories;
};

test("Categories are rendered", () => {
  const categories = init();
  categories.forEach((category) => {
    const button = screen.getByRole("button", { name: category.name });
    expect(button).toBeInTheDocument();
  });
});
