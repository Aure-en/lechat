import { ContentState, EditorState, convertToRaw } from "draft-js";

export const author = {
  _id: "1",
  username: "User",
};

export const messagesOrdered = {
  author,
  timestamp: Date.now(),
  messages: [
    {
      _id: "1",
      author,
      text: JSON.stringify(
        convertToRaw(
          EditorState.createWithContent(
            ContentState.createFromText("1")
          ).getCurrentContent()
        )
      ),
      content: "1",
      timestamp: Date.now(),
      server: "1",
      channel: "2",
      reaction: [],
    },
    {
      _id: "2",
      author,
      text: JSON.stringify(
        convertToRaw(
          EditorState.createWithContent(
            ContentState.createFromText("2")
          ).getCurrentContent()
        )
      ),
      content: "2",
      timestamp: Date.now() + 1,
      server: "1",
      channel: "2",
      reaction: [],
    },
    {
      _id: "3",
      author,
      text: JSON.stringify(
        convertToRaw(
          EditorState.createWithContent(
            ContentState.createFromText("3")
          ).getCurrentContent()
        )
      ),
      content: "3",
      timestamp: Date.now() + 2,
      server: "1",
      channel: "2",
      reaction: [],
    },
  ],
  _id: "1",
};

export const unordered = {};
