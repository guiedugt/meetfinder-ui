import React from 'react';

import { Form, Input, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
}

const EmailInput: React.FC<IProps> = ({
  form,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const input: React.ReactNode = (
    <Input
      type="password"
      placeholder="Senha"
      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
  );

  const fieldDecorator: IFieldDecorator = id => form.getFieldDecorator(id, {
    rules: [{ required: true, message: 'Campo obrigatório' }],
  });

  return (
    <Form.Item>
      {fieldDecorator('password')(input)}
    </Form.Item>
  );
};

export default EmailInput;
