import React, { useState } from "react";
import styled from "styled-components";
import useRequest from "../../hooks/friends/useRequest";
import Button from "../shared/buttons/Accent";
import SubmitBtn from "../shared/buttons/Gradient";
import Modal from "../modals/Modal";

function Add() {
  const [isOpen, setIsOpen] = useState(false);
  const { friend, setFriend, error, success, handleSubmit } = useRequest();

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        Add a friend
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form onSubmit={handleSubmit}>
          <Header>
            <Heading>Friend Request</Heading>
            <p>
              Send a friend request by entering their email or username. Be
              careful, it is cAsE sEnSiTiVe.
            </p>
          </Header>

          <Label htmlFor="friend">
            Username / email
            <Input
              type="text"
              id="friend"
              name="friend"
              value={friend}
              placeholder="Enter your friend's username or email"
              onChange={(e) => setFriend(e.target.value)}
            />
          </Label>
          {error && <Error>{error}</Error>}
          {success && <Success>{success}</Success>}

          <Buttons>
            <SubmitBtn>Send Request</SubmitBtn>
          </Buttons>
        </Form>
      </Modal>
    </>
  );
}

export default Add;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 1.75rem;
  line-height: 2.75rem;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-size: 0.825rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.input_border};
  padding: 0.5rem 0 0.25rem 0;

  &::placeholder {
    color: ${(props) => props.theme.input_border};
  }

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.input_border_active};
  }
`;

const Error = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 0.825rem;
`;

const Success = styled.div`
  color: ${(props) => props.theme.text_tertiary};
  font-size: 0.825rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;
