import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

function Server() {
  const { data: servers, error } = useFetch(
    `${process.env.REACT_APP_URL}/${localStorage.getItem("user")._id}/servers`
  );

  return <ul>{servers && servers.map((server) => <li>{server.name}</li>)}</ul>;
}

export default Server;
