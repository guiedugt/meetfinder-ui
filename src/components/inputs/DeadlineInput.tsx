import React from 'react';

import { Form, DatePicker } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
  label?: string;
}

const NameInput: React.FC<IProps> = ({
  form,
  label,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const input: React.ReactNode = (
    <DatePicker
      showTime={false}
      showToday={false}
      format="DD/MM/YYYY"
      style={{ width: '100%' }}
    />
  );

  const fieldDecorator: IFieldDecorator = id => form.getFieldDecorator(id, {
    rules: [
      { required: true, message: 'Campo obrigatório.' },
    ],
  });

  return (
    <Form.Item label={label}>
      {fieldDecorator('deadline')(input)}
    </Form.Item>
  );
};

export default NameInput;
