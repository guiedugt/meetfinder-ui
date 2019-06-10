import React, { Fragment, useState } from 'react';

import ChangePasswordForm from '../forms/ChangePasswordForm';
import { Modal } from 'antd';

const ChangePasswordModal: React.FC = (props) => {
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
      Alterar senha
    </a>
  );

  return (
    <Fragment>
      {toggleButton}
      <Modal
        visible={visible}
        onCancel={toggleModal}
        title="Alterar senha"
        footer={null}
      >
        <ChangePasswordForm />
      </Modal>
    </Fragment>
  );
};

export default ChangePasswordModal;
