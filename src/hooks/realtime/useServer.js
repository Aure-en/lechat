import { useState, useEffect } from "react";
import socket from "../../socket/socket";

function useUpdate(serverId) {
  const [server, setServer] = useState();

  // Load existing server
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/servers/${serverId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      const json = await res.json();
      if (!json.error) setServer(json);
    })();
  }, [serverId]);

  // Set up socket listeners
  const handleUpdate = (updated) => {
    console.log(server, updated);
    setServer(updated.document);
  };

  useEffect(() => {
    socket.on("update server", handleUpdate);
    return () => socket.off("update server", handleUpdate);
  }, [server]);

  return {
    server,
  };
}

export default useUpdate;
