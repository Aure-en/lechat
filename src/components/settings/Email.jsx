import React, { useState } from "react";

function Email() {
  const initial = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);

    // Validation
    let hasErrors;
    Object.keys(values).map((key) => {
      if (!values[key]) {
        setErrors((prev) => {
          return {
            ...prev,
            [key]: `${
              key.charAt(0).toUpperCase() + key.slice(1)
            } must be specified.`,
          };
        });
        hasErrors = true;
      }
    });

    if (hasErrors) return;

    // Update the new email
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/email`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const json = await res.json();
    if (!json.errors) {
      localStorage.setItem("user", JSON.stringify(json));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
      </label>
      {errors.email && <small>{errors.email}</small>}

      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
      </label>
      {errors.password && <small>{errors.password}</small>}

      <button type="submit">Update Email</button>
    </form>
  );
}

export default Email;
