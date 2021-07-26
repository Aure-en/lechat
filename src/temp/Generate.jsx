import React from "react";

function Generate() {
  return (
    <button
      type="button"
      onClick={async () => {
        for (let i = 1; i < 251; i += 1) {
          await fetch(
            `${process.env.REACT_APP_URL}/conversations/60fe679598380219004ff12b/messages`,
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
