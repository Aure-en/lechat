import React, { useState } from "react";
import Email from "../components/settings/Email";

function Settings() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <>
      {user && (
        <>
          <div>
            Email: {user.email}
            <Email />
          </div>
        </>
      )}
    </>
  );
}

export default Settings;
