import React from "react";
import PropTypes from "prop-types";
import Server from "./Server";

function List({ servers }) {
  if (servers.length < 1) return <></>;

  return (
    <>
      {servers.map((server) => (
        <Server server={server} key={server._id} />
      ))}
    </>
  );
}

export default List;

List.propTypes = {
  servers: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    })
  ),
};

List.defaultProps = {
  servers: [],
};
