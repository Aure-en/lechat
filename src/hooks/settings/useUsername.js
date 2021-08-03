import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function useUsername() {
  const initial = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const { user } = useAuth();

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
      `${process.env.REACT_APP_SERVER}/users/${user._id}/username`,
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

  /**
   * After the request is sent to the server, display errors if there are any.
   * If everything went well, return true. Else, return false.
   * @param {json} json
   * @returns {boolean}
   */
  const handleResult = (json) => {
    if (json.errors) {
      const usernameError = json.errors.filter((err) =>
        err.param.match(/username/i)
      );
      if (usernameError.length > 0)
        setErrors((prev) => ({ ...prev, username: usernameError[0].msg }));

      const passwordError = json.errors.filter((err) =>
        err.param.match(/password/i)
      );
      if (passwordError.length > 0)
        setErrors((prev) => ({ ...prev, password: passwordError[0].msg }));
      return false;
    }
    return true;
  };

  /**
   * Submit the form.
   * @returns {boolean} - true if everything went well, false otherwise.
   */
  const onSubmit = async () => {
    setErrors(initial);

    // Validation
    if (hasErrors()) return false;

    // Update the username
    const json = await updateUsername();
    const result = handleResult(json);
    return result;
  };

  return {
    values,
    setValues,
    errors,
    onSubmit,
  };
}

export default useUsername;
