import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

function useDelete(channelId, serverId) {
  const [error, setError] = useState("");
  const history = useHistory();
  const location = useLocation();

  /**
   * Send the request to the server to delete the channel
   * @param {string} channelId
   * @returns {boolean} - true if the channel was successfully deleted, false otherwise.
   */
  const remove = async (channelId) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/channels/${channelId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    if (json.error) {
      setError(json.error);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await remove(channelId);

    // If the user is in the channel he deleted, he is redirected.
    if (
      success &&
      new RegExp(`/servers/${serverId}/channels/${channelId}`).test(
        location.pathname
      )
    ) {
      history.push(`/servers/${serverId}`);
    }
  };

  return {
    error,
    handleSubmit,
  };
}

export default useDelete;
