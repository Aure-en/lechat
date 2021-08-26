import { useState } from "react";

function useCreate(serverId, category) {
  const [name, setName] = useState((category && category.name) || "");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");

    // Validation
    if (!name) {
      setError("Name must be specified.");
      return;
    }

    // Save the category (create or update it)
    const url = category
      ? `${process.env.REACT_APP_SERVER}/categories/${category._id}`
      : `${process.env.REACT_APP_SERVER}/servers/${serverId}/categories`;

    const method = category ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const json = await res.json();

    // Validation errors
    if (json.errors) {
      setError(json.errors.filter((err) => err.param === "name")[0].msg);
      return false;
    }

    // Permission error
    if (json.error) {
      setError(json.error);
      return false;
    }

    return true;
  };

  return {
    name,
    setName,
    error,
    onSubmit,
  };
}

export default useCreate;
