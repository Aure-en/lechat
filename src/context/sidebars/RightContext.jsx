import React, { useContext, useState, createContext } from "react";
import PropTypes from "prop-types";

const RightContext = createContext();

export function useRight() {
  return useContext(RightContext);
}

export function RightProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const value = {
    isOpen,
    setIsOpen,
  };

  return (
    <RightContext.Provider value={value}>{children}</RightContext.Provider>
  );
}

export default RightContext;

RightProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RightProvider.defaultProps = {
  children: <></>,
};
