import React, { useState } from "react";
import Email from "../components/settings/Email";
import Password from "../components/settings/Password";

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

          <div>
            Password
            <Password />
          </div>
        </>
      )}
    </>
  );
}

export default Settings;
