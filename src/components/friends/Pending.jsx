import React, { useState } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import useFetch from "../../hooks/shared/useFetch";
import IconChevron from "../../assets/icons/general/IconChevron";
import { ReactComponent as IconCheck } from "../../assets/icons/friend/check.svg";
import { ReactComponent as IconClose } from "../../assets/icons/general/close.svg";

function Pending() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: friends } = useFetch(
    `${process.env.REACT_APP_URL}/users/${
      JSON.parse(localStorage.getItem("user"))._id
    }/pending`
  );

  const handleRequest = async (requestId, isAccepting) => {
    await fetch(`${process.env.REACT_APP_URL}/friends/${requestId}`, {
      method: isAccepting ? "PUT" : "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <Container>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <Icon $isOpen={isOpen}>
          <IconChevron />
        </Icon>
        <Heading>Pending</Heading>
      </Button>

      {isOpen && (
        <ul>
          {friends &&
            friends.map((request) => {
              if (
                request.sender._id !==
                JSON.parse(localStorage.getItem("user"))._id
              ) {
                return (
                  <Li key={request._id}>
                    {request.sender.avatar ? (
                      <Avatar
                        src={`data:${
                          request.sender.avatar.contentType
                        };base64,${Buffer.from(
                          request.sender.avatar.data
                        ).toString("base64")}`}
                        alt={request.sender.username}
                      />
                    ) : (
                      <Default>{request.sender.username[0]}</Default>
                    )}
                    <div>{request.sender.username}</div>
                    <Accept
                      type="button"
                      onClick={() => handleRequest(request._id, true)}
                      data-tip="Accept"
                    >
                      <IconCheck />
                    </Accept>
                    <Decline
                      type="button"
                      onClick={() => handleRequest(request._id, false)}
                      data-tip="Decline"
                    >
                      <IconClose />
                    </Decline>
                    <ReactTooltip delayShow={150} place="bottom" />
                  </Li>
                );
              }
            })}
        </ul>
      )}
    </Container>
  );
}

export default Pending;

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  display: flex;
  color: ${(props) => props.theme.text_secondary};
`;

const Heading = styled.h3`
  text-transform: uppercase;
  color: ${(props) => props.theme.text_tertiary};
  margin-bottom: 0.5rem;
`;

const Icon = styled.span`
  position: relative;
  top: ${(props) => (!props.$isOpen ? "0" : "1px")};
  transition: all 0.3s linear;
  transform: ${(props) => !props.$isOpen && "rotate(-90deg)"};
`;

const Li = styled.li`
  display: grid;
  grid-template-columns: auto 1fr repeat(2, auto);
  align-items: center;
  grid-gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
`;

const Default = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  margin-right: 0.5rem;
`;

const ButtonIcon = styled.button`
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Accept = styled(ButtonIcon)`
  color: ${(props) => props.theme.text_tertiary};
`;

const Decline = styled(ButtonIcon)`
  color: ${(props) => props.theme.error};
`;
