import { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useAuth } from "../../context/AuthContext";
import decorator from "../../components/chat/form/editor/entities/decorator";
import socket from "../../socket/socket";

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
      return setUrl(`${process.env.REACT_APP_URL}/messages/${message._id}`);
    }

    // If we are writing in a private conversation
    if (location.conversation) {
      return setUrl(
        `${process.env.REACT_APP_URL}/conversations/${location.conversation}/messages`
      );
    }

    // If we are writing in a public server
    if (location.server && location.channel) {
      return setUrl(
        `${process.env.REACT_APP_URL}/servers/${location.server}/channels/${location.channel}/messages`
      );
    }
  }, [location]);

  // If we want to edit a message, load its text.
  useEffect(() => {
    message &&
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(message.text)))
      );
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

  const handleSubmit = async (e) => {
    e && e.preventDefault();

    // Validation
    // If nothing is written in the text editor, doesn't submit the form.
    const content = convertToRaw(editorState.getCurrentContent());
    if (content.blocks.length === 1 && !content.blocks[0].text) return;

    const text = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    // Update the messages displayed without waiting for the dabatase on update
    // Cannot do that with adding message unless I set an _id myself.
    if (message) {
      setMessages((prev) =>
        [...prev].map((elem) =>
          elem._id.toString() === message._id
            ? {
                author: {
                  username: JSON.parse(localStorage.getItem("user")).username,
                  _id: JSON.parse(localStorage.getItem("user"))._id,
                },
                text,
                _id: message._id,
                timestamp: message.timestamp,
              }
            : elem
        )
      );
    }

    // Save the message in the database (create or update)
    await fetch(url, {
      method: message ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    // Reset the form
    if (message) {
      setEditing(false);
    }

    setEditorState(EditorState.createEmpty(decorator));
  };

  return {
    editorState,
    setEditorState,
    handleSubmit,
  };
}

export default useForm;
