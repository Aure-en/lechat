import React from "react";
import { useAuth } from "../../context/AuthContext";
import Upload from "../shared/form/Upload";

function Avatar() {
  const { user } = useAuth();

  const handleChange = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    await fetch(`${process.env.REACT_APP_URL}/users/${user._id}/avatar`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: formData,
    });
  };

  return <Upload id="user-avatar" previous={user.avatar} send={handleChange} />;
}

export default Avatar;
