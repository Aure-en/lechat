import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useUnread } from "../../context/UnreadContext";
import useSection from "../../hooks/server/server/useSection";
import List from "../../components/channel/List";

jest.mock("../../context/UnreadContext");
jest.mock("../../hooks/server/server/useSection");

const init = () => {
  const server = {
    _id: "1",
  };

  const category = {
    _id: "2",
  };

  const channels = [];
  const unreadChannels = [];

  // Generate channels
  for (let i = 1; i < 6; i += 1) {
    const channel = {
      name: `Channel-${i}`,
      category: "2",
      _id: `${i}`,
    };
    channels.push(channel);

    const unread = {
      _id: `${i}`,
      unread: 0,
    };
    unreadChannels.push(unread);
  }

  // Mock hooks
  useUnread.mockReturnValue({
    unread: {
      servers: [
        {
          _id: "1",
          channels: unreadChannels,
        },
      ],
    },
  });

  useSection.mockReturnValue({
    sections: channels,
    setSections: () => {},
  });

  render(
    <Router>
      <List serverId={server._id} categoryId={category._id} />
    </Router>
  );

  return { server, channels };
};

test("Renders the list of channels links", () => {
  // Set up
  const { server, channels } = init();

  // Check that the channels links are rendered
  channels.forEach((channel) => {
    const link = screen.getByRole("link", { name: channel.name });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/servers/${server._id}/channels/${channel._id}`
    );
  });
});
