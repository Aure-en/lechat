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
    console.log("INSERT", friendship);
    setFriendships([...friendships, friendship.document]);
  };

  // When a friendship document is updated,
  // it means that the recipient has accepted the friend request.
  const handleUpdate = (update) => {
    console.log("UPDATE", update);
    setFriendships(
      [...friendships].filter(
        (friendship) => friendship._id !== update.document._id
      )
    );
  };

  // Since deletion is sent to everyone, checks if the user is related to the change.
  const handleDelete = (deleted) => {
    console.log("DELETE", deleted);
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
    socket.on("insert friend", (document) => {
      handleInsert(document);
    });
    return () => socket.off("insert friend");
  }, [friendships]);

  useEffect(() => {
    socket.on("update friend", (document) => {
      handleUpdate(document);
    });
    return () => socket.off("update friend");
  }, [friendships]);

  useEffect(() => {
    socket.on("delete friend", (document) => {
      handleDelete(document);
    });
    return () => socket.off("delete friend");
  }, [friendships]);

  return {
    friendships,
    setFriendships,
  };
}

export default usePending;
