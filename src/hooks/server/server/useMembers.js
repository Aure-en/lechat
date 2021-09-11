import { useEffect } from "react";
import useSWR from "swr";
import socket from "../../../socket/socket";

function useMembers(serverId) {
  const API_ENDPOINT = `${process.env.REACT_APP_SERVER}/servers/${serverId}/members`;

  const { data: members, mutate } = useSWR([
    API_ENDPOINT,
    sessionStorage.getItem("jwt"),
  ]);

  // When someone leaves / joins the server, update the members list.
  const handleEvent = () => {
    mutate(API_ENDPOINT);
  };

  useEffect(() => {
    socket.on("member update", handleEvent);
    return () => socket.off("member update", handleEvent);
  }, [members]);

  return { members };
}

export default useMembers;
