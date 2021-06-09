import React, { useState } from "react";
import Email from "../components/settings/Email";
import Password from "../components/settings/Password";
import Username from "../components/settings/Username";

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

          <div>
            {user.username}
            Username
            <Username />
          </div>
        </>
      )}
    </>
  );
}

export default Settings;
