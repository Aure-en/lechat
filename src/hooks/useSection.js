import { useState, useEffect } from "react";
import socket from "../socket/socket";

function useSection(url, section, categoryId) {
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
    if (
      (document.section === "category" && section === "category") ||
      (document.document.category === categoryId && section === "channel")
    ) {
      setSections((prev) => [...prev, document.document]);
    }
  };

  const handleUpdate = (document) => {
    if (
      (document.section === "category" && section === "category") ||
      (document.document.category === categoryId && section === "channel")
    ) {
      setSections((prev) =>
        [...prev].map((section) =>
          document.document._id === section._id ? document.document : section
        )
      );
    }
  };

  const handleDelete = (document) => {
    if (
      (document.section === "category" && section === "category") ||
      (document.section === "channel" && section === "channel")
    ) {
      setSections((prev) =>
        [...prev].filter((section) => section._id !== document.document._id)
      );
    }
  };

  // Listeners must be named to remove them and them only when the section unmounts.
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

export default useSection;
