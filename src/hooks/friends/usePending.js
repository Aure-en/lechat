import { useState, useEffect } from "react";
import useSWR from "swr";
import socket from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

function usePending() {
  const { user } = useAuth();
  const {
    data: friendships,
    loading,
    mutate,
  } = useSWR([
    `${process.env.REACT_APP_SERVER}/users/${user._id}/pending`,
    sessionStorage.getItem("jwt"),
  ]);
  const [incomingRequests, setIncomingRequests] = useState([]);

  // Get incoming friends requests
  useEffect(() => {
    if (!friendships) return;
    setIncomingRequests(
      [...friendships].filter(
        (friendship) => friendship.recipient._id.toString() === user._id
      )
    );
  }, [friendships, user._id]);

  // Set up socket listeners

  // When a friend request is sent
  // ⟶ Add the request to the list.
  const handleInsert = (update) => {
    mutate(async (prev) => [...prev, update.document]);
  };

  // When a friendship document is updated,
  // it means that the recipient has accepted the friend request.
  const handleUpdate = (update) => {
    mutate(async (prev) =>
      prev.filter((friendship) => friendship._id !== update.document._id)
    );
  };

  // Since deletion is sent to everyone, checks if the user is related to the change.
  const handleDelete = (deleted) => {
    if (
      friendships.findIndex(
        (friendship) => friendship._id === deleted.document._id
      ) !== -1
    ) {
      mutate(async (prev) => {
        prev.filter((friendship) => friendship._id !== deleted.document._id);
      });
    }
  };

  useEffect(() => {
    socket.on("insert friend", handleInsert);
    socket.on("update friend", handleUpdate);
    socket.on("delete friend", handleDelete);
    return () => {
      socket.off("insert friend", handleInsert);
      socket.off("update friend", handleUpdate);
      socket.off("delete friend", handleDelete);
    };
  }, [friendships]);

  return {
    friendships,
    incomingRequests,
    loading,
  };
}

export default usePending;
