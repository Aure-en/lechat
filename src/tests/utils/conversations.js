import { ContentState, EditorState, convertToRaw } from "draft-js";

const members = [];

for (let i = 1; i < 3; i += 1) {
  const user = {
    _id: `${i}`,
    username: `User ${i}`,
  };
  members.push(user);
}

export const messages = [
  {
    author: members[0],
    conversation: "1",
    text: JSON.stringify(
      convertToRaw(
        EditorState.createWithContent(
          ContentState.createFromText("Message")
        ).getCurrentContent()
      )
    ),
    content: "Message",
    timestamp: Date.now(),
    _id: "1",
    files: [],
  },
];

export const conversation = {
  members,
  message: {
    author: members[0],
    conversation: "1",
    text: JSON.stringify(
      convertToRaw(
        EditorState.createWithContent(
          ContentState.createFromText("Message")
        ).getCurrentContent()
      )
    ),
    content: "Message",
    timestamp: Date.now(),
    _id: "1",
    files: [],
  },
  _id: "1",
};

export const conversations = [conversation];
