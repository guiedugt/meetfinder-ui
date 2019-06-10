import React, { Fragment, useState } from 'react';

import ResendEmailForm from '../forms/ResendEmailForm';
import { Modal } from 'antd';

const ResendEmailModal: React.FC = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleModal: () => void = () => setVisible(!visible);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    toggleModal();
  };

  const toggleButton: JSX.Element = (
    <a
      onClick={handleClick}
      href="/"
    >
      Reenviar email de confirmação
    </a>
  );

  return (
    <Fragment>
      {toggleButton}
      <Modal
        visible={visible}
        onCancel={toggleModal}
        title="Reenviar email"
        footer={null}
      >
        <ResendEmailForm />
      </Modal>
    </Fragment>
  );
};

export default ResendEmailModal;
