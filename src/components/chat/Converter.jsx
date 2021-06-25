import React from "react";
import styled from "styled-components";
import { convertToHTML } from "draft-convert";

function Converter() {
  const html = convertToHTML({
    styleToHTML: (style) => {
      if (style === "BOLD") {
        return <strong />;
      }

      if (style === "ITALIC") {
        return <em />
      }

      if (style === "STRIKETHROUGH") {
        
      }
    },
  });
}

export default Converter;
