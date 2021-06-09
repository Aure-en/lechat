import React, { useState } from "react";
import PropTypes from "prop-types";

function Form({ serverId, category }) {
  const [name, setName] = useState((category && category.name) || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!name) {
      setError("Name must be specified.");
      return;
    }

    // Save the category (create or update it)

    const url = category
      ? `${process.env.REACT_APP_URL}/categories/${category._id}`
      : `${process.env.REACT_APP_URL}/servers/${serverId}/categories`;

    const method = category ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
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

      <button type="submit">{category ? "Update" : "Create"} Category</button>
    </form>
  );
}

export default Form;

Form.propTypes = {
  serverId: PropTypes.string.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Form.defaultProps = {
  category: undefined,
};
