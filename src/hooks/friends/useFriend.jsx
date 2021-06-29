import { useState, useEffect } from "react";
import socket from "../../socket/socket";

function useFriend() {
  const [friendships, setFriendships] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Load current friends
  useEffect(() => {
    (async () => {
      if (!user) return;
      const res = await fetch(
        `${process.env.REACT_APP_URL}/users/${user._id}/friends`,
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
  // No need to handle the insert change, as it only concerns pending friends.
  const handleUpdate = (update) => {
    setFriendships([...friendships, update.document]);
  };

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

  const updateFriend = (document) => handleUpdate(document);
  const deleteFriend = (document) => handleDelete(document);

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

export default useFriend;
