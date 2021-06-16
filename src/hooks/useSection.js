import { useState, useEffect } from "react";
import socket from "../socket/socket";

function useSection(url) {
  // section the server subdivision (either 'category' or 'channel')
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
      const json = await res.json();
      if (!json.error) setSections(json);
    })();
  }, [url]);

  // Set up socket listeners
  const handleInsert = (document) => {
    if (document.section === "category") {
      // Inserting a category
      setSections([...sections, document.document]);
    } else {
      // Inserting a channel in a category
      setSections(
        [...sections].map((category) => {
          if (category._id === document.document.category.toString()) {
            const updated = { ...category };
            updated.channel.push(document.document);
            return updated;
          }
          return category;
        })
      );
    }
  };

  const handleUpdate = (updated) => {
    setSections((prev) =>
      [...prev].map((document) =>
        updated.document._id.toString() === document._id
          ? updated.document
          : document
      )
    );
  };

  const handleDelete = (deleted) => {
    if (
      sections.findIndex(
        (document) => document._id === deleted.document._id
      ) !== -1
    ) {
      setSections((prev) =>
        prev.filter((document) => document._id !== deleted.document._id)
      );
    }
  };

  useEffect(() => {
    socket.on("insert", (document) => {
      handleInsert(document);
    });
    return () => socket.off("insert");
  }, [sections]);

  useEffect(() => {
    socket.on("update", (document) => {
      handleUpdate(document);
    });
    return () => socket.off("update");
  }, [sections]);

  useEffect(() => {
    socket.on("delete", (document) => {
      handleDelete(document);
    });
    return () => socket.off("delete");
  }, [sections]);

  return {
    elements: sections,
  };
}

export default useSection;
