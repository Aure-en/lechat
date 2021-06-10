import React, { useState, useEffect } from "react";

function Pending() {
  const [pending, setPending] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch friends
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/users/${
          JSON.parse(localStorage.getItem("user"))._id
        }/pending`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (json.error) return setError(json.error);
      setPending(json);
    })();
  }, []);

  const handleRequest = async (requestId, isAccepting) => {
    await fetch(`${process.env.REACT_APP_URL}/friends/${requestId}`, {
      method: isAccepting ? "PUT" : "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ul>
      {pending.map((request) => (
        <li key={request._id}>
          {request.sender.username}
          <button
            type="button"
            onClick={() => handleRequest(request._id, true)}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => handleRequest(request._id, false)}
          >
            Decline
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pending;
