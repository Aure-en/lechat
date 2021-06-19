import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Upload from "../shared/form/Upload";
import SubmitBtn from "../shared/buttons/Gradient";

function Form({ server }) {
  const [name, setName] = useState((server && server.name) || "");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState();

  // Helper functions
  const create = async () => {
    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    // Submit the form
    const res = await fetch(`${process.env.REACT_APP_URL}/servers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: formData,
    });
    const json = await res.json();

    // If there are errors, display them.
    if (json.errors) {
      setNameError(json.errors.filter((err) => err.param === "name")[0].msg);
    }
  };

  const update = async () => {
    // Update the name
    const res = await fetch(
      `${process.env.REACT_APP_URL}/servers/${server._id}/name`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );

    const json = await res.json();

    // If there are errors, display them.
    if (json.errors) {
      setNameError(json.errors.filter((err) => err.param === "name")[0].msg);
    }

    // Update the image
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      await fetch(`${process.env.REACT_APP_URL}/servers/${server._id}/icon`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: formData,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name) {
      setNameError("Name must be specified.");
      return;
    }

    // Submit the form
    if (!server) {
      create();
    } else {
      update();
    }
  };

  return (
    <div>
      <Header>
        <Heading>{server ? "Update your server" : "Create a server"}</Heading>
        <p>
          {server
            ? "Your server is where you and your friends hang out. Make yours and start talking. Give your new server a personality with a name and an icon. You can always change them later."
            : "Give your server a fresh look by updating its name or icon."}
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
  }).isRequired,
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

const Error = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 0.825rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
`;
