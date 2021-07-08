import { useState } from "react";

function useUsername() {
  const initial = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);

  /**
   * Client-side validation
   * Checks that all fields are filled.
   * @returns {boolean} - true if there are errors, false otherwise.
   */
  const hasErrors = () => {
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

    return hasErrors;
  };

  /**
   * Send the request to the server to update the username.
   * @returns {string} - the response.
   */
  const updateUsername = async () => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);

    // Validation
    if (hasErrors()) return;

    // Update the username
    updateUsername();
  };

  return {
    values,
    setValues,
    errors,
    handleSubmit,
  };
}

export default useUsername;
