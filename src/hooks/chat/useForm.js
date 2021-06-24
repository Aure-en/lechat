import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import decorator from "../../components/chat/form/editor/entities/decorator";

function useForm(conversationId, message, setEditing, setMessages) {
  // editorState contains the typed text with rich edition.
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );
  const location = useLocation();

  // If we want to edit a message, load its text.
  useEffect(() => {
    message && setEditorState(message.text);
  }, [message]);

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
              }
            : elem
        )
      );
    }

    // Save the message in the database (create or update)
    // -- TO-DO -- Find a cleaner way to get the request URL.
    const url = message
      ? `${process.env.REACT_APP_URL}/messages/${message._id}`
      : location.pathname.includes("servers")
      ? `${process.env.REACT_APP_URL}${location.pathname}/messages`
      : `${process.env.REACT_APP_URL}/conversations/${conversationId}/messages`;

    const method = message ? "PUT" : "POST";

    await fetch(url, {
      method,
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
