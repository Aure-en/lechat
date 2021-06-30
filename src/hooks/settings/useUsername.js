import { useState } from "react";

function useUsername() {
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
  };

  return {
    values,
    setValues,
    errors,
    handleSubmit,
  };
}

export default useUsername;
