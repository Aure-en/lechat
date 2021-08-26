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
  const [message, setMessage] = useState("");
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
    let hasErrors;

    if (!values.identifier) {
      setErrors((prev) => {
        return { ...prev, identifier: "Email / Username must be specified" };
      });
      hasErrors = true;
    }

    if (!values.password) {
      setErrors((prev) => {
        return { ...prev, password: "Password must be specified" };
      });
      hasErrors = true;
    }

    return hasErrors;
  };

  /** Send the form to the server.
   * @returns {object} json containing the user's information or errors.
   */
  const send = async (identifier, password) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

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
        let toBeDisplayed;
        if (error.msg === "Incorrect password.") {
          toBeDisplayed = { password: error.msg };
        } else if (error.msg === "Incorrect username/email.")
          toBeDisplayed = { identifier: error.msg };
        return {
          ...prev,
          ...toBeDisplayed,
        };
      })
    );
  };

  /**
   * Saves the token and user.
   * @param {string} token
   * @param {object} user
   */
  const authentify = (token, user) => {
    sessionStorage.setItem("jwt", token);
    setUser(user);
    socket.emit("authentication", JSON.stringify(user));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);
    setMessage("");

    if (hasErrors()) return;
    setMessage("Authenticating...");
    const json = await send(values.identifier, values.password);

    if (json.errors) {
      setMessage("");
      return displayErrors(json.errors);
    }

    // If the user was logged-in properly, save the jwt and user information.
    if (json.user && json.token) {
      setMessage("Successfully authenticated.");
      authentify(json.token, json.user);

      // Everything was done properly, redirects the user to their dashboard.
      history.push("/");
    }
  };

  const handleSample = async (e) => {
    e.preventDefault();
    const json = await send("User", "lechat");
    if (json.user && json.token) {
      authentify(json.token, json.user);
      history.push("/");
    }
  };

  return {
    values,
    errors,
    message,
    handleInputChange,
    handleSubmit,
    handleSample,
  };
}

export default useLogin;
