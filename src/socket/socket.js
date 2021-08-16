import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER);

// Socket listener to join rooms when a user becomes part of
// a server or a conversation.
socket.on("join", (room) => {
  socket.emit("join", room);
});

export default socket;
