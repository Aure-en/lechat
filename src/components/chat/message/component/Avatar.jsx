import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Avatar({ avatar, username }) {
  return (
    <>
      {avatar && Object.keys(avatar).length > 0 ? (
        <Icon
          src={`data:${avatar.type};base64,${Buffer.from(avatar.data).toString(
            "base64"
          )}`}
          alt={username}
        />
      ) : (
        <Default>{username[0]}</Default>
      )}
    </>
  );
}

export default Avatar;

Avatar.propTypes = {
  avatar: PropTypes.shape({
    type: PropTypes.string,
    data: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
  username: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  avatar: {},
};

const Icon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
  grid-row: 1 / -1;
  margin-top: 3px;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1 / -1;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
  margin-top: 3px;
`;