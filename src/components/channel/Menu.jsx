import React, { useState } from "react";
import PropTypes from "prop-types";
import { usePermission } from "../../context/PermissionContext";
import { useAuth } from "../../context/AuthContext";
import Contextual from "../shared/Contextual";
import Channel from "./Modal";
import Delete from "./Delete";

function Menu({ serverId, categoryId, channel, outerRef }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Used to check if the user has the permission
  // to see the CUD channels buttons
  const { sections } = usePermission();
  const { user } = useAuth();

  if (!sections.includes(user._id)) {
    return <></>;
  }

  return (
    <>
      <Contextual outerRef={outerRef}>
        <button type="button" onClick={() => setIsCreateOpen(true)}>
          Create Channel
        </button>
        <button type="button" onClick={() => setIsUpdateOpen(true)}>
          Update Channel
        </button>
        <button type="button" onClick={() => setIsDeleteOpen(true)}>
          Delete Channel
        </button>
      </Contextual>

      {/* Create Channel */}
      <Channel
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        serverId={serverId}
        categoryId={categoryId}
      />

      {/* Update Channel */}
      <Channel
        isOpen={isUpdateOpen}
        setIsOpen={setIsUpdateOpen}
        serverId={serverId}
        categoryId={categoryId}
        channel={channel}
      />

      <Delete
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        serverId={serverId}
        channel={channel}
      />
    </>
  );
}

export default Menu;

Menu.propTypes = {
  outerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  serverId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  channel: PropTypes.shape({}).isRequired,
};
