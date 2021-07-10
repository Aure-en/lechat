import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

function Settings() {
  const themeContext = useContext(ThemeContext);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-brightness-2"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M6 6h3.5l2.5 -2.5l2.5 2.5h3.5v3.5l2.5 2.5l-2.5 2.5v3.5h-3.5l-2.5 2.5l-2.5 -2.5h-3.5v-3.5l-2.5 -2.5l2.5 -2.5z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        fill={themeContext.bg_sidebar}
        stroke={themeContext.bg_sidebar}
      />
    </svg>
  );
}

export default Settings;
