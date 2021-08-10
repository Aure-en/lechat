import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { usePermission } from "../../../context/PermissionContext";
import { useUnread } from "../../../context/UnreadContext";
import Channel from "../../../components/channel/Channel";

jest.mock("../../../context/AuthContext");
jest.mock("../../../context/UnreadContext");
jest.mock("../../../context/PermissionContext");

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

const init = () => {
  useAuth.mockReturnValue({ user: { _id: "4" } });
  usePermission.mockReturnValue({ sections: [] });

  render(
    <Router>
      <Channel
        serverId={server._id}
        categoryId={category._id}
        channel={channel}
      />
    </Router>
  );
};

describe("Link to channel renders properly", () => {
  test("Link to channel is displayed without indicator if there are no unread messages", () => {
    useUnread.mockReturnValueOnce({
      unread: {
        servers: [
          {
            _id: "1",
            channels: [{ _id: "3", unread: 0 }],
          },
        ],
      },
      getRoomUnread: () => 0,
    });

    init();
    const link = screen.getByRole("link", { name: channel.name });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/servers/${server._id}/channels/${channel._id}`
    );

    const indicator = document.querySelector('[aria-label="unread"]');
    expect(indicator).toBeNull();
  });

  test("Link has an indicator if it contains unread messages", () => {
    useUnread.mockReturnValue({
      unread: {
        servers: [
          {
            _id: "1",
            channels: [{ _id: "3", unread: 1 }],
          },
        ],
      },
      getRoomUnread: () => 1,
    });

    init();
    const indicator = document.querySelector('[aria-label="unread"]');
    expect(indicator).toBeDefined();
  });
});
