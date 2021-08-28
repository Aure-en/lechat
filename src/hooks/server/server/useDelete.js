import { useState } from "react";
import { useHistory } from "react-router-dom";

function useDelete() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const remove = async (id) => {
    setLoading(true);
    await fetch(`${process.env.REACT_APP_SERVER}/servers/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    });
    history.push("/");
  };

  return { loading, remove };
}

export default useDelete;
