import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useCard from "../../../../hooks/user/useCard";
import Card from "../../../user/Card";

function Avatar({ user }) {
  const ref = useRef();
  const { isOpen, setIsOpen } = useCard(ref);

  return (
    <Button type="button" ref={ref} onClick={() => setIsOpen(!isOpen)}>
      {user.avatar && Object.keys(user.avatar).length > 0 ? (
        <Icon
          src={`data:${user.avatar.type};base64,${Buffer.from(
            user.avatar.data
          ).toString("base64")}`}
          alt={user.username}
        />
      ) : (
        <Default>{user.username[0]}</Default>
      )}

      {isOpen && (
        <Card
          user={user}
          position="right"
          parentPosition={ref.current.getBoundingClientRect()}
        />
      )}
    </Button>
  );
}

export default Avatar;

Avatar.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
    username: PropTypes.string,
  }).isRequired,
};

const Button = styled.button`
  display: block;
  grid-row: 1 / -1;
  align-self: flex-start;
`;

const avatar = `
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-top: 3px;
`;

const Icon = styled.img`
  ${avatar};
  object-fit: cover;
`;

const Default = styled.div`
  ${avatar};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;
