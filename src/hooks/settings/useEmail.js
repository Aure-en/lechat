import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function useEmail() {
  const initial = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const { user } = useAuth();

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
   * @returns {object} - the response.
   */
  const updateEmail = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/users/${user?._id}/email`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
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
      const emailError = json.errors.find((err) => err.param.match(/email/i));
      if (emailError) {
        setErrors((prev) => ({ ...prev, email: emailError.msg }));
      }

      const passwordError = json.errors.find((err) =>
        err.param.match(/password/i)
      );
      if (passwordError) {
        setErrors((prev) => ({ ...prev, password: passwordError.msg }));
      }
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setErrors(initial);

    // Validation
    if (hasErrors()) return;
    const json = await updateEmail();
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
