import React from "react";
import NavLink from "./NavLink";
import { ReactComponent as IconHome } from "../../../assets/icons/nav/home.svg";

function Home() {
  return (
    <NavLink to="/" tip="Home">
      <IconHome />
    </NavLink>
  );
}

export default Home;
