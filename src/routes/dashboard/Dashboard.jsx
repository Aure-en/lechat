import React from "react";
import { useHistory } from "react-router-dom";
import Server from "../../components/modals/Server";

function Dashboard() {
  const history = useHistory();

  return (
    <div>
      You are logged in.
      <Server />
      <button
        type="button"
        onClick={() => {
          localStorage.clear();
          history.push("/login");
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Dashboard;
