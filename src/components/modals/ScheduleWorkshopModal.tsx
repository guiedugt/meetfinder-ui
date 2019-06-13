import React, { Fragment, useState } from 'react';

import ScheduleWorkshopForm from '../forms/ScheduleWorkshopForm';
import { Button, Modal } from 'antd';

interface IProps {
  poll: IPoll;
}

const ScheduleWorkshopModal: React.FC<IProps> = ({
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
      type="primary"
      onClick={handleClick}
    >
      Agendar Workshop
    </Button>
  );

  return (
    <Fragment>
      {toggleButton}
      <Modal
        visible={visible}
        onCancel={toggleModal}
        title="Agendar workshop"
        footer={null}
      >
        <ScheduleWorkshopForm poll={poll}/>
      </Modal>
    </Fragment>
  );
};

export default ScheduleWorkshopModal;
