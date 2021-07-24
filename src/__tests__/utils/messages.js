import { ContentState, EditorState, convertToRaw } from "draft-js";

export const author = {
  _id: "1",
  username: "User",
};

export const ordered = {
  author,
  timestamp: Date.now(),
  messages: [],
};

for (let i = 1; i < 4; i += 1) {
  const message = {
    _id: `${i}`,
    author,
    text: JSON.stringify(
      convertToRaw(
        EditorState.createWithContent(
          ContentState.createFromText(`${i}`)
        ).getCurrentContent()
      )
    ),
    content: `${i}`,
    timestamp: Date.now() + i,
    server: "1",
    channel: "2",
    reaction: [],
  };
  ordered.messages.push(message);
}

export const unordered = [];

for (let i = 1; i < 4; i += 1) {
  const message = {
    _id: `${i}`,
    author: {
      _id: author._id,
      username: author.username,
    },
    text: JSON.stringify(
      convertToRaw(
        EditorState.createWithContent(
          ContentState.createFromText(`${i}`)
        ).getCurrentContent()
      )
    ),
    content: `${i}`,
    timestamp: Date.now() + i,
    server: "1",
    channel: "2",
    reaction: [],
  };
  unordered.push(message);
}
