import React, { useState } from "react";

function SignUp() {
  const initial = {
    username: "",
    email: "",
    password: "",
    confirmation: "",
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

    let hasErrors = false;
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

    for (const field of Object.keys(errors)) {
      if (errors[field]) {
        hasErrors = true;
        break;
      }
    }

    // Check that password and confirmation have the same value
    if (values.password !== values.confirmation) {
      setErrors({
        ...errors,
        confirmation: "Password and confirmation are different.",
      });
      hasErrors = true;
    }
    // If there are errors, display them without submitting the form.
    if (hasErrors) return;

    /* Submit the form
    - If SignUp is successful, return { user, jwt: JWT }
    - If SignUp failed, return { errors: [] }
    */

    const response = await fetch(
      `${process.env.REACT_APP_URL}/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify({
          username: values.username,
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

    // If the user was created and logged-in properly, save the jwt and user information.
    if (response.jwt) {
      localStorage.setItem("jwt", response.jwt);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleInputChange}
        />
      </label>
      {errors.username && <div>{errors.username}</div>}

      <label htmlFor="email">
        Email
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

      <label htmlFor="confirmation">
        Password Confirmation
        <input
          type="password"
          id="confirmation"
          name="confirmation"
          value={values.confirmation}
          onChange={handleInputChange}
        />
      </label>
      {errors.confirmation && <div>{errors.confirmation}</div>}

      {errors.response && <div>{errors.response}</div>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUp;
