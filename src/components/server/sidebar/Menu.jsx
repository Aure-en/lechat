import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePermission } from "../../../context/PermissionContext";
import { useAuth } from "../../../context/AuthContext";
import Category from "../../category/Modal";
import Contextual from "../../shared/Contextual";

/**
 * Server sidebar contextual menu. Contains:
 * - Button to create a category.
 */
function Menu({ serverId, ignoreRef, outerRef }) {
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);

  // Used to check if the user has the permission
  // to see the Create Category button
  const { sections } = usePermission();
  const { user } = useAuth();

  return (
    <>
      {sections.includes(user._id) && (
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
      )}
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
