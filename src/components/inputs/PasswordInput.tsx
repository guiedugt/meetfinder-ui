import React from 'react';

import { Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const EmailInput: React.FC<FormComponentProps> = ({
  form,
}) => {
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
