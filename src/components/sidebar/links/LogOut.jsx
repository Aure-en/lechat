import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import socket from "../../../socket/socket";
import { ReactComponent as IconLogOut } from "../../../assets/icons/nav/logout.svg";

function LogOut() {
  const history = useHistory();
  const { user } = useAuth();

  const handleLogOut = () => {
    localStorage.clear();
    socket.emit("deauthentication", JSON.stringify(user));
    history.push("/auth/login");
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleLogOut}
        data-tip="Log Out"
        data-for="nav"
        data-offset="{'top': 16, 'right': 4}"
      >
        <IconLogOut />
      </Button>
    </>
  );
}

export default LogOut;

const Button = styled.button`
  & > svg {
    // Slight adjustement to align nav icons.
    padding-left: 3px;
  }
`;
