import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SubmitBtn from "../shared/buttons/Gradient";

import { ReactComponent as IconUpload } from "../../assets/icons/general/upload.svg";

function Form({ server }) {
  const [name, setName] = useState((server && server.name) || "");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

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
    console.log(json);
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
          <ImageLabel
            htmlFor="image"
            $previous={server && server.icon}
            $preview={preview}
          >
            {!preview && (!server || !server.icon) && (
              <>
                <IconUpload />
                Upload
              </>
            )}
            <HiddenInput
              type="file"
              id="image"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </ImageLabel>
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

const ImageLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: ${(props) => !props.$preview && !props.$previous && `2px dashed ${props.theme.border}`};
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 400;
  cursor: pointer;
  background: ${(props) => {
    if (props.$preview) return `url(${props.$preview})`;
    if (props.$previous && !props.$preview)
      return `url('data:${props.$previous.contentType};base64,${Buffer.from(
        props.$previous.data
      ).toString("base64")}')`;
  }};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const HiddenInput = styled.input`
  position: absolute;
  left: -9999px;
  top: -9999px;
`;

const Error = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 0.825rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
`;
