import React from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";

function Members({ serverId }) {
  const { data: members } = useFetch(
    `${process.env.REACT_APP_URL}/servers/${serverId}/members`
  );

  return (
    <ul>
      {members &&
        members.map((member) => <li key={member._id}>{member.username}</li>)}
    </ul>
  );
}

export default Members;

Members.propTypes = {
  serverId: PropTypes.string.isRequired,
};
