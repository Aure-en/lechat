import React, { useState } from "react";

function Add() {
  const [friend, setFriend] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!friend) return setError("Friend must be specified");
    if (
      friend === JSON.parse(localStorage.getItem("user")).username ||
      friend === JSON.parse(localStorage.getItem("user")).email
    ) {
      return setError("You cannot send yourself a friend request.");
    }

    // Check if user exists
    const userRes = await fetch(
      `${process.env.REACT_APP_URL}/users?search=${friend}`
    );
    const userJson = await userRes.json();

    // If the user doesn't exist, say we could not find them.
    if (userJson.error) return setError(userJson.error);

    // User exists, send friend request
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${userJson._id}/friends`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    if (json.error) return setError(json.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="friend">
        <input
          type="text"
          id="friend"
          name="friend"
          value={friend}
          onChange={(e) => setFriend(e.target.value)}
        />
      </label>
      <small>
        Search for a friend from their username (case sensitive) / email.
      </small>
      {error && <small>{error}</small>}

      <button type="submit">Send Request</button>
    </form>
  );
}

export default Add;
