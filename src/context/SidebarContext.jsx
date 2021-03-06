import React, { useContext, useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import useWindowSize from "../hooks/shared/useWindowSize";

const SidebarContext = createContext();

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { windowSize, previous } = useWindowSize();

  /* Open and close the panel by default depending on the windowSize.
   * - If our screen becomes large, open the panel by default.
   * - If our screen becomes small, close the panel by default.
   */
  useEffect(() => {
    if (windowSize.width >= 1200 && previous.current.width < 1200) {
      setIsOpen(true);
    } else if (windowSize.width <= 1200 && previous.current.width > 1200) {
      setIsOpen(false);
    }
  }, [windowSize]);

  const value = {
    isOpen,
    setIsOpen,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export default SidebarContext;

SidebarProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

SidebarProvider.defaultProps = {
  children: <></>,
};
