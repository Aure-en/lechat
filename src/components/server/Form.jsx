import React, { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
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

      <label htmlFor="icon">
        <input
          type="file"
          id="icon"
          name="icon"
          value={icon}
          onChange={(e) => setIcon(e.target.file)}
        />
      </label>

      <button type="submit">Create Server</button>
    </form>
  );
}

export default Form;
