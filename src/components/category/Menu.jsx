import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePermission } from "../../context/PermissionContext";
import { useAuth } from "../../context/AuthContext";
import Contextual from "../shared/Contextual";
import Category from "./Modal";
import Delete from "./Delete";

function Menu({ serverId, category, outerRef, ignoreRef }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Used to check if the user has the permission
  // to see the CUD channels buttons
  const { permissions } = usePermission();
  const { user } = useAuth();

  return (
    <>
      {permissions.sections.includes(user._id) && (
        <>
          <Contextual outerRef={outerRef} ignoreRef={ignoreRef}>
            <button type="button" onClick={() => setIsCreateOpen(true)}>
              Create Category
            </button>
            <button type="button" onClick={() => setIsUpdateOpen(true)}>
              Update Category
            </button>
            <button type="button" onClick={() => setIsDeleteOpen(true)}>
              Delete Category
            </button>
          </Contextual>

          {/* Create Category */}
          <Category
            isOpen={isCreateOpen}
            setIsOpen={setIsCreateOpen}
            serverId={serverId}
          />

          {/* Update Category */}
          <Category
            isOpen={isUpdateOpen}
            setIsOpen={setIsUpdateOpen}
            serverId={serverId}
            category={category}
          />

          <Delete
            isOpen={isDeleteOpen}
            setIsOpen={setIsDeleteOpen}
            category={category}
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
  category: PropTypes.shape({}).isRequired,
};

Menu.defaultProps = {
  ignoreRef: undefined,
};
