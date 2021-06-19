import React, { useState, useEffect } from "react";
import Upload from "../shared/form/Upload";

function Avatar() {
  const [image, setImage] = useState();

  const handleChange = async () => {
    const formData = new FormData();
    formData.append("image", image);

    await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/avatar`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: formData,
      }
    );
  };

  useEffect(() => {
    handleChange(image);
  }, [image]);

  return (
    <Upload
      previous={JSON.parse(localStorage.getItem("user")).avatar}
      send={setImage}
    />
  );
}

export default Avatar;
