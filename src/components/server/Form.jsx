import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name) {
      setNameError("Name must be specified.");
      return;
    }

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

      <button type="submit">Create Server</button>
    </form>
  );
}

export default Form;
