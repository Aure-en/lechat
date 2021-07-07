import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function useRequest() {
  const [friend, setFriend] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!friend) return setError("Friend must be specified");
    if (friend === user.username || friend === user.email) {
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
    return setSuccess("Friend request successfully sent.");
  };

  return {
    friend,
    setFriend,
    error,
    handleSubmit,
    success,
  };
}

export default useRequest;
