import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { useAuth } from "../../context/AuthContext";
import usePending from "../../hooks/friends/usePending";
import IconChevron from "../../assets/icons/general/IconChevron";
import { ReactComponent as IconCheck } from "../../assets/icons/friend/check.svg";
import { ReactComponent as IconClose } from "../../assets/icons/general/close.svg";

function Pending() {
  const [isOpen, setIsOpen] = useState(true);
  const { friendships: friends } = usePending();
  const { user } = useAuth();

  return (
    <Wrapper>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <Icon $isOpen={isOpen}>
          <IconChevron />
        </Icon>
        <Heading>Pending</Heading>
      </Button>

      {isOpen && (
        <Container>
          {friends && friends.length > 0 ? (
            <ul>
              {friends.map((request) => {
                if (request.recipient._id.toString() === user._id) {
                  return <Request request={request} key={request._id} />;
                }
              })}
            </ul>
          ) : (
            <div>You do not have any pending requests.</div>
          )}
        </Container>
      )}
    </Wrapper>
  );
}

function Request({ request }) {
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
    <Li>
      {request.sender.avatar ? (
        <Avatar
          src={`data:${request.sender.avatar.contentType};base64,${Buffer.from(
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

Request.propTypes = {
  request: PropTypes.shape({
    _id: PropTypes.string,
    sender: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.shape({
        contentType: PropTypes.string,
        data: PropTypes.shape({
          type: PropTypes.string,
          data: PropTypes.arrayOf(PropTypes.number),
        }),
      }),
    }),
  }).isRequired,
};

export default Pending;

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Container = styled.div`
  margin-left: 1.1rem;
`;

const Button = styled.button`
  display: flex;
  color: ${(props) => props.theme.text_secondary};
`;

const Heading = styled.h3`
  text-transform: uppercase;
  color: ${(props) => props.theme.text_tertiary};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
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
  margin-right: 0.2rem;
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
  margin-right: 0.2rem;
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
