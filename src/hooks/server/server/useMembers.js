import { useState, useEffect } from "react";
import socket from "../../../socket/socket";

function useMembers(serverId) {
  const [members, setMembers] = useState([]);

  const getMembers = async (serverId) => {
    const res = await fetch(
      `${process.env.REACT_APP_URL}/servers/${serverId}/members`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const json = await res.json();
    if (!json.error) setMembers(json);
  };

  useEffect(() => {
    getMembers(serverId);
  }, []);

  // Set up socket listeners
  const handleEvent = () => {
    getMembers(serverId);
  };

  useEffect(() => {
    socket.on("member update", handleEvent);
    return () => socket.off("member update", handleEvent);
  }, [members]);

  return { members };
}

export default useMembers;
