import { useState, useEffect } from "react";

function useDropdown(ref) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown if clicking outside
  const handleClickOutside = (e) => {
    if (
      !ref.current?.contains(e.target) &&
      // Clicking in a modal doesn't close the dropdown.
      !document.querySelector("#modal-root").contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener to close the dropdown on outside click when it is open.
  useEffect(() => {
    if (!isDropdownOpen) return;
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  return {
    isDropdownOpen,
    setIsDropdownOpen,
  };
}

export default useDropdown;
