import React from 'react';

import { Form, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

const TextInput: React.FC<IProps> = ({
  form,
  name,
  label,
  placeholder,
  required,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const input: React.ReactNode = (
    <Input
      type="text"
      placeholder={placeholder}
    />
  );

  const fieldDecorator: IFieldDecorator = id => form.getFieldDecorator(id, {
    rules: [
      { required, type: 'string', message: 'Campo obrigatório.' },
    ],
  });

  return (
    <Form.Item label={label}>
      {fieldDecorator(name)(input)}
    </Form.Item>
  );
};

export default TextInput;
