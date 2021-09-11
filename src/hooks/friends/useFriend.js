import { useState, useEffect } from "react";
import useSWR from "swr";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket/socket";

function useFriend() {
  const { user } = useAuth();
  const {
    data: friendships,
    loading,
    mutate,
  } = useSWR([
    `${process.env.REACT_APP_SERVER}/users/${user._id}/friends`,
    sessionStorage.getItem("jwt"),
  ]);
  const [friends, setFriends] = useState([]);

  // Get the friends
  // Meaning the user of the friendship who is not the current user.
  useEffect(() => {
    const friends = [];
    friendships?.forEach((friendship) =>
      friends.push({
        friend:
          friendship.sender._id === user._id
            ? friendship.recipient
            : friendship.sender,
        _id: friendship._id, // Necessary to delete the friendship
      })
    );
    setFriends(friends);
  }, [friendships]);

  // Set up socket listeners
  // No need to handle the insert friendship change, as it only concerns pending friends.

  // The recipient accepted the friend request
  // ⟶ Add the friendship to the list.
  const handleUpdate = (update) => {
    mutate(async (prev) => [...prev, update.document]);
  };

  // The recipient declined the friend request
  // ⟶ Remove the friendship from the list.
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

  // When a friend updates their username / avatar
  // ⟶ Update the friendship to display their new informations.
  const handleUserUpdate = (user) => {
    const updated = [...friendships].map((friendship) => {
      if (friendship.recipient._id === user.document._id) {
        return { ...friendship, recipient: user.document };
      }

      if (friendship.sender._id === user.document._id) {
        return { ...friendship, sender: user.document };
      }
      return friendship;
    });
    mutate(updated);
  };

  useEffect(() => {
    socket.on("update friend", handleUpdate);
    socket.on("delete friend", handleDelete);
    socket.on("user update", handleUserUpdate);
    return () => {
      socket.off("update friend", handleUpdate);
      socket.off("delete friend", handleDelete);
      socket.off("user update", handleUserUpdate);
    };
  }, [friendships]);

  return {
    friendships,
    friends,
    loading,
  };
}

export default useFriend;
