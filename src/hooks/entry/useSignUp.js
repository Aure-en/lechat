import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import socket from "../../socket/socket";

function useSignUp() {
  const initial = {
    username: "",
    email: "",
    password: "",
    confirmation: "",
  };

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({ ...initial, response: "" });
  const { setUser } = useAuth();
  const history = useHistory();

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
    let hasErrors;

    Object.keys(values).map((value) => {
      if (!values[value]) {
        hasErrors = true;
        setErrors((prev) => {
          return {
            ...prev,
            [value]: `${
              value[0].toUpperCase() + value.slice(1)
            } must be specified.`,
          };
        });
      }
    });

    // Check that password and confirmation have the same value
    if (values.password !== values.confirmation) {
      setErrors({
        ...errors,
        confirmation: "Password and confirmation are different.",
      });
      hasErrors = true;
    }

    // If there are errors, display them without submitting the Form.
    return hasErrors;
  };

  /** Send the form to the server.
   * @returns {object} - json containing the user's information or errors.
   *   - If SignUp is successful, return { user, jwt }
   *   - If SignUp failed, return { errors: [] }
   */
  const send = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      }
    );

    const json = await response.json();
    return json;
  };

  /**
   * Display the errors if there are any
   * @param {Array} - contains errors to display.
   */
  const displayErrors = (errors) => {
    errors.map((error) =>
      setErrors((prev) => {
        return {
          ...prev,
          [error.param]: error.msg,
        };
      })
    );
  };

  /**
   * Send a request to the server to create a document
   * tracking the user's activity.
   */
  const setActivity = async (token, user) => {
    await fetch(`${process.env.REACT_APP_SERVER}/activity`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
      }),
    });
  };

  /**
   * Saves the token and user.
   * @param {string} token
   * @param {object} user
   */
  const authentify = (token, user) => {
    localStorage.setItem("jwt", token);
    setUser(user);
    socket.emit("authentication", JSON.stringify(user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);

    // If there are errors, display them without submitting the Form.
    if (hasErrors()) return;
    const json = await send();

    // If there are errors, display them.
    if (json.errors) {
      displayErrors(json.errors);
    }

    // If the user was created and logged-in properly
    // - Save the jwt and user information.
    // - Create a document to track the user's activity
    // - Once everything is done, redirects the user to their dashboard.
    if (json.user && json.token) {
      authentify(json.token, json.user);
      await setActivity(json.token, json.user);
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

export default useSignUp;
