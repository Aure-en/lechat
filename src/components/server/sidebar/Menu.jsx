import React, { useState } from "react";
import PropTypes from "prop-types";
import Category from "../../category/Modal";
import Contextual from "../../shared/Contextual";

function Menu({ serverId, ignoreRef, outerRef }) {
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  return (
    <>
      <Contextual outerRef={outerRef} ignoreRef={ignoreRef}>
        <button type="button" onClick={() => setIsLeaveOpen(true)}>
          Create Category
        </button>
      </Contextual>

      <Category
        isOpen={isLeaveOpen}
        setIsOpen={setIsLeaveOpen}
        serverId={serverId}
      />
    </>
  );
}

export default Menu;

Menu.propTypes = {
  outerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  ignoreRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  serverId: PropTypes.string.isRequired,
};

Menu.defaultProps = {
  ignoreRef: undefined,
};
