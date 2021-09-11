import { useEffect } from "react";
import useSWR from "swr";
import socket from "../../../socket/socket";

// Keep track of a server's informations.
function useServer(serverId) {
  const {
    data: server,
    loading,
    mutate,
  } = useSWR([`${process.env.REACT_APP_SERVER}/servers/${serverId}`]);

  // Set up socket listeners
  const handleUpdate = () => {
    mutate();
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
