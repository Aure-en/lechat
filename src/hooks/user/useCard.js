import { useState, useEffect } from "react";

function useCard(ref) {
  // Open / closes the information card.
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    if (!ref?.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener("click", handleClick);
    } else {
      document.body.removeEventListener("click", handleClick);
    }
    return () => document.body.removeEventListener("click", handleClick);
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
  };
}

export default useCard;
