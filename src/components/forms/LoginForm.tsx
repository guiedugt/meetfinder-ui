import React from 'react';

import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import SubmitButton from '../buttons/SubmitButton';

const LoginForm: React.FC<FormComponentProps> = ({
  form,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) console.log('Received values of form: ', values);
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <EmailInput form={form} />
      <PasswordInput form={form} />
      <SubmitButton />
    </Form>
  );
};

export default Form.create<FormComponentProps>()(LoginForm);
