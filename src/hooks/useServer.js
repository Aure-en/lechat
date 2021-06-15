import { useState, useEffect } from "react";
import socket from "../socket/socket";

function useServer(url) {
  const [elements, setElements] = useState([]);

  // Load categories
  useEffect(() => {
    if (!url) return;
    (async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const json = await res.json();
      if (!json.error) setElements(json);
    })();
  }, [url]);

  // Set up socket listeners
  const handleInsert = (document) => {
    console.log(document);
    setElements([...elements, document.document]);
  };

  const handleUpdate = (updated) => {
    console.log(updated);
    setElements((prev) =>
      [...prev].map((document) =>
        updated.document._id.toString() === document._id ? updated.document : document
      )
    );
  };

  const handleDelete = (deleted) => {
    console.log(deleted);
    if (
      elements.findIndex(
        (document) => document._id === deleted.document._id
      ) !== -1
    ) {
      setElements((prev) =>
        prev.filter((document) => document._id !== deleted.document._id)
      );
    }
  };

  useEffect(() => {
    socket.on("insert", (document) => {
      handleInsert(document);
    });
    return () => socket.off("insert");
  }, [elements]);

  useEffect(() => {
    socket.on("update", (document) => {
      handleUpdate(document);
    });
    return () => socket.off("update");
  }, [elements]);

  useEffect(() => {
    socket.on("delete", (document) => {
      handleDelete(document);
    });
    return () => socket.off("delete");
  }, [elements]);

  return {
    elements,
    setElements,
  };
}

export default useServer;
