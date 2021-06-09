import React, { useState } from "react";

function Password() {
  const initial = {
    current: "",
    new: "",
    confirmation: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);

    // Validation
    // Check if all fields are specified
    let hasErrors;
    Object.keys(values).map((key) => {
      if (!values[key]) {
        setErrors((prev) => {
          return {
            ...prev,
            [key]: `${
              key.charAt(0).toUpperCase() + key.slice(1)
            } password must be specified.`,
          };
        });
        hasErrors = true;
      }
    });

    // Check if new password and confirmation passwords are the same
    if (values.new !== values.confirmation) {
      setErrors((prev) => {
        return {
          ...prev,
          new: "New password and confirmation password do not match.",
          confirmation: "New password and confirmation password do not match.",
        };
      });
      hasErrors = true;
    }

    if (hasErrors) return;

    // Update the password
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/password`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: values.current,
          new_password: values.new,
          confirm_password: values.confirmation,
        }),
      }
    );
    const json = await res.json();
    if (!json.errors) {
      localStorage.setItem("user", JSON.stringify(json));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="current_password">
        <input
          type="password"
          id="current_password"
          name="current_password"
          placeholder="Current password"
          value={values.current}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, current: e.target.value };
            })
          }
        />
      </label>
      {errors.current && <small>{errors.current}</small>}

      <label htmlFor="new_password">
        <input
          type="password"
          id="new_password"
          name="new_password"
          placeholder="New password"
          value={values.password}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, new: e.target.value };
            })
          }
        />
      </label>
      {errors.new && <small>{errors.new}</small>}

      <label htmlFor="confirm_password">
        <input
          type="password"
          id="confirm_password"
          name="confirm_passwordd"
          placeholder="Confirm new password"
          value={values.confirmation}
          onChange={(e) =>
            setValues((prev) => {
              return { ...prev, confirmation: e.target.value };
            })
          }
        />
      </label>
      {errors.confirmation && <small>{errors.confirmation}</small>}

      <button type="submit">Update Password</button>
    </form>
  );
}

export default Password;
