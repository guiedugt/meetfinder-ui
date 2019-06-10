import React from 'react';

import { Form, Input, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
  placeholder?: string;
}

const PasswordInput: React.FC<IProps> = ({
  form,
  placeholder,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const input: React.ReactNode = (
    <Input
      type="password"
      placeholder={placeholder || 'Senha'}
      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
  );

  const confirmPassword: IFieldValidator = (rule, value, callback) => {
    const passwordConfirmation = form.getFieldValue('password-confirmation');
    value && passwordConfirmation && value !== passwordConfirmation
      ? callback('Senhas não conferem.')
      : callback();

    passwordConfirmation && form.validateFields(['password-confirmation']);
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
      {fieldDecorator('password')(input)}
    </Form.Item>
  );
};

export default PasswordInput;
