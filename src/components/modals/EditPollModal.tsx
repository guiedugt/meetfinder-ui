import React, { Fragment, useState } from 'react';

import PollForm from '../forms/PollForm';
import { Modal, Button } from 'antd';

interface IProps {
  poll: IPoll;
}

const EditPollModal: React.FC<IProps> = ({
  poll,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleModal: () => void = () => setVisible(!visible);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    toggleModal();
  };

  const toggleButton: JSX.Element = (
    <Button
      onClick={handleClick}
    >
      Editar Enquete
    </Button>
  );

  return (
    <Fragment>
      {toggleButton}
      <Modal
        visible={visible}
        onCancel={toggleModal}
        title="Editar Enquete"
        footer={null}
      >
        <PollForm initialValues={poll} />
      </Modal>
    </Fragment>
  );
};

export default EditPollModal;
