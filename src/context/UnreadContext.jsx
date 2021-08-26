import React, { useContext, useState, useEffect, createContext } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import socket from "../socket/socket";
import useActivity from "../hooks/chat/useActivity";

const UnreadContext = createContext();

/**
 * Keeps track of unread messages in all conversations / servers / channels.
 */
export function useUnread() {
  return useContext(UnreadContext);
}

export function UnreadProvider({ children }) {
  // Tracks rooms that have unread messages (the latest message has a timestamp greater than the user's last visit)
  const [unread, setUnread] = useState();
  const { activity } = useActivity();
  const location = useLocation();

  /**
   * For each conversation, send a request to receive their members.
   * @param {Array} conversations
   */
  const getConversationsMembers = async (conversations) => {
    const responses = await Promise.all(
      conversations.map((conversation) =>
        fetch(
          `${process.env.REACT_APP_SERVER}/conversations/${conversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          }
        )
      )
    );

    const jsons = await Promise.all(
      responses.map((response) => response.json())
    );

    const members = jsons.map((json) => json.members);

    return members;
  };

  /**
   * For each conversation, query the database to know
   * how many messages were written since the last time the user was
   * active in the room (=activity timestamp)
   * @param {Array} conversations - array of objects { _id: {str}, timestamp: {int}}
   * @returns {Array} unread - array of objects { _id: {str}, unread: {int}}
   */

  const getConversationsUnread = async (conversations) => {
    const unread = [];

    const responses = await Promise.all(
      conversations.map((conversation) =>
        fetch(
          `${process.env.REACT_APP_SERVER}/conversations/${conversation._id}/messages?after=${conversation.timestamp}`,
          {
            method: "HEAD",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          }
        )
      )
    );

    const members = await getConversationsMembers(conversations);

    responses.forEach((response, index) =>
      unread.push({
        _id: conversations[index]._id,
        unread: +response.headers.get("X-Total-Count"),
        members: members[index],
      })
    );

    return unread;
  };

  /**
   * For each server channel, query the database to know
   * how many messages were written since the last time the user was
   * active in the channel.
   * @param {Array} channels - array of objects { _id: {str}, timestamp: {int}}
   * @returns {Array} unread - array of objects { _id: {str}, unread: {int}}
   */

  const getChannelsUnread = async (channels) => {
    const unread = [];

    const responses = await Promise.all(
      channels.map((channel) =>
        fetch(
          `${process.env.REACT_APP_SERVER}/channels/${channel._id}/messages?after=${channel.timestamp}`,
          {
            method: "HEAD",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
            },
          }
        )
      )
    );

    responses.forEach((response, index) =>
      unread.push({
        _id: channels[index]._id,
        unread: +response.headers.get("X-Total-Count"),
      })
    );

    return unread;
  };

  /**
   * For each server, use the getChannelsUnread to get the number
   * of unread messages in each channel.
   * @param {Array} servers - array of objects { _id: {str}, channels: [{ _id: {str}, timestamp: {int}}]}
   * @returns {Array} unread - array of objects { _id: {str}, channels:[{ _id: {str}, unread: {int}}]
   */

  const getServersUnread = async (servers) => {
    const unread = await Promise.all(
      servers.map(async (server) => {
        return {
          _id: server._id,
          channels: await getChannelsUnread(server.channels),
        };
      })
    );

    return unread;
  };

  /**
   * For each room of activity, query the database to know
   * how many messages were written since the last time the user was
   * active in the room.
   */
  const getUnread = async () => {
    const unread = {
      servers: [],
      conversations: [],
    };

    unread.conversations = await getConversationsUnread(activity.conversations);
    unread.servers = await getServersUnread(activity.servers);
    setUnread(unread);
  };

  const getRoomUnread = (location) => {
    if (!unread) return;
    if (location.server && location.channel) {
      const unreadServer = unread.servers.find(
        (server) => server._id === location.server
      );
      if (!unreadServer) return;

      const unreadChannel = unreadServer.channels.find(
        (chan) => chan._id === location.channel
      );
      if (!unreadChannel) return;

      return unreadChannel.unread;
    }

    if (location.conversation) {
      const unreadConversation = unread.conversations.find(
        (conversation) => conversation._id === location.conversation
      );
      if (!unreadConversation) return;

      return unreadConversation.unread;
    }
  };

  useEffect(() => {
    // If unread isn't set up yet, set it up.
    if (activity && !unread) getUnread();
  }, [activity]);

  // Socket listeners
  /* Update unread when a new message is sent in a followed room
   * - The user's current location is checked with location.
   * - If the new message is sent in a different room, it is considered "unread"
   *   → It is added to the unread set.
   */

  /**
   * If the new message was sent in a channel the user isn't currently on
   * → Add the channel and server to the unread if they aren't here.
   * → Increment the number of unread messages.
   * @param {string} message - New message that has been sent.
   */
  const handleChannel = (message) => {
    // If I am currently on the channel the message was sent in
    // → Return.
    if (
      message.channel &&
      new RegExp(`/servers/${message.server}/channels/${message.channel}`).test(
        `${location.pathname}`
      )
    )
      return;

    // Else, update the unread messages.
    setUnread((prev) => {
      const updated = { ...prev };

      // If the server isn't in the list of unread servers, adds it.
      if (
        !unread.servers.find(
          (server) => server._id === message.server.toString()
        )
      ) {
        updated.servers.push({
          _id: message.server.toString(),
          channels: [],
        });
      }

      const server = updated.servers.find(
        (server) => server._id === message.server.toString()
      );

      // If the channel isn't in the server's channel list, adds it.
      if (
        !server.channels.find(
          (channel) => channel._id === message.channel.toString()
        )
      ) {
        server.channels.push({
          _id: message.channel.toString(),
          unread: 0,
        });
      }

      // Increment the channel's number of unread messages
      const channel = server.channels.find(
        (channel) => channel._id === message.channel.toString()
      );
      channel.unread += 1;

      return updated;
    });
  };

  /**
   * If the new message was sent in a private conversation the user isn't currently on
   * → Increment its number of unread messages.
   * @param {string} message - New message that has been sent.
   */

  // Get the conversation the user is currently on.
  const current = useRouteMatch("/conversations/:conversationId")?.params
    .conversationId;

  const handleConversation = async (message) => {
    // Fetch the conversation to get its informations.
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/conversations/${message.conversation}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );

    const conversation = await response.json();

    // If the user is already in the conversation, returns.
    if (
      current &&
      conversation.members.find((member) => member._id.toString() === current)
    ) {
      return;
    }

    // Otherwise, update the unread conversations' list.

    setUnread((prev) => {
      const updated = { ...prev };

      // If the conversation isn't in the list, add it.
      if (
        !updated?.conversations.find(
          (conversation) => conversation._id === message.conversation.toString()
        )
      ) {
        const newConversation = {
          _id: message.conversation,
          unread: 0,
          members: conversation.members,
        };
        updated.push(newConversation);
      }

      // Increment the number of unread of the conversation
      const conversationWithUnread = updated.conversations.find(
        (conversation) => conversation._id === message.conversation.toString()
      );

      conversationWithUnread.unread += 1;

      return updated;
    });
  };

  /**
   * When a new message is sent to a socket room the user is in,
   * update the unread state to include the room if the user isn't
   * currently in this room.
   * @param {object} document - Operation type and message sent.
   */
  const handleUnread = (document) => {
    const message = document.document;
    if (message.channel) handleChannel(message);
    if (message.conversation) handleConversation(message);
  };

  /**
   * Set the channel's number of unread messages to 0.
   * @param {string} serverId
   * @param {string} channelId
   */
  const handleReadChannel = (serverId, channelId) => {
    setUnread((prev) => {
      if (!prev || prev.servers.length === 0) return;
      const updated = { ...prev };

      const server = updated.servers.find((server) => server._id === serverId);
      if (!server) return;

      const channel = server.channels.find(
        (channel) => channel._id === channelId
      );
      if (channel) channel.unread = 0;
      return updated;
    });
  };

  /**
   * Set the conversation's number of unread messages to 0.
   * @param {string} conversationId
   */
  const handleReadConversation = (conversationId) => {
    setUnread((prev) => {
      if (!prev || prev.conversations.length === 0) return;
      const updated = { ...prev };
      const conversation = updated.conversations.find(
        (conversation) => conversation._id.toString() === conversationId
      );
      if (conversation) conversation.unread = 0;
      return updated;
    });
  };

  /**
   * Socket listener to update conversation list when a new
   * conversation is created, and the current user is one of its
   * members.
   */
  const handleInsert = (update) => {
    setUnread((prev) => {
      const updated = { ...prev };
      updated.conversations.push({ ...update.document, unread: 0 });
      return updated;
    });
  };

  useEffect(() => {
    socket.on("insert message", handleUnread);
    socket.on("insert conversation", handleInsert);
    return () => {
      socket.off("insert message", handleUnread);
      socket.off("insert conversation", handleInsert);
    };
  }, [unread]);

  const value = {
    unread,
    getRoomUnread,
    handleReadChannel,
    handleReadConversation,
  };

  return (
    <UnreadContext.Provider value={value}>{children}</UnreadContext.Provider>
  );
}

export default UnreadContext;

UnreadProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

UnreadProvider.defaultProps = {
  children: <></>,
};
