import { useState } from "react";

function useCreate(serverId, categoryId, channel) {
  const [name, setName] = useState((channel && channel.name) || "");
  const [about, setAbout] = useState((channel && channel.about) || "");
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setError("");

    // Validation
    if (!name) {
      setError("Name must be specified.");
      return;
    }

    // Save the channel (create or update it)
    const url = channel
      ? `${process.env.REACT_APP_URL}/channels/${channel._id}`
      : `${process.env.REACT_APP_URL}/servers/${serverId}/categories/${categoryId}/channels`;

    const method = channel ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about, category: categoryId }),
    });
    const json = await res.json();

    if (json.errors) {
      setError(json.errors.filter((err) => err.param === "name")[0].msg);
      return false;
    }
    return true;
  };

  return {
    name,
    setName,
    about,
    setAbout,
    error,
    onSubmit,
  };
}

export default useCreate;
