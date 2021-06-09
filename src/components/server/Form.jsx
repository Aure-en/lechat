import React, { useState } from "react";
import PropTypes from "prop-types";

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {nameError && <small>{nameError}</small>}

      <label htmlFor="image">
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
      </label>

      <button type="submit">{server ? "Update" : "Create"} Server</button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
