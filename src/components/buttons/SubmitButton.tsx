import React from 'react';

import { Button } from 'antd';

interface IProps {
  loading?: boolean;
}

const SubmitButton: React.FC<IProps> = ({
  children,
  loading,
}) => {
  return (
    <Button
      block={true}
      type="primary"
      htmlType="submit"
      loading={loading}
    >
      {children || 'Salvar'}
    </Button>
  );
};

export default SubmitButton;
