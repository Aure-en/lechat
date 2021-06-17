import { useState, useEffect } from "react";
import socket from "../socket/socket";

function useTest(url, str, section, categoryId) {
  const [sections, setSections] = useState([]);

  // Load categories and channels
  useEffect(() => {
    if (!url) return;
    (async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      try {
        const json = await res.json();
        if (!json.error) setSections(json);
      } catch (e) {
        setSections([]);
      }
    })();
  }, [url]);

  const handleInsert = (document) => {
    if (document.section === "category" && section === "category") {
      setSections((prev) => [...prev, document.document]);
    } else if (
      document.document.category === categoryId &&
      section === "channel"
    ) {
      setSections((prev) => [...prev, document.document]);
    }
  };

  const handleUpdate = (document) => {
    if (document.section === "category" && section === "category") {
      setSections((prev) =>
        [...prev].map((category) =>
          document.document._id === category._id ? document.document : category
        )
      );
    } else if (
      document.document.category === categoryId &&
      section === "channel"
    ) {
      setSections((prev) =>
        [...prev].map((channel) =>
          document.document._id === channel._id ? document.document : channel
        )
      );
    }
  };

  const handleDelete = (document) => {
    if (document.section === "category" && section === "category") {
      setSections((prev) =>
        [...prev].filter((category) => category._id !== document.document._id)
      );
    } else if (document.section === "channel" && section === "channel") {
      setSections((prev) =>
        [...prev].filter((channel) => channel._id !== document.document._id)
      );
    }
  };

  useEffect(() => {
    const insert = (document) => handleInsert(document);
    socket.on("insert", insert);
    return () => socket.off("insert", insert);
  }, []);

  useEffect(() => {
    const update = (document) => handleUpdate(document);
    socket.on("update", update);
    return () => socket.off("update", update);
  }, []);

  useEffect(() => {
    const remove = (document) => handleDelete(document);
    socket.on("delete", remove);
    return () => socket.off("delete", remove);
  }, []);

  return {
    sections,
    setSections,
  };
}

export default useTest;
