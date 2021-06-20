import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// Timestamp related libraries
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(calendar);

function Timestamp({ timestamp, isFirst }) {
  const formatTimestamp = (timestamp, isFirst) => {
    if (isFirst) {
      return dayjs(new Date(timestamp)).calendar(null, {
        sameDay: "[Today at] HH:mm", // The same day ( Today at 2:30 AM )
        lastDay: "[Yesterday at] HH:mm", // The day before ( Yesterday at 2:30 AM )
        sameElse: "DD/MM/YYYY", // Everything else ( 17/10/2011 )
      });
    }
    return dayjs(new Date(timestamp)).format("HH:mm");
  };

  return <Time>{formatTimestamp(timestamp, isFirst)}</Time>;
}

export default Timestamp;

Timestamp.propTypes = {
  timestamp: PropTypes.number.isRequired,
  isFirst: PropTypes.bool,
};

Timestamp.defaultProps = {
  isFirst: false,
};

const Time = styled.time`
  color: ${(props) => props.theme.text_secondary};
  font-size: 0.75rem;
  font-weight: 300;
  margin-left: 0.5rem;
`;
