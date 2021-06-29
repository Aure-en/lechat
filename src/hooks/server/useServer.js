import { useState } from "react";

function useServer(server) {
  const [name, setName] = useState((server && server.name) || "");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState();

  // Helper functions
  const create = async () => {
    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    // Submit the form
    const res = await fetch(`${process.env.REACT_APP_URL}/servers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: formData,
    });
    const json = await res.json();

    // If there are errors, display them.
    if (json.errors) {
      setNameError(json.errors.filter((err) => err.param === "name")[0].msg);
    }
  };

  const update = async () => {
    const formData = new FormData();
    formData.append("name", name);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch(
      `${process.env.REACT_APP_URL}/servers/${server._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: formData,
      }
    );

    const json = await res.json();

    // If there are errors, display them.
    if (json.errors) {
      setNameError(json.errors.filter((err) => err.param === "name")[0].msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name) {
      setNameError("Name must be specified.");
      return;
    }

    // Submit the form
    if (!server) {
      create();
    } else {
      update();
    }
  };

  return {
    name,
    setName,
    nameError,
    setImage,
    handleSubmit,
  };
}

export default useServer;
