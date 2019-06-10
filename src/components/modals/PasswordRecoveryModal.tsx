import React, { Fragment, useState } from 'react';

import PasswordRecoveryEmailForm from '../forms/PasswordRecoveryEmailForm';
import { Modal } from 'antd';

const PasswordRecoveryModal: React.FC = (props) => {
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
      Esqueci a senha
    </a>
  );

  return (
    <Fragment>
      {toggleButton}
      <Modal
        visible={visible}
        onCancel={toggleModal}
        title="Recuperar senha"
        footer={null}
      >
        <PasswordRecoveryEmailForm />
      </Modal>
    </Fragment>
  );
};

export default PasswordRecoveryModal;
