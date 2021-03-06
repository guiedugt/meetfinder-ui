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
      type="email"
      placeholder="Email"
      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
  );

  const confirmEmail: IFieldValidator = (rule, value, callback) => {
    const emailConfirmation = form.getFieldValue('email-confirmation');
    value && emailConfirmation && value !== emailConfirmation
      ? callback('Emails não conferem.')
      : callback();

    emailConfirmation && form.validateFields(['email-confirmation']);
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
      {fieldDecorator('email')(input)}
    </Form.Item>
  );
};

export default EmailInput;
