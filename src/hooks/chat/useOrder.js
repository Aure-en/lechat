import { useState, useEffect } from "react";
import { useUnread } from "../../context/UnreadContext";

function useOrder(messages) {
  const [ordered, setOrdered] = useState([]);
  const { getRoomUnread } = useUnread();

  // Helper function to compare dates
  const compareDates = (timestamp1, timestamp2) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);
    if (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
      return true;
    return false;
  };

  // Helper function to get location to get the number of unread messages
  // in the related room.
  const getLocation = (messages) => {
    const message = messages[0];

    if (message.server && message.channel) {
      return {
        server: message.server,
        channel: message.channel,
      };
    }
    if (message.conversation) {
      return { conversation: message.conversation };
    }
  };

  // Group messages by author and time so that the author isn't displayed in front of every message.
  useEffect(() => {
    if (messages.length < 1) return;
    const ordered = [];
    let unordered = [...messages];

    // Get unread messages
    const location = getLocation(messages);
    const unread = getRoomUnread(location);

    // Give a property unread: true to the oldest unread message.
    unordered = unordered.map((message, index) => {
      if (index === unordered.length - unread) {
        // Copy message and add the unread property.
        const withProperty = JSON.parse(JSON.stringify(message));
        withProperty.unread = true;
        return withProperty;
      }
      return message;
    });

    unordered.map((message, index) => {
      // Create the first group from the first message
      if (index === 0) {
        ordered.push({
          author: message.author,
          timestamp: message.timestamp,
          messages: [message],
          _id: message._id,
        });
        return;
      }

      /*
        Loop over messages.
        - If the message has the same author and same date as the previous one,
          push it in the same group.
        - Else, create a new group of messages.
      */

      if (
        message.author._id === ordered[ordered.length - 1].author._id &&
        compareDates(message.timestamp, ordered[ordered.length - 1].timestamp)
      ) {
        ordered[ordered.length - 1].messages.push(message);
      } else {
        ordered.push({
          author: message.author,
          timestamp: message.timestamp,
          messages: [message],
          _id: message._id,
        });
      }
    });
    setOrdered(ordered);
    console.log(ordered);
  }, [messages]);

  return { ordered };
}

export default useOrder;
