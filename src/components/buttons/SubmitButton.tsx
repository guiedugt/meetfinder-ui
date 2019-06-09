import React from 'react';

import { Button } from 'antd';

const SubmitButton: React.FC<any> = (props) => {
  return (
    <Button
      block={true}
      type="primary"
      htmlType="submit"
      {...props}
    >
      {props.children || 'Enviar'}
    </Button>
  );
};

export default SubmitButton;
