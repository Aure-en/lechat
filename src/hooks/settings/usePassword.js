import { useState } from "react";

function usePassword() {
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
  };

  return {
    values,
    setValues,
    errors,
    handleSubmit,
  };
}

export default usePassword;
