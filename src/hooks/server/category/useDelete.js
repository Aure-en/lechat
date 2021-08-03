import { useState } from "react";

function useDelete(categoryId) {
  const [error, setError] = useState("");

  /**
   * Send the request to the server to delete the category.
   * @param {string} categoryId
   * @returns {boolean} - true if the category was successfully deleted, false otherwise.
   */
  const remove = async (categoryId) => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/categories/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    if (json.error) {
      setError(json.error);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    remove(categoryId);
  };

  return {
    error,
    handleSubmit,
  };
}

export default useDelete;
