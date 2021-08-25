import { useState, useEffect } from "react";

function useDragAndDrop() {
  const [dragging, setDragging] = useState(false); // Indicate if the user is dragging a file in the window
  const [inDragZone, setInDragZone] = useState(false); // Indicate if the user is dragging a file in a specific area.

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setInDragZone(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInDragZone(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback(e);
    setInDragZone(false);
    setDragging(false);
  };

  /**
   * Set up the dragging state when an user starts / stops
   * dragging / drops a file in the window.
   */
  useEffect(() => {
    const onDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer?.items.length > 0 && !dragging) {
        setDragging(true);
      }
    };

    const onDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.relatedTarget) {
        setDragging(false);
      }
    };

    const onDrop = () => {
      setDragging(false);
    };

    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  return {
    dragging,
    inDragZone,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
}

export default useDragAndDrop;
