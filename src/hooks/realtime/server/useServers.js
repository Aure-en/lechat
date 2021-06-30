import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import socket from "../../../socket/socket";

function useServers() {
  const [servers, setServers] = useState([]);
  const { user } = useAuth();

  const getUserServers = async (userId) => {
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${userId}/servers`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const json = await res.json();
    if (!json.error) setServers(json);
  };

  // Load servers the user is in
  useEffect(() => {
    getUserServers(user._id);
  }, []);

  // Set up socket listener
  const handleUpdate = (update) => {
    if (!Object.keys(update.fields).includes("server")) return;
    // Fetch servers and set the new ones
    /* We could look at whether a server was added or removed in update.document
     * However, we would still need to fetch the server name and icon from its _id.
     * Since fetching data is needed anyway, I'll just fetch the whole servers.
     */

    getUserServers(user._id);
  };

  useEffect(() => {
    socket.on("account update", handleUpdate);
    return () => socket.off("account update", handleUpdate);
  }, [servers]);

  return { servers };
}

export default useServers;
