import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../socket/socket";

function Login() {
  const initial = {
    identifier: "",
    password: "",
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({ ...initial, response: "" });
  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);

    // Client-side validation
    // Check that all fields are filled.
    if (!values.identifier) {
      setErrors((prev) => {
        return { ...prev, identifier: "Email / Username must be specified" };
      });
    }

    if (!values.password) {
      setErrors((prev) => {
        return { ...prev, identifier: "Password must be specified" };
      });
    }

    // If there are errors, display them without submitting the form.
    let hasErrors = false;
    for (const field of Object.keys(errors)) {
      if (errors[field]) {
        hasErrors = true;
        break;
      }
    }

    if (hasErrors) return;

    /* Submit the form
    - If login is successful, return { user, jwt: JWT }
    - If login failed, return { errors: [] }
    */

    const response = await fetch(`${process.env.REACT_APP_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: values.identifier,
        password: values.password,
      }),
    });

    const json = await response.json();

    // If there are form errors, display them.
    if (json.errors) {
      json.errors.map((error) =>
        setErrors((prev) => {
          return {
            ...prev,
            [error.param]: error.msg,
          };
        })
      );
    }

    // If the user was logged-in properly, save the jwt and user information.
    if (json.token) {
      localStorage.setItem("jwt", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));
      socket.emit("authentification", JSON.stringify(json.user));
      history.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="identifier">
        Email / Username
        <input
          type="text"
          id="identifier"
          name="identifier"
          value={values.identifier}
          onChange={handleInputChange}
        />
      </label>
      {errors.identifier && <div>{errors.identifier}</div>}

      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
      </label>
      {errors.password && <div>{errors.password}</div>}

      {errors.response && <div>{errors.response}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
