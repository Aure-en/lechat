import React from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";

function Generate() {
  return (
    <button
      type="button"
      onClick={async () => {
        for (let i = 1; i < 251; i += 1) {
          await fetch(
            `${process.env.REACT_APP_URL}/servers/60fe76d1b3be8b2137751bc6/channels/60fe76d8b3be8b2137751bc8/messages`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                text: `${JSON.stringify(
                  convertToRaw(
                    EditorState.createWithContent(
                      ContentState.createFromText(`${i}`)
                    ).getCurrentContent()
                  )
                )}`,
              }),
            }
          );
        }
      }}
    >
      Add
    </button>
  );
}

export default Generate;
