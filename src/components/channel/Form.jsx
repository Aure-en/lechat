import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import useCreate from "../../hooks/server/channel/useCreate";
import SubmitBtn from "../shared/buttons/Gradient";

function Form({ serverId, categoryId, channel }) {
  const { name, setName, about, setAbout, error, handleSubmit } = useCreate(
    serverId,
    categoryId,
    channel
  );

  return (
    <div>
      <Header>
        <Heading>{channel ? "Update" : "Create"} Channel</Heading>
        <p>Channels are where your friends will gather to chat</p>
      </Header>
      <FormContainer onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name">
            Name
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter the channel name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Label>
          {error && <Error>{error}</Error>}
        </Field>

        <Field>
          <Label htmlFor="about">
            Description
            <Textarea
              id="about"
              name="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Enter the channel description"
            />
          </Label>
        </Field>

        <Button>
          <SubmitBtn type="submit">
            {channel ? "Update" : "Create"} Channel
          </SubmitBtn>
        </Button>
      </FormContainer>
    </div>
  );
}

export default Form;

Form.propTypes = {
  serverId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  channel: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Form.defaultProps = {
  channel: undefined,
};

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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
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

const Textarea = styled(TextareaAutosize)`
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

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
`;
