import React from 'react';

import { Button } from 'antd';

const SubmitButton: React.FC = ({
  children,
}) => {
  return (
    <Button
      block={true}
      type="primary"
      htmlType="submit"
    >
      {children || 'Enviar'}
    </Button>
  );
};

export default SubmitButton;
