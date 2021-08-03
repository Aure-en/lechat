import { useState, useEffect } from "react";
import socket from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

function usePending() {
  const [friendships, setFriendships] = useState([]);
  const { user } = useAuth();

  // Load pending friends
  useEffect(() => {
    (async () => {
      if (!user) return;
      const res = await fetch(
        `${process.env.REACT_APP_SERVER}/users/${user._id}/pending`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      const json = await res.json();
      if (!json.error) setFriendships(json);
    })();
  }, []);

  // Set up socket listeners
  const handleInsert = (friendship) => {
    setFriendships([...friendships, friendship.document]);
  };

  // When a friendship document is updated,
  // it means that the recipient has accepted the friend request.
  const handleUpdate = (update) => {
    setFriendships(
      [...friendships].filter(
        (friendship) => friendship._id !== update.document._id
      )
    );
  };

  // Since deletion is sent to everyone, checks if the user is related to the change.
  const handleDelete = (deleted) => {
    if (
      friendships.findIndex(
        (friendship) => friendship._id === deleted.document._id
      ) !== -1
    ) {
      setFriendships((prev) =>
        prev.filter((friendship) => friendship._id !== deleted.document._id)
      );
    }
  };

  useEffect(() => {
    socket.on("insert friend", handleInsert);
    return () => socket.off("insert friend", handleInsert);
  }, [friendships]);

  useEffect(() => {
    socket.on("update friend", handleUpdate);
    return () => socket.off("update friend", handleUpdate);
  }, [friendships]);

  useEffect(() => {
    socket.on("delete friend", handleDelete);
    return () => socket.off("delete friend", handleDelete);
  }, [friendships]);

  return {
    friendships,
  };
}

export default usePending;
