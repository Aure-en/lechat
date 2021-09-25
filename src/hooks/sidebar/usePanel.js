import { useState, useEffect } from "react";

function usePanel(buttonRef, panelRef) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Close dropdown if clicking outside
  const handleClickOutside = (e) => {
    if (
      !panelRef.current?.contains(e.target) &&
      !buttonRef.current?.contains(e.target) &&
      // Clicking in a modal doesn't close the dropdown.
      !document.querySelector("#modal-root").contains(e.target)
    ) {
      setIsPanelOpen(false);
    }
  };

  // Add event listener to close the dropdown on outside click when it is open.
  useEffect(() => {
    if (!isPanelOpen) return;
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPanelOpen]);

  return {
    isPanelOpen,
    setIsPanelOpen,
  };
}

export default usePanel;
