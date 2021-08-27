import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import socket from "../../../socket/socket";

// Keep track of the servers the user is a member of.
function useServers() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const getUserServers = async (userId) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/users/${userId}/servers`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    const json = await res.json();
    if (!json.error) setServers(json);
  };

  // Load servers the user is in
  useEffect(() => {
    (async () => {
      await getUserServers(user._id);
      setLoading(false);
    })();
  }, []);

  // Set up socket listener
  const handleUpdate = (update) => {
    if (!Object.keys(update.fields).find((key) => /server/.test(key))) return;
    // Fetch servers and set the new ones
    /* We could look at whether a server was added or removed in update.document
     * However, we would still need to fetch the server name and icon from its _id.
     * Since fetching data is needed anyway, I'll just fetch the whole servers.
     */

    getUserServers(user._id);
  };

  /**
   * When a server is updated, updates the servers list.
   * @param {object} updated
   */
  const handleServerUpdate = (updated) => {
    setServers((prev) =>
      [...prev].map((server) =>
        server._id === updated.document._id ? updated.document : server
      )
    );
  };

  /**
   * Update the display when:
   * - The server's settings are updated.
   * - The user joins / leaves a server.
   */
  useEffect(() => {
    socket.on("update server", handleServerUpdate);
    socket.on("account update", handleUpdate);
    return () => {
      socket.off("update server", handleServerUpdate);
      socket.off("account update", handleUpdate);
    };
  }, [servers]);

  return { servers, loading };
}

export default useServers;
