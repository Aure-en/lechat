import { useState, useEffect } from "react";
import socket from "../../socket/socket";

/**
 * Get pinned messages in a certain conversation / server channel.
 * Update them in real time with socket listeners.
 *  * @param {object} location. Either :
 * - { conversation: {string} id }
 * - { channel: {string} id }
 */
function usePin(location) {
  const [messages, setMessages] = useState([]);
  const [last, setLast] = useState(""); // Used to load more messages by fetching messages with an id < last id loaded.
  const [loading, setLoading] = useState(true); // Used to know when the response for the first request has arrived.

  // Helper function to get the endpoint linked to the room
  const setUrl = (location, lastMessageId) => {
    if (location.conversation) {
      return `${process.env.REACT_APP_SERVER}/conversations/${
        location.conversation
      }/messages?limit=15&pinned=true${
        lastMessageId ? `&last_key=${lastMessageId}` : ""
      }`;
    }

    if (location.channel) {
      return `${process.env.REACT_APP_SERVER}/channels/${
        location.channel
      }/messages?limit=15&pinned=true${
        lastMessageId ? `&last_key=${lastMessageId}` : ""
      }`;
    }
  };

  const getMessages = async (url) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    const json = await res.json();
    return json;
  };

  // Load pinned messages after entering a room
  useEffect(() => {
    (async () => {
      const url = setUrl(location);
      const messages = await getMessages(url);
      setMessages(messages.sort((a, b) => a.timestamp - b.timestamp));
      setLoading(false);
    })();
  }, [location.conversation, location.server, location.channel]);

  /** Load more messages by modying the last id */
  const getPrevious = async () => {
    if (messages.length > 1 && (!last || messages[0]._id < last)) {
      // Tells useMessage the key of the latest message we loaded
      // useMessage will then fetch messages with a key < the latest key.
      // and add them to the messages array.
      setLast(messages[0]._id);
    }
  };

  useEffect(() => {
    if (!last) return;
    (async () => {
      const url = setUrl(location, last);
      const previous = await getMessages(url);
      setMessages((prev) => [
        ...prev,
        ...previous.sort((a, b) => a.timestamp - b.timestamp),
      ]);
    })();
  }, [last]);

  // Set up socket listeners to update pinned messages in real time
  const handleUpdate = (updated) => {
    const message = updated.document;

    // If the message has never been pinned / unpinned, message.pinned is undefined.
    // To check if the message has been unpinned, use a strict comparison with false.
    if (message.pinned === false) {
      setMessages((prev) =>
        [...prev].filter((pinned) => pinned._id !== message._id)
      );
    } else if (message.pinned) {
      setMessages((prev) => [message, ...prev]);
    }
  };

  useEffect(() => {
    socket.on("update message", handleUpdate);
    return () => socket.off("update message", handleUpdate);
  }, []);

  return {
    loading,
    messages,
    getPrevious,
  };
}

export default usePin;
