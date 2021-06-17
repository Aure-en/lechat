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
      console.log("INSERT CATEGORY: ", str);
      setSections((prev) => [...prev, document.document]);
    } else if (
      document.document.category === categoryId &&
      section === "channel"
    ) {
      console.log(
        document.document.category,
        categoryId,
        document.document.category === categoryId
      );
      console.log("INSERT CHANNEL: ", str);
      setSections((prev) => [...prev, document.document]);
    }
  };

  const handleUpdate = (document) => {
    if (document.section === "category" && section === "category") {
      console.log("UPDATE CATEGORY: ", str);
      setSections((prev) =>
        [...prev].map((category) =>
          document.document._id === category._id ? document.document : category
        )
      );
    } else if (
      document.document.category === categoryId &&
      section === "channel"
    ) {
      console.log(
        document.document.category,
        categoryId,
        document.document.category === categoryId
      );
      console.log("UPDATE CHANNEL: ", str);
      setSections((prev) =>
        [...prev].map((channel) =>
          document.document._id === channel._id ? document.document : channel
        )
      );
    }
  };

  const handleDelete = (document) => {
    if (document.section === "category" && section === "category") {
      console.log("DELETE CATEGORY: ", str);
    } else if (
      document.document.category === categoryId &&
      section === "channel"
    ) {
      console.log(
        document.document.category,
        categoryId,
        document.document.category === categoryId
      );
      console.log("DELETE CHANNEL: ", str);
    }
  };

  useEffect(() => {
    socket.on("insert", (document) => {
      handleInsert(document);
    });
    return () => socket.off("insert");
  }, []);

  useEffect(() => {
    socket.on("update", (document) => {
      handleUpdate(document);
    });
    return () => socket.off("update");
  }, []);

  useEffect(() => {
    socket.on("delete", (document) => {
      handleDelete(document);
    });
    return () => socket.off("delete");
  }, []);

  return {
    sections,
    setSections,
  };
}

export default useTest;
