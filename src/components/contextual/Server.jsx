import React, { useState } from "react";
import PropTypes from "prop-types";
import Leave from "../modals/server/Leave";
import Contextual from "./Contextual";

function Menu({ server, outerRef }) {
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  return (
    <>
      <Contextual outerRef={outerRef}>
        <button type="button" onClick={() => setIsLeaveOpen(true)}>
          Leave Server
        </button>
      </Contextual>

      <Leave isOpen={isLeaveOpen} setIsOpen={setIsLeaveOpen} server={server} />
    </>
  );
}

export default Menu;

Menu.propTypes = {
  outerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  server: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
