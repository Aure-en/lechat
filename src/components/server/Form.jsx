import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import useServer from "../../hooks/server/useServer";
import Upload from "../shared/form/Upload";
import SubmitBtn from "../shared/buttons/Gradient";

function Form({ server }) {
  const { name, setName, about, setAbout, nameError, setImage, handleSubmit } =
    useServer(server);

  return (
    <div>
      <Header>
        <Heading>{server ? "Update your server" : "Create a server"}</Heading>
        <p>
          {server
            ? "Give your server a fresh look by updating its name or icon."
            : "Your server is where you and your friends hang out. Make yours and start talking."}
        </p>
      </Header>
      <FormContainer onSubmit={handleSubmit}>
        <Field>
          <Upload previous={server && server.icon} send={setImage} />
        </Field>

        <Field>
          <Label htmlFor="name">
            Name
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your server's name"
            />
          </Label>
          {nameError && <Error>{nameError}</Error>}
        </Field>

        <Field>
          <Label htmlFor="about">
            Description
            <Textarea
              id="about"
              name="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Enter your server's description"
            />
          </Label>
        </Field>

        <Button>
          <SubmitBtn type="submit">
            {server ? "Update" : "Create"} Server
          </SubmitBtn>
        </Button>
      </FormContainer>
    </div>
  );
}

export default Form;

Form.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    icon: PropTypes.shape({
      contentType: PropTypes.string,
      data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
      }),
    }),
  }),
};

Form.defaultProps = {
  server: undefined,
};

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  font-family: "Playfair Display", sans-serif;
  font-size: 2rem;
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
