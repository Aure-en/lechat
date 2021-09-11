import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import useRequest from "../../hooks/friends/useRequest";
import useFriend from "../../hooks/friends/useFriend";
import { toastify } from "../shared/Toast";

function Card({ user, position, parentPosition, $state }) {
  const { user: currentUser } = useAuth();
  const { friendships, loading } = useFriend(); // To check if we are already friend with the user
  const { send } = useRequest(); // To send a friend request to another user

  const handleSendRequest = async (userId) => {
    const result = await send(userId);
    if (result.error) {
      toastify(result.error);
    } else {
      toastify("Friend request successfully sent.");
    }
  };

  return (
    <>
      {createPortal(
        <Container
          $position={position}
          $parentPosition={parentPosition}
          $state={$state}
        >
          <Banner />
          {user.avatar ? (
            <Icon
              src={`data:${user.avatar.type};base64,${Buffer.from(
                user.avatar.thumbnail || user.avatar.data
              ).toString("base64")}`}
              alt={user.username}
            />
          ) : (
            <Default as="div">{user.username[0]}</Default>
          )}

          <Content>
            <Heading>{user.username}</Heading>
          </Content>

          <Links>
            {user._id === currentUser._id ? (
              <Link to="/settings">Update your profile</Link>
            ) : (
              <>
                <Link to={`/conversations/${user._id}`}>Send a message</Link>

                {/* If the current user is already friend or has already sent a friend request to
                    this user, do not display the "Send a friend request" button. */}
                {!loading &&
                  !friendships.find(
                    (friendship) =>
                      friendship.recipient._id === user._id ||
                      friendship.sender._id === user._id
                  ) && (
                    <button
                      type="button"
                      onClick={() => handleSendRequest(user._id)}
                    >
                      Send a friend request
                    </button>
                  )}
              </>
            )}
          </Links>
        </Container>,
        document.body.querySelector("#root")
      )}
    </>
  );
}

export default Card;

Card.propTypes = {
  // User informations
  user: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
    about: PropTypes.string,
    avatar: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
      thumbnail: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }).isRequired,

  // Outer ref and position - where should the card render?
  parentPosition: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }).isRequired,

  // For transition
  $state: PropTypes.string,

  position: PropTypes.string,
};

Card.defaultProps = {
  position: "right",
  $state: "entered",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.bg_sidebar};
  overflow: hidden;
  background: ${(props) => props.theme.bg_card};
  z-index: 10;
  padding-bottom: 1rem;
  max-height: 11.25rem; // 180px

  // Position
  position: absolute;

  bottom: 0;
  width: 100%;
  border-radius: 1rem 1rem 0 0;

  // On small screen, the card is positionned near its parents.
  @media all and (min-width: 400px) {
    top: ${(props) =>
      props.$parentPosition.top + 180 < document.body.clientHeight
        ? props.$position === "left"
          ? `${props.$parentPosition.bottom}px`
          : `${props.$parentPosition.top}px`
        : document.body.clientHeight -
          180}; // Boundary, prevent the card from overflowing to the bottom.

    left: ${(props) =>
      props.$position === "left"
        ? // Card placed on the left of the parent (17rem = card width + a bit of margin)
          `initial`
        : // Card placed on the right of the parent
          `calc(${props.$parentPosition.right}px + 0.4rem)`};

    right: ${(props) => props.$position === "left" && "1rem"};
    bottom: initial;
    border-radius: 1rem;
    width: 15rem;
  }

  @media all and (min-width: 500px) {
    top: ${(props) =>
      props.$parentPosition.top + 180 < document.body.clientHeight
        ? `${props.$parentPosition.top}px`
        : document.body.clientHeight -
          180}; // Boundary, prevent the card from overflowing to the bottom.

    left: ${(props) =>
      props.$position === "left"
        ? // Card placed on the left of the parent (17rem = card width + a bit of margin)
          `calc(${props.$parentPosition.left}px - 17rem)`
        : // Card placed on the right of the parent
          `calc(${props.$parentPosition.right}px + 0.4rem)`};
  }

  // Transition

  // On small screen, transition from bottom to top.
  transition: transform 0.15s ease-out, opacity 0.1s linear;
  opacity: ${(props) => (props.$state === "entered" ? 1 : 0)};
  transform: translateY(
    ${(props) => (props.$state === "entered" ? "0" : "5%")}
  );

  // On larger screen, transition is horizontal.
  @media all and (min-width: 400px) {
    transform: translateX(
      ${(props) =>
        props.$state === "entered"
          ? "0"
          : props.$position === "left"
          ? "5%"
          : "-5%"}
    );
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 3rem;
  background: ${(props) => props.theme.bg_sidebar};
  border-radius: 1rem 1rem 0 0;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${(props) => props.theme.bg_secondary};
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 2rem;

  &:after {
    content: "";
    position: absolute;
    display: block;
    height: 1px;
    width: calc(100% - 4rem); // 100% - padding.
    background: ${(props) => `linear-gradient(
      90deg,
      transparent 0%,
      ${props.theme.text_quaternary} 50%,
      transparent 100%
    )`};
    bottom: 0;
    opacity: 0.5;
  }
`;

const Heading = styled.h2`
  font-family: "Assistant", sans-serif;
  font-size: 1.25rem;
  font-weight: 300;
  align-self: flex-start;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
  white-space: nowrap;
`;

const Icon = styled.img`
  position: absolute;
  left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1rem; // Half of banner height
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.bg_secondary};
  object-fit: cover;
  align-self: center;
`;

const Default = styled(Icon)`
  background: ${(props) => props.theme.bg_button};
  color: ${(props) => props.theme.server_icon_text};
  font-size: 1.5rem;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.5rem 2rem 0 2rem;

  // Typography
  & > * {
    font-size: 0.875rem;

    &:hover {
      color: ${(props) => props.theme.text_quaternary};
      text-decoration: underline;
    }
  }
`;
