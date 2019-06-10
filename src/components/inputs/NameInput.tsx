import React from 'react';

import { Form, Input, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
}

const NameInput: React.FC<IProps> = ({
  form,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const input: React.ReactNode = (
    <Input
      type="name"
      placeholder="Nome"
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
    />
  );

  const fieldDecorator: IFieldDecorator = id => form.getFieldDecorator(id, {
    rules: [
      { type: 'string', required: true, message: 'Campo obrigatório.' },
      {
        type: 'string',
        pattern: /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\ \s]+$/,
        message: 'Nome inválido.',
      },
    ],
  });

  return (
    <Form.Item>
      {fieldDecorator('name')(input)}
    </Form.Item>
  );
};

export default NameInput;
