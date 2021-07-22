import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useUnread } from "../../context/UnreadContext";
import useSection from "../../hooks/server/server/useSection";
import List from "../../components/category/List";

jest.mock("../../hooks/server/server/useSection");
jest.mock("../../context/UnreadContext");

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
    servers: [
      {
        _id: server._id,
        channels: [],
      },
    ],
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
