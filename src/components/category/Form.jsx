import React, { useState } from "react";
import PropTypes from "prop-types";

function Form({ serverId }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    // Validation
    if (!name) {
      setError("Name must be specified.");
      return;
    }

    // Save the category
    const res = await fetch(
      `${process.env.REACT_APP_URL}/servers/${serverId}/categories`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const json = await res.json();
    console.log(json);

    if (json.errors) {
      setError(json.errors.filter((err) => err.param === "name")[0].msg);
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
      {error && <small>{error}</small>}

      <button type="submit">Create Category</button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  serverId: PropTypes.string.isRequired,
};
