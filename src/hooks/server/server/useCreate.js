import { useState } from "react";
import { useHistory } from "react-router-dom";
import socket from "../../../socket/socket";

function useCreate(server, setIsOpen) {
  const [name, setName] = useState(server?.name || "");
  const [about, setAbout] = useState(server?.about || "");
  const [nameError, setNameError] = useState("");
  const [image, setImage] = useState();
  const [message, setMessage] = useState("");
  const history = useHistory();

  // Helper functions
  const create = async () => {
    // Create form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    if (image) formData.append("image", image);
    setMessage("Creating server...");

    // Submit the form
    const res = await fetch(`${process.env.REACT_APP_SERVER}/servers`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      body: formData,
    });
    const json = await res.json();

    // If there are errors, display them.
    if (json.errors) {
      setNameError(json.errors.filter((err) => err.param === "name")[0].msg);
    } else {
      setMessage("Server successfully created.");
      history.push(`/servers/${json._id}`);
      setIsOpen(false); // Close modal
    }
    return json;
  };

  const update = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("about", about);
    if (image) formData.append("image", image);
    setMessage("Updating...");

    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/servers/${server._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: formData,
      }
    );

    const json = await res.json();

    // If there are errors, display them.
    if (json.errors) {
      setNameError(json.errors.filter((err) => err.param === "name")[0].msg);
    } else {
      setMessage("Server successfully updated.");
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
      // Join room to get real time updates.
      socket.emit("join", newServer._id);
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
    message,
    handleSubmit,
  };
}

export default useCreate;
