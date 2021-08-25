import { useState, useEffect } from "react";
import socket from "../../../socket/socket";

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

  // Socket listeners to update categories / channels in real time.
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
    socket.on(`insert ${section}`, handleInsert);
    socket.on(`update ${section}`, handleUpdate);
    socket.on(`delete ${section}`, handleDelete);
    return () => {
      socket.off(`insert ${section}`, handleInsert);
      socket.off(`update ${section}`, handleUpdate);
      socket.off(`delete ${section}`, handleDelete);
    };
  }, []);

  return {
    sections,
    setSections,
  };
}

export default useSection;
