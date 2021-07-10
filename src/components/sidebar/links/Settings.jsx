import React from "react";
import NavLink from "./NavLink";
import IconSettings from "../../../assets/icons/nav/Settings";

function Settings() {
  return (
    <NavLink to="/settings" tip="Settings">
      <IconSettings />
    </NavLink>
  );
}

export default Settings;
