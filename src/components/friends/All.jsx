import React, { useState, useEffect } from "react";

function All() {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch friends
    (async () => {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/users/${
          JSON.parse(localStorage.getItem("user"))._id
        }/friends`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (json.error) return setError(json.error);
      setFriends(json);
      console.log(json);
    })();
  }, []);

  const remove = async (friendshipId) => {
    await fetch(`${process.env.REACT_APP_URL}/friends/${friendshipId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <ul>
      {friends.map((friend) => (
        <li key={friend._id}>
          {friend.recipient._id === JSON.parse(localStorage.getItem("user"))._id ? (
            <>{friend.sender.username}</>
          ) : (
            <>{friend.recipient.username}</>
          )}
          <button type="button" onClick={() => remove(friend._id)}>
            Remove Friend
          </button>
        </li>
      ))}
    </ul>
  );
}

export default All;
