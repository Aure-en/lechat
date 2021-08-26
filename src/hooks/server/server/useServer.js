import { useState, useEffect } from "react";
import socket from "../../../socket/socket";

// Keep track of a server's informations.
function useServer(serverId) {
  const [server, setServer] = useState();
  const [loading, setLoading] = useState(true);

  // Load existing server
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/servers/${serverId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          },
        }
      );
      const json = await res.json();
      if (!json.error) setServer(json);
      setLoading(false);
    })();
  }, [serverId]);

  // Set up socket listeners
  const handleUpdate = (updated) => {
    setServer(updated.document);
  };

  // Update the display when the server's settings are updated.
  useEffect(() => {
    socket.on("update server", handleUpdate);
    return () => socket.off("update server", handleUpdate);
  }, [server]);

  return {
    server,
    loading,
  };
}

export default useServer;
