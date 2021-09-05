import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Content from "../Content";
import { useAuth } from "../../../context/AuthContext";
import { usePermission } from "../../../context/PermissionContext";
import { ReactComponent as IconUnpin } from "../../../assets/icons/chat/unpin.svg";

function Pin({ message }) {
  const { user } = useAuth();
  const { pins } = usePermission();

  const unpin = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER}/messages/${id}/unpin`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
  };

  return (
    <Container>
      <Content message={message} />
      {pins.includes(user._id) && (
        <Button
          type="button"
          onClick={() => unpin(message._id)}
          aria-label="Unpin message"
        >
          <IconUnpin />
        </Button>
      )}
    </Container>
  );
}

export default Pin;

Pin.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

const Container = styled.li`
  position: relative;
  border-radius: 5px;
  display: grid;
  grid-template: repeat(2, auto) / auto 1fr;
  grid-column-gap: 1rem;
  padding: 0.5rem 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
  line-height: 1.5rem;
`;

const Button = styled.button`
  position: absolute;
  right: -0.5rem;
  top: 0.5rem; // Padding
  color: ${(props) => props.theme.bg_sidebar};

  &:hover {
    color: ${(props) => props.theme.text_tertiary};
  }
`;
