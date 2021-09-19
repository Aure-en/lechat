import { useState, useCallback, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import socket from "../../socket/socket";

/**
 * Get pinned messages in a certain conversation / server channel.
 * Update them in real time with socket listeners.
 *  * @param {object} location. Either :
 * - { conversation: {string} id }
 * - { channel: {string} id }
 */
function usePin(location) {
  const [ordered, setOrdered] = useState([]);
  const getKey = (index, prev) => {
    if (index !== 0 && !prev[prev.length - 1]?._id) return; // There are no messages left.

    let endpoint = `${process.env.REACT_APP_SERVER}`;
    if (location.conversation) {
      endpoint += `/conversations/${location.conversation}/messages?limit=10&pinned=true`;

      // If there already are loaded messages, fetch the previous ones.
      if (prev && prev[prev.length - 1]?._id) {
        endpoint += `&last_key=${prev[prev.length - 1]._id}`;
      }
    }

    if (location.channel) {
      endpoint += `/channels/${location.channel}/messages?limit=10&pinned=true`;

      // If there already are loaded messages, fetch the previous ones.
      if (prev && prev[prev.length - 1]?._id) {
        endpoint += `&last_key=${prev[prev.length - 1]._id}`;
      }
    }
    return [endpoint, sessionStorage.getItem("jwt")];
  };

  const { data: messages, mutate, size, setSize } = useSWRInfinite(getKey);

  const isLoadingInitial = !messages;
  const isLoadingMore =
    isLoadingInitial ||
    (size > 0 && messages && typeof messages[size - 1] === "undefined");

  useEffect(() => {
    setOrdered(messages?.flat() || []);
  }, [messages]);

  /** Load more messages by modying the last id */
  const getPrevious = useCallback(async () => {
    if (messages?.length > 0 && !isLoadingMore) {
      // Tells useMessage the key of the latest message we loaded
      // useMessage will then fetch messages with a key < the latest key.
      // and add them to the messages array.
      setSize(size + 1);
    }
  }, [messages]);

  // Set up socket listeners to update pinned messages in real time
  const handleUpdate = (updated) => {
    const message = updated.document;

    // If the message has never been pinned / unpinned, message.pinned is undefined.
    // To check if the message has been unpinned, use a strict comparison with false.
    if (message.pinned === false) {
      // Unpin the message
      mutate((prev) => {
        const updated = [...prev];
        const pageIndex = updated.findIndex((group) =>
          group.find((pinned) => message._id === pinned._id)
        );
        updated[pageIndex] = updated[pageIndex].filter(
          (pinned) => pinned._id !== message._id
        );
        return updated;
      }, false);
    } else if (message.pinned) {
      // Pin the message
      mutate((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].push(message);
        return updated;
      }, false);
    }
  };

  const handleScroll = (e) => {
    if (
      e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + 50 &&
      !isLoadingMore
    ) {
      getPrevious();
    }
  };

  useEffect(() => {
    socket.on("update message", handleUpdate);
    return () => socket.off("update message", handleUpdate);
  }, []);

  return {
    messages: ordered,
    loading: isLoadingMore,
    handleScroll,
  };
}

export default usePin;
