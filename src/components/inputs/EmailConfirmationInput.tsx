import React from 'react';

import { Form, Input, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
}

const EmailConfirmationInput: React.FC<IProps> = ({
  form,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const input: React.ReactNode = (
    <Input
      type="email"
      placeholder="Confirmar Email"
      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
  );

  const confirmEmail: IFieldValidator = (rule, value, callback) => {
    value && value !== form.getFieldValue('email')
      ? callback('Emails não conferem.')
      : callback();

    form.validateFields(['email']);
  };

  const fieldDecorator: IFieldDecorator = id => form.getFieldDecorator(id, {
    rules: [
      { required: true, message: 'Campo obrigatório.' },
      { type: 'email', message: 'Email inválido.' },
      { validator: confirmEmail },
    ],
  });

  return (
    <Form.Item>
      {fieldDecorator('email-confirmation')(input)}
    </Form.Item>
  );
};

export default EmailConfirmationInput;
