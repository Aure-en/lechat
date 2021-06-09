import React from "react";

function Avatar() {
  const handleChange = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await fetch(
      `${process.env.REACT_APP_URL}/users/${
        JSON.parse(localStorage.getItem("user"))._id
      }/avatar`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        },
        body: formData,
      }
    );
  };

  return (
    <div>
      <label htmlFor="avatar">
        <input type="file" id="avatar" name="avatar" onChange={handleChange} />
      </label>
    </div>
  );
}

export default Avatar;
