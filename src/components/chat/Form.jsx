import React from "react";
import PropTypes from "prop-types";
import Editor from "./form/editor/Editor";
import useForm from "../../hooks/chat/useForm";

function Form({ conversationId, message, setEditing, setMessages }) {
  const { text, setText, handleSubmit } = useForm(
    conversationId,
    message,
    setEditing,
    setMessages
  );
  return (
    <form onSubmit={handleSubmit}>
      <Editor
        send={setText}
        prev={message && message.text}
        onEnter={handleSubmit}
      />
      <button type="submit" disabled={!text}>
        Send
      </button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    _id: PropTypes.string,
  }),
  setEditing: PropTypes.func,
  setMessages: PropTypes.func,
  conversationId: PropTypes.string,
};

Form.defaultProps = {
  message: undefined,
  conversationId: undefined,
  setEditing: () => {},
  setMessages: () => {},
};
