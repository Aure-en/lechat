import { useHistory } from "react-router-dom";
import useActivity from "../chat/useActivity";

function useJoin(serverId) {
  const history = useHistory();
  const { updateChannelActivity } = useActivity();

  const join = async (serverId) => {
    // Join server
    await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/servers/${serverId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
      `${process.env.REACT_APP_URL}/servers/${serverId}/channels`
    );
    const json = await res.json();

    // Array containing only the _id of server channels.
    const channels = json.map((channel) => channel._id);

    await Promise.all(
      channels.map((channel) => updateChannelActivity(serverId, channel))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await join(serverId);
    await setActivity(serverId);
    history.push(`/servers/${serverId}`);
  };

  return { handleSubmit };
}

export default useJoin;
