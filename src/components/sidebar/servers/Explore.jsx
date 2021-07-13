import React from "react";
import NavLink from "../links/NavLink";
import { ReactComponent as IconCompass } from "../../../assets/icons/nav/compass.svg";

function Explore() {
  return (
    <NavLink to="/explore" tip="Explore" offset={false}>
      <IconCompass />
    </NavLink>
  );
}

export default Explore;
