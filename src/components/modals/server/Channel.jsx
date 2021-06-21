import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Form from "../../channel/Form";
import Modal from "../Modal";

import IconPlus from "../../../assets/icons/general/IconPlus";
import { ReactComponent as IconSettings } from "../../../assets/icons/general/settings.svg";

function Channel({ serverId, categoryId, channel }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        {channel ? <IconSettings /> : <IconPlus size={20} strokeWidth={1} />}
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
