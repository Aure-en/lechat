import React, { useContext, useState, useEffect, createContext } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import PropTypes from "prop-types";
import socket from "../socket/socket";
import useActivity from "../hooks/chat/useActivity";

const UnreadContext = createContext();

export function useUnread() {
  return useContext(UnreadContext);
}

export function UnreadProvider({ children }) {
  // Tracks rooms that have unread messages (the latest message has a timestamp greater than the user's last visit)
  const [unread, setUnread] = useState({
    servers: [],
    conversations: [],
  });
  const { activity } = useActivity();
  const location = useLocation();

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
          `${process.env.REACT_APP_URL}/conversations/${conversation._id}/messages?after=${conversation.timestamp}`,
          {
            method: "HEAD",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
      )
    );

    responses.forEach((response, index) =>
      unread.push({
        _id: conversations[index]._id,
        unread: +response.headers.get("X-Total-Count"),
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
          `${process.env.REACT_APP_URL}/channels/${channel._id}/messages?after=${channel.timestamp}`,
          {
            method: "HEAD",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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

    console.log("UNREAD", unread);
    setUnread(unread);
  };

  useEffect(() => {
    if (!activity) return;
    console.log("ACTIVITY", activity);
    getUnread();
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
      new RegExp(`${location.pathname}`).test(
        `/servers/${message.server}/channels/${message.channel}`
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
  const handleConversation = async (message) => {
    if (message.conversation) {
      // If the user is not in a conversation, add to unread.
      if (!new RegExp(`${location.pathname}`).test("/conversations")) {
        setUnread((prev) => {
          const copy = { ...prev };
          copy.conversations.push({ _id: message.conversation, unread: 0 });
          return copy;
        });

        // Else, check that he isn't on the current conversation.
      } else {
        const current = useRouteMatch("/conversations/:conversationId").params
          .conversationId;

        // Fetch the current conversation to check if it is the one
        // the user is currently in.
        const res = await fetch(
          `${process.env.REACT_APP_URL}/conversations/${message.conversation}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        const json = await res.json();
        if (!json.members.includes(current)) {
          setUnread((prev) => {
            const updated = { ...prev };
            const conversation = updated.conversations.find(
              (conversation) =>
                conversation._id === message.conversation.toString()
            );
            conversation.unread += 1;
            return updated;
          });
        }
      }
    }
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

  useEffect(() => {
    socket.on("insert message", handleUnread);
    return () => socket.off("insert message", handleUnread);
  });

  /** Remove the channel from the server's list of unread channels.
   * If removing this channel makes the server's list of unread channels,
   * → Remove the server from the unread list of servers.
   * @param {string} server
   * @param {string} channel
   */
  const handleReadChannel = (server, channel) => {
    setUnread((prev) => {
      const updated = { ...prev };
      const readServer = updated.servers.find(
        (serv) => server === serv._id.toString()
      );

      // Remove the channel from the list
      readServer.channels.delete(channel);

      // If the list becomes empty, remove the server from unreads.
      if (readServer.channels.length === 0) {
        updated.servers = updated.servers.filter(
          (serv) => server !== serv._id.toString()
        );
      }

      return updated;
    });
  };

  /**
   * Remove the conversation id from the list of unread conversations.
   * @param {string} conversation
   */
  const handleReadConversation = (conversation) => {
    setUnread((prev) => {
      const updated = { ...prev };
      updated.conversations.delete(conversation);
      return updated;
    });
  };

  const value = {
    unread,
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
