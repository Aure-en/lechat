import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Upload from "../shared/form/Upload";

function Avatar() {
  const [image, setImage] = useState();
  const { user } = useAuth();

  const handleChange = async () => {
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

  useEffect(() => {
    if (!image) return;
    handleChange(image);
  }, [image]);

  return <Upload previous={user.avatar} send={setImage} />;
}

export default Avatar;
