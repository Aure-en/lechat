import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function usePassword() {
  const initial = {
    current: "",
    new: "",
    confirmation: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const { user } = useAuth();

  /**
   * Client-side validation.
   * @returns {boolean} - true if there are errors, false otherwise.
   */
  const hasErrors = () => {
    let hasErrors;

    // Checks that all fields are specified
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

    return hasErrors;
  };

  /**
   * Send the request to the server to update the password.
   * @returns {string} - the response.
   */
  const updatePassword = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${user._id}/password`,
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

    if (json.errors) {
      const error = json.errors.find((err) => err.param.match(/password/i));
      if (error) setErrors((prev) => ({ ...prev, current: error.msg }));
    }

    return json;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);

    if (hasErrors()) return;
    updatePassword();
  };

  return {
    values,
    setValues,
    errors,
    handleSubmit,
  };
}

export default usePassword;
