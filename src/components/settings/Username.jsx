import React, { useState } from "react";

function Username() {
  const initial = {
    username: "",
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

    // Update the username
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/username`,
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

    if (json.errors) {
      const usernameError = json.errors.filter((err) =>
        err.param.match(/username/i)
      );
      if (usernameError.length > 0)
        setErrors({ ...errors, username: usernameError[0].msg });

      const passwordError = json.errors.filter((err) =>
        err.param.match(/password/i)
      );
      if (passwordError.length > 0)
        setErrors({ ...errors, password: passwordError[0].msg });
    }

    if (!json.errors) {
      localStorage.setItem("user", JSON.stringify(json));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          placeholder="New username"
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
        />
      </label>
      {errors.username && <small>{errors.username}</small>}

      <label htmlFor="password">
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          placeholder="Current password"
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
        />
      </label>
      {errors.password && <small>{errors.password}</small>}

      <button type="submit">Update Username</button>
    </form>
  );
}

export default Username;
