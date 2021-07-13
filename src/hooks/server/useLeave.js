import { useLocation, useHistory } from "react-router-dom";

function useLeave(serverId) {
  const history = useHistory();
  const location = useLocation();

  /**
   * Send request to leave the server.
   * @param {string} serverId
   * @returns {boolean} - true if the user successfully left the server, false otherwise.
   */
  const leave = async (serverId) => {
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/servers/${serverId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    if (json.error) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await leave(serverId);

    // If the user was on the server page, redirects them.
    if (success && new RegExp(`/servers/${serverId}`).test(location.pathname)) {
      history.push("/");
    }
  };

  return { handleSubmit };
}

export default useLeave;
