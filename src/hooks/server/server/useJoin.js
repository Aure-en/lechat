import { useState } from "react";
import { useHistory } from "react-router-dom";
import useActivity from "../../chat/useActivity";
import { useAuth } from "../../../context/AuthContext";
import socket from "../../../socket/socket";

function useJoin(serverId) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { updateChannelActivity } = useActivity();
  const { user } = useAuth();

  const join = async (serverId) => {
    // Join server
    await fetch(
      `${process.env.REACT_APP_SERVER}/users/${
        JSON.parse(sessionStorage.getItem("user"))._id
      }/servers/${serverId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  /* Update activity.
   * For all server channels, timestamp is set up to the time of joining.
   * Fetch all the server channels
   * Loops over them to add the activity.
   */
  const setActivity = async (serverId) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/servers/${serverId}/channels`
    );
    const json = await res.json();

    // Array containing only the _id of server channels.
    const channels = json.map((channel) => channel._id);

    await Promise.all(
      channels.map(
        async (channel) => await updateChannelActivity(user, serverId, channel)
      )
    );
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await join(serverId);
    await setActivity(serverId);
    socket.emit("join", serverId);
    history.push(`/servers/${serverId}`);
  };

  return { loading, handleSubmit };
}

export default useJoin;
