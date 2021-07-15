import { useState, useEffect } from "react";
import socket from "../../socket/socket";

/**
 * Get the location of a room (channel of conversation id) and set up
 * socket listeners to know which users are currently typing.
 * @param {string} location
 */
function useTyping(location) {
  // List of users typing.
  const [typing, setTyping] = useState(new Set());

  /**
   * Callback called on socket typing event.
   * Update the list of users who are currently typing.
   * @param {object} data
   * {
   *   location: {string} - channel / conversation id,
   *   user: {string} - username,
   *   typing: {boolean} - true if the user is typing, false if they are done typing.
   * }
   */
  const handleTyping = (data) => {
    if (location !== data.location) return;

    // If the user is typing, add them to the list of users who are currently typing.
    if (location.typing) {
      setTyping((prev) => {
        const copy = new Set(JSON.parse(JSON.stringify([...prev])));
        copy.add(location.user);
        return copy;
      });

    // Else, remove them.
    } else {
      setTyping((prev) => {
        const copy = new Set(JSON.parse(JSON.stringify([...prev])));
        copy.remove(location.user);
        return copy;
      });
    }
  };

  useEffect(() => {
    socket.on("typing", handleTyping);
    return () => socket.off("typing", handleTyping);
  }, [location]);

  return {
    typing,
  };
}

export default useTyping;
