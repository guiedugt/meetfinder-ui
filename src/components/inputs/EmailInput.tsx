import React from 'react';

import { Form, Input, Icon } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

const EmailInput: React.FC<FormComponentProps> = ({
  form,
}) => {
  const input: React.ReactNode = (
    <Input
      type="email"
      placeholder="Email"
      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
  );

  const fieldDecorator: IFieldDecorator = id => form.getFieldDecorator(id, {
    rules: [
      { required: true, message: 'Campo obrigatório' },
      { type: 'email', message: 'Email inválido' },
    ],
  });

  return (
    <Form.Item>
      {fieldDecorator('email')(input)}
    </Form.Item>
  );
};

export default EmailInput;
