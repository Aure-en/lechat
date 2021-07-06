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
    conversations: new Set([]),
  });
  const { activity } = useActivity();
  const location = useLocation();

  /**
   * TO-DO: Fetch activity.
   * For each room of activity, fetch the latest message timestamp.
   * Compare the timestamp to the activity timestamp (=when the user last visited the room)
   * Set up unread messages when the last visit timestamp < latest message timestamp. 
   */
  useEffect(() => {
    console.log(activity);
  }, [activity]);

  // Socket listeners
  /* Update unread when a new message is sent in a followed room
   * - The user's current location is checked with location.
   * - If the new message is sent in a different room, it is considered "unread"
   *   → It is added to the unread set.
   */

  /**
   * If the new message was sent in a channel the user isn't currently on
   * → Add the channel and server to the unread set.
   * @param {string} message - New message that has been sent.
   */
  const handleChannel = (message) => {
    if (
      message.channel &&
      !new RegExp(`${location.pathname}`).test(
        `/servers/${message.server}/channels/${message.channel}`
      )
    ) {
      // If the server isn't in the list of unread servers, adds it.
      if (
        !unread.servers.find(
          (server) => server._id === message.server.toString()
        )
      ) {
        setUnread((prev) => {
          const updated = { ...prev };
          updated.servers.push({
            _id: message.server,
            channels: new Set([message.channel]),
          });
          return updated;
        });

        // Else, if the server is already in the list, update its channels.
      } else {
        setUnread((prev) => {
          const updated = { ...prev };
          updated.servers = updated.servers.map((server) => {
            if (server._id === message.server.toString()) {
              const copy = { ...server };
              server.channels.add(message.channel);
              return copy;
            }
            return server;
          });
          return updated;
        });
      }
    }
  };

  /**
   * If the new message was sent in a private conversation the user isn't currently on
   * → Add it to the unread set.
   * @param {string} message - New message that has been sent.
   */
  const handleConversation = async (message) => {
    if (message.conversation) {
      // If the user is not in a conversation, add to unread.
      if (!new RegExp(`${location.pathname}`).test("/conversations")) {
        setUnread((prev) => {
          const copy = { ...prev };
          copy.conversations.add(message.conversation);
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
            updated.conversations.add(message.conversation);
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
    handleChannel(message);
    handleConversation(message);
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
