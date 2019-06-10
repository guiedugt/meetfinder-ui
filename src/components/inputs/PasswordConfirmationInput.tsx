import React from 'react';

import { Form, Input, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
}

const PasswordConfirmationInput: React.FC<IProps> = ({
  form,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const input: React.ReactNode = (
    <Input
      type="password"
      placeholder="Confirmar Senha"
      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
  );

  const confirmPassword: IFieldValidator = (rule, value, callback) => {
    value && value !== form.getFieldValue('password')
      ? callback('Senhas não conferem.')
      : callback();

    form.validateFields(['password']);
  };

  const fieldDecorator: IFieldDecorator = id => form.getFieldDecorator(id, {
    rules: [
      { type: 'string', required: true, message: 'Campo obrigatório.' },
      { type: 'string', min: 6, message: 'Senha deve ter ao menos 6 dígitos.' },
      { type: 'string', validator: confirmPassword },
    ],
  });

  return (
    <Form.Item>
      {fieldDecorator('password-confirmation')(input)}
    </Form.Item>
  );
};

export default PasswordConfirmationInput;
