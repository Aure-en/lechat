import { useEffect } from "react";
import useSWR from "swr";
import socket from "../../../socket/socket";

// Keep track of a server's categories and channels.
function useSection(url, section, categoryId) {
  const {
    data: sections,
    loading,
    mutate,
  } = useSWR([url, sessionStorage.getItem("jwt")]);

  // Socket listeners to update categories / channels in real time.
  const handleInsert = (document) => {
    if (
      (document.section === "category" && section === "category") ||
      (document.document.category === categoryId && section === "channel")
    ) {
      mutate(async (prev) => [...prev, document.document], false);
    }
  };

  const handleUpdate = (document) => {
    if (
      (document.section === "category" && section === "category") ||
      (document.document.category === categoryId && section === "channel")
    ) {
      mutate(
        async (prev) =>
          [...prev].map((section) =>
            document.document._id === section._id ? document.document : section
          ),
        false
      );
    }
  };

  const handleDelete = (document) => {
    if (
      (document.section === "category" && section === "category") ||
      (document.section === "channel" && section === "channel")
    ) {
      mutate(
        async (prev) =>
          [...prev].filter((section) => section._id !== document.document._id),
        false
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
    loading,
  };
}

export default useSection;
