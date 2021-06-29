import { useState, useEffect } from "react";
import socket from "../../socket/socket";

function usePending() {
  const [friendships, setFriendships] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Load pending friends
  useEffect(() => {
    (async () => {
      if (!user) return;
      const res = await fetch(
        `${process.env.REACT_APP_URL}/users/${user._id}/pending`,
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

  const insertFriend = (document) => handleInsert(document);
  const updateFriend = (document) => handleUpdate(document);
  const deleteFriend = (document) => handleDelete(document);

  useEffect(() => {
    socket.on("insert friend", insertFriend);
    return () => socket.off("insert friend", insertFriend);
  }, [friendships]);

  useEffect(() => {
    socket.on("update friend", updateFriend);
    return () => socket.off("update friend", updateFriend);
  }, [friendships]);

  useEffect(() => {
    socket.on("delete friend", deleteFriend);
    return () => socket.off("delete friend", deleteFriend);
  }, [friendships]);

  return {
    friendships,
  };
}

export default usePending;
