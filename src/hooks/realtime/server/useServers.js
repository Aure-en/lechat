import { useState, useEffect } from "react";
import socket from "../../../socket/socket";

function useServers() {
  const [servers, setServers] = useState([]);

  // Load servers the user is in
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/users/${
          JSON.parse(localStorage.getItem("user"))._id
        }/servers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      const json = await res.json();
      if (!json.error) setServers(json);
    })();
  }, []);

  /* Set up socket listeners when:
   * - The user joins a server.
   * - The user leaves a server.
   * - The server is updated by its administrator.
   */

  const handleJoin = () => {};

  const handleLeave = () => {};

  const handleUpdate = () => {};

  return { servers };
}

export default useServers;
