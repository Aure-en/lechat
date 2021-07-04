import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(initial);
    // Client-side validation
    // Check that all fields are filled.

    let hasErrors = false;
    Object.keys(values).map((value) => {
      if (!values[value]) {
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

    for (const field of Object.keys(errors)) {
      if (errors[field]) {
        hasErrors = true;
        break;
      }
    }

    // Check that password and confirmation have the same value
    if (values.password !== values.confirmation) {
      setErrors({
        ...errors,
        confirmation: "Password and confirmation are different.",
      });
      hasErrors = true;
    }
    // If there are errors, display them without submitting the Form.
    if (hasErrors) return;

    /* Submit the Form
    - If SignUp is successful, return { user, jwt: JWT }
    - If SignUp failed, return { errors: [] }
    */

    const response = await fetch(`${process.env.REACT_APP_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    const json = await response.json();

    // If there are Form errors, display them.
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

    // If the user was created and logged-in properly, save the jwt and user inFormation.
    if (json.token) {
      localStorage.setItem("jwt", json.token);
      setUser(json.user);
    }

    // Create document in the database to track the user's activity
    await fetch(`${process.env.REACT_APP_URL}/activity`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${json.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: json.user._id,
      }),
    });

    // Everything was done successfully.
    history.push("/");
  };

  return {
    values,
    errors,
    handleInputChange,
    handleSubmit,
  };
}

export default useSignUp;
