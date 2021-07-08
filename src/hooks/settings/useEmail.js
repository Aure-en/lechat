import { useState } from "react";

export default function useEmail() {
  const initial = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);

  /**
   * Client-side validation
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
   * Send the request to the server to update the email.
   * @returns {string} - the response.
   */
  const updateEmail = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${JSON.parse(localStorage.getItem("user"))._id}/email`,
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
    return json;
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(initial);

    // Validation
    if (hasErrors()) return;
    updateEmail();
  }

  return {
    values,
    setValues,
    errors,
    handleSubmit,
  };
}
