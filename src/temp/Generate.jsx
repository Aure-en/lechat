import React from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";

function Generate() {
  return (
    <button
      type="button"
      onClick={async () => {
        for (let i = 1; i < 251; i += 1) {
          fetch(
            `${process.env.REACT_APP_SERVER}/servers/6126b3b8ac2d3f325b2232b1/channels/6126b479ac2d3f325b2232b3/messages`,
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
