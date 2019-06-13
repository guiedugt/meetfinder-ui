import React, { Fragment, useState } from 'react';

import WorkshopForm from '../forms/WorkshopForm';
import { Modal } from 'antd';

interface IProps {
  workshop: IWorkshop;
}

const EditWorkshopModal: React.FC<IProps> = ({
  workshop,
  children,
}) => {
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
      {children || 'Editar Workshop'}
    </a>
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
        <WorkshopForm initialValues={workshop} />
      </Modal>
    </Fragment>
  );
};

export default EditWorkshopModal;
