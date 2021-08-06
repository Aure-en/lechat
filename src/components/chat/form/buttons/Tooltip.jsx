import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

function Tooltip({ name, keys }) {
  return (
    <ReactTooltip id={name} delayShow={500} effect="solid">
      <Content>
        <span>{name}</span>
        {keys && <Ul>{keys && keys.map((key) => <Li key={key}>{key}</Li>)}</Ul>}
      </Content>
    </ReactTooltip>
  );
}

export default Tooltip;

Tooltip.propTypes = {
  name: PropTypes.string.isRequired, // Displayed on tooltip
  keys: PropTypes.arrayOf(PropTypes.string), // Key binding
};

Tooltip.defaultProps = {
  keys: [],
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ul = styled.ul`
  display: flex;

  & > li {
    margin-right: 0.5rem;
  }

  & > li:last-child {
    margin-right: 0;
  }
`;

const Li = styled.li`
  color: ${(props) => props.theme.text_primary};
  background: ${(props) => props.theme.tooltip_key};
  padding: 0 0.25rem;
  border-radius: 3px;
  word-break: keep-all;
`;
