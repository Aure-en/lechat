import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useAuth } from "../../context/AuthContext";
import decorator from "../../components/chat/form/editor/entities/decorator";
import socket from "../../socket/socket";

/**
 * Chat form. Saves new / updated message.
 * @param {object} location - room location
 * @param {object} message - message the user is updating.
 * @param {function} setEditing - after the user updated a message, set the editing status to false.
 * @param {function} setMessages - adds / updates existing messages before getting the answer from the DB.
 */
function useForm(location, message, setEditing, setMessages) {
  // editorState contains the typed text with rich edition.
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );
  const [url, setUrl] = useState("");
  const { user } = useAuth();

  /**
   * Helper function to determine if anything is written.
   * @params {object} editorState
   * @returns {boolean} true if the editor is empty, false otherwise.
   */
  const isEmpty = (editorState) => {
    const content = convertToRaw(editorState.getCurrentContent());
    if (content.blocks.length === 1 && !content.blocks[0].text) return true;
  };

  // Set up the URL depending on the location and whether or not we are updating a message
  useEffect(() => {
    // If we are editing a message
    if (message) {
      return setUrl(`${process.env.REACT_APP_SERVER}/messages/${message._id}`);
    }

    // If we are writing in a private conversation
    if (location.conversation) {
      return setUrl(
        `${process.env.REACT_APP_SERVER}/conversations/${location.conversation}/messages`
      );
    }

    // If we are writing in a public server
    if (location.server && location.channel) {
      return setUrl(
        `${process.env.REACT_APP_SERVER}/servers/${location.server}/channels/${location.channel}/messages`
      );
    }
  }, [location]);

  // If we want to edit a message, load its text.
  useEffect(() => {
    if (message) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(message.text)))
      );
    }
  }, [message]);

  // Send an event when the user starts / stops typing.
  useEffect(() => {
    socket.emit("typing", {
      location: location.conversation
        ? location.conversation
        : location.channel,
      user: user.username,
      typing: !isEmpty(editorState),
    });
  }, [editorState]);

  /**
   * When the user leaves the channel / conversation,
   * to remove him from the typing users list
   * if he was currently typing.
   */
  useEffect(() => {
    return () =>
      socket.emit("typing", {
        location: location.conversation
          ? location.conversation
          : location.channel,
        user: user.username,
        typing: false,
      });
  }, [location.conversation, location.server, location.channel]);

  const saveMessage = async (method, text) => {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const json = await res.json();
    return json;
  };

  const updateMessage = (text) => {
    setMessages((prev) =>
      [...prev].map((old) => {
        if (old._id === message._id) {
          return { ...old, text };
        }
        return old;
      })
    );

    saveMessage("PUT", text);
  };

  const createMessage = async (text) => {
    const tempId = Date.now();

    setMessages((prev) => [
      ...prev,
      {
        author: user,
        channel: location.channel,
        server: location.server,
        conversation: location.conversation,
        text,
        timestamp: new Date(),
        tempId,
      },
    ]);

    const messageWithId = await saveMessage("POST", text);

    setMessages((prev) =>
      [...prev].map((old) =>
        old.tempId && old.tempId === tempId ? messageWithId : old
      )
    );
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    // Validation
    // If nothing is written in the text editor, doesn't submit the form.
    const content = convertToRaw(editorState.getCurrentContent());
    if (content.blocks.length === 1 && !content.blocks[0].text) return;

    const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    // Reset the form
    if (message) {
      setEditing(false);
    }

    setEditorState(() => EditorState.createEmpty(decorator));

    // Display the message immediately for its author

    // If the user is updating a message, update it immediately for him.
    if (message) {
      updateMessage(text);
    } else {
      // If the user is writing a new message, add it immediately to the messages array for him.
      createMessage(text);
    }
  };

  return {
    editorState,
    setEditorState,
    handleSubmit,
  };
}

export default useForm;
