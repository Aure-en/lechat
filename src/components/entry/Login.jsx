import React, { useState } from "react";

function Login() {
  const initial = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({ ...initial, response: "" });

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
    Object.keys(values).map((value) => {
      if (!values[value]) {
        setErrors((prev) => {
          return {
            ...prev,
            [value]: `${value} must be specified.`,
          };
        });
      }
    });

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

    const response = await fetch(
      `${process.env.REACT_APP_URL}/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    );

    // If there are form errors, display them.
    if (response.errors) {
      response.errors.map((error) =>
        setErrors((prev) => {
          return {
            ...prev,
            [error.param]: error.msg,
          };
        })
      );
    }

    // If the user was logged-in properly, save the jwt and user information.
    if (response.jwt) {
      localStorage.setItem("jwt", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email / Username
        <input
          type="text"
          id="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
      </label>
      {errors.email && <div>{errors.email}</div>}

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
