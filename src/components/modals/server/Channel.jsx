import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../../channel/Form";
import Modal from "../Modal";

import { ReactComponent as IconPlus } from "../../../assets/icons/general/plus.svg";
import { ReactComponent as IconSettings } from "../../../assets/icons/general/settings.svg";

function Channel({ serverId, categoryId, channel }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        {channel ? <IconSettings /> : <IconPlus />}
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form serverId={serverId} categoryId={categoryId} channel={channel} />
      </Modal>
    </>
  );
}

export default Channel;

Channel.propTypes = {
  serverId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  channel: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

Channel.defaultProps = {
  channel: undefined,
};

const Button = styled.button`
  line-height: 0;
`;
