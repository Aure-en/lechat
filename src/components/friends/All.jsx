import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import useFriend from "../../hooks/friends/useFriend";
import More from "./More";
import IconChevron from "../../assets/icons/general/IconChevron";
import { ReactComponent as IconMessage } from "../../assets/icons/friend/message.svg";

function All() {
  const [isOpen, setIsOpen] = useState(true);
  const [friends, setFriends] = useState();
  const { friendships } = useFriend();
  const { user } = useAuth();

  // Get the user from the friendship who isn't the current one.
  useEffect(() => {
    if (!friendships) return;
    const friends = [];
    friendships.forEach((friendship) =>
      friends.push({
        friend:
          friendship.sender._id === user._id
            ? friendship.recipient
            : friendship.sender,
        _id: friendship._id, // Necessary to delete the friendship
      })
    );
    setFriends(friends);
  }, [friendships]);

  return (
    <Wrapper>
      <Button type="button" onClick={() => setIsOpen(!isOpen)}>
        <Icon $isOpen={isOpen}>
          <IconChevron />
        </Icon>
        <Heading>All Friends</Heading>
      </Button>

      {isOpen && (
        <Container>
          {friends && (
            <>
              {friends.length > 0 ? (
                <ul>
                  {friends.map((friend) => (
                    <Friend friendship={friend} key={friend._id} />
                  ))}
                </ul>
              ) : (
                <div>There is nothing here...</div>
              )}
            </>
          )}
        </Container>
      )}
    </Wrapper>
  );
}

function Friend({ friendship }) {
  return (
    <Li>
      <StyledLink to={`/conversations/${friendship.friend._id}`}>
        {friendship.friend.avatar &&
        Object.keys(friendship.friend.avatar).length > 0 ? (
          <Avatar
            src={`data:${
              friendship.friend.avatar.contentType
            };base64,${Buffer.from(friendship.friend.avatar.data).toString(
              "base64"
            )}`}
            alt={friendship.friend.username}
          />
        ) : (
          <Default>{friendship.friend.username[0]}</Default>
        )}

        <div>{friendship.friend.username}</div>
        <Buttons>
          <IconMessage data-tip="Message" data-for="message" />
        </Buttons>
      </StyledLink>
      <More friend={friendship.friend} friendship={friendship._id} />
    </Li>
  );
}

Friend.propTypes = {
  friendship: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    friend: PropTypes.shape({
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

export default All;

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

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Icon = styled.span`
  position: relative;
  top: ${(props) => (!props.$isOpen ? "0" : "1px")};
  transition: all 0.3s linear;
  transform: ${(props) => !props.$isOpen && "rotate(-90deg)"};
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

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-gap: 0.5rem;
  flex: 1;
`;

const Buttons = styled.div`
  opacity: 0.7;
  color: ${(props) => props.theme.text_tertiary};

  &:hover {
    opacity: 1;
  }
`;
