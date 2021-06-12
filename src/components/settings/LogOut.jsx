import React from "react";
import { useHistory } from "react-router-dom";

function LogOut() {
  const history = useHistory();

  return (
    <button
      type="button"
      onClick={() => {
        localStorage.clear();
        history.push("/login");
      }}
    >
      Log Out
    </button>
  );
}

export default LogOut;
