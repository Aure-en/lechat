import React from "react";

function More() {
  return (
    <>
      {message.author._id === JSON.parse(localStorage.getItem("user"))._id && (
        <>
          <button type="button" onClick={() => setEditing(message)}>
            Edit
          </button>
          <button type="button" onClick={() => remove(message._id)}>
            Delete
          </button>
        </>
      )}
    </>
  );
}

export default More;
