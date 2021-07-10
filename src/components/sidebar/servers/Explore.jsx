import React from "react";
import NavLink from "../links/NavLink";
import IconCompass from "../../../assets/icons/nav/Compass";

function Explore() {
  return (
    <NavLink to="/servers" tip="Explore" offset={false}>
      <IconCompass />
    </NavLink>
  );
}

export default Explore;
