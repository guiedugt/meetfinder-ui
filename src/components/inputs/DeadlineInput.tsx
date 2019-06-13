import React from 'react';

import moment from 'moment';

import { Form, DatePicker } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
  label?: string;
  time?: boolean;
}

const NameInput: React.FC<IProps> = ({
  form,
  label,
  time,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const handleDisabled = (date) => {
    return date && date < moment().endOf('day');
  };

  const input: React.ReactNode = (
    <DatePicker
      showToday={false}
      showTime={{ format: 'HH:mm' }}
      format="DD/MM/YYYY HH:mm"
      disabledDate={handleDisabled}
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
