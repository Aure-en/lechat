import React, { useState } from "react";
import Email from "../components/settings/Email";
import Password from "../components/settings/Password";
import Username from "../components/settings/Username";
import Avatar from "../components/settings/Avatar";

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
            Username: {user.username}
            <Username />
          </div>

          <div>
            Avatar
            <Avatar />
          </div>
        </>
      )}
    </>
  );
}

export default Settings;
