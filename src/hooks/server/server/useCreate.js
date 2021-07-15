import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import socket from "../../../socket/socket";

function useCreate(server) {
  const [name, setName] = useState((server && server.name) || "");
  const [about, setAbout] = useState((server && server.about) || "");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState();
  const { user } = useAuth();

  // Helper functions
  const create = async () => {
    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
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

    return json;
  };

  const update = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    if (image) formData.append("image", image);

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
      const newServer = await create();
      socket.emit("join", {
        location: newServer._id,
        users: [user._id],
      });
    } else {
      update();
    }
  };

  return {
    name,
    setName,
    about,
    setAbout,
    nameError,
    setImage,
    handleSubmit,
  };
}

export default useCreate;
