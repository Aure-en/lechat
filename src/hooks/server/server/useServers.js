import { useEffect } from "react";
import useSWR from "swr";
import { useAuth } from "../../../context/AuthContext";
import socket from "../../../socket/socket";

// Keep track of the servers the user is a member of.
function useServers() {
  const { user } = useAuth();
  const {
    data: servers,
    loading,
    mutate,
  } = useSWR([
    `${process.env.REACT_APP_SERVER}/users/${user?._id}/servers`,
    sessionStorage.getItem("jwt"),
  ]);

  // Set up socket listener
  const handleUpdate = (update) => {
    if (!Object.keys(update.fields).find((key) => /server/.test(key))) return;
    // Fetch servers and set the new ones
    mutate();
  };

  /**
   * When a server is updated, updates the servers list.
   * @param {object} updated
   */
  const handleServerUpdate = (updated) => {
    mutate(async (prev) =>
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
