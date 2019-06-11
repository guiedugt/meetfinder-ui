import React, { Fragment, useState } from 'react';

import PollForm from '../forms/PollForm';
import { Modal } from 'antd';
import { CreatePollButton } from './styles/CreatePollModal.styles'

const CreatePollModal: React.FC = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleModal: () => void = () => setVisible(!visible);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    toggleModal();
  };

  const toggleButton: JSX.Element = (
    <CreatePollButton
      type="primary"
      onClick={handleClick}
    >
      Criar Enquete
    </CreatePollButton>
  );

  return (
    <Fragment>
      {toggleButton}
      <Modal
        visible={visible}
        onCancel={toggleModal}
        title="Criar Enquete"
        footer={null}
      >
        <PollForm />
      </Modal>
    </Fragment>
  );
};

export default CreatePollModal;
