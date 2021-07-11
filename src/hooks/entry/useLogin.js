import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket/socket";

function useLogin() {
  const initial = {
    identifier: "",
    password: "",
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({ ...initial, response: "" });
  const history = useHistory();
  const { setUser } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  /**
   * Client-side validation.
   * Checks that all fields are filled.
   * @returns {bool} - true if there are errors, false otherwise.
   */
  const hasErrors = () => {
    if (!values.identifier) {
      setErrors((prev) => {
        return { ...prev, identifier: "Email / Username must be specified" };
      });
    }

    if (!values.password) {
      setErrors((prev) => {
        return { ...prev, identifier: "Password must be specified" };
      });
    }

    // If there are errors, display them without submitting the form.
    let hasErrors = false;
    Object.keys(errors).forEach((field) => {
      if (errors[field]) {
        hasErrors = true;
      }
    });

    return hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);

    if (hasErrors()) return;

    /* Submit the form
    - If login is successful, return { user, jwt: JWT }
    - If login failed, return { errors: [] }
    */

    const response = await fetch(`${process.env.REACT_APP_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: values.identifier,
        password: values.password,
      }),
    });

    const json = await response.json();

    // If there are form errors, display them.
    if (json.errors) {
      json.errors.map((error) =>
        setErrors((prev) => {
          return {
            ...prev,
            [error.param]: error.msg,
          };
        })
      );
    }

    // If the user was logged-in properly, save the jwt and user information.
    if (json.user && json.token) {
      localStorage.setItem("jwt", json.token);
      setUser(json.user);
      socket.emit("authentification", JSON.stringify(json.user));
      history.push("/");
    }
  };

  return {
    values,
    errors,
    handleInputChange,
    handleSubmit,
  };
}

export default useLogin;
