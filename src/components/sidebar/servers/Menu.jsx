import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Leave from "../../server/Leave";
import Contextual from "../../shared/Contextual";
import { useAuth } from "../../../context/AuthContext";

function Menu({ server, outerRef }) {
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <Contextual outerRef={outerRef}>
        <button type="button" onClick={() => setIsLeaveOpen(true)}>
          Leave Server
        </button>

        {/* If the user is the server admin, can access server settings. */}
        {user._id === server.admin && (
          <Link to={`/servers/${server._id}/settings`}>Settings</Link>
        )}
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
    admin: PropTypes.string,
  }).isRequired,
};
