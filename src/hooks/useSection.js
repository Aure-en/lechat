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
    if (document.section === "category") {
      // Updating a category
      setSections((prev) =>
        [...prev].map((category) =>
          updated.document._id === category._id ? updated.document : category
        )
      );
    } else {
      // Updating a channel
      setSections((prev) => {
        const sections = [...prev];
        const category = sections.findIndex((category) => {
          console.log(category._id === updated.document._id);
          category._id === updated.document.category;
        });
        sections[category].channel.map((channel) =>
          updated.document._id === channel._id ? updated.document : channel
        );
      });
    }
  };

  const handleDelete = (deleted) => {
    if (deleted.section === "category") {
      setSections((prev) =>
        prev.filter((document) => document._id !== deleted.document._id)
      );
    } else {
      setSections((prev) => {
        const sections = [...prev];
        const category = prev.findIndex(
          (category) => category._id === deleted.document.category
        );
        sections[category].channel.filter((channel) => {
          channel._id !== deleted.document._id;
        });
      });
    }
  };

  // useEffect(() => {
  //   socket.on("insert", (document) => {
  //     handleInsert(document);
  //   });
  //   return () => socket.off("insert");
  // }, [sections]);

  // useEffect(() => {
  //   socket.on("update", (document) => {
  //     handleUpdate(document);
  //   });
  //   return () => socket.off("update");
  // }, [sections]);

  // useEffect(() => {
  //   socket.on("delete", (document) => {
  //     handleDelete(document);
  //   });
  //   return () => socket.off("delete");
  // }, [sections]);

  return {
    elements: sections,
  };
}

export default useSection;
