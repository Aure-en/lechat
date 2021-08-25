import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Upload from "../shared/form/Upload";

function Avatar() {
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const handleChange = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    setMessage("Updating avatar...");

    await fetch(`${process.env.REACT_APP_SERVER}/users/${user._id}/avatar`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: formData,
    });

    setMessage("Avatar successfully updated.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Upload
      id="user-avatar"
      previous={user.avatar}
      send={handleChange}
      message={message}
    />
  );
}

export default Avatar;
