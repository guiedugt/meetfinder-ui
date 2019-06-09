import React from 'react';

import { Form as AntdForm, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import SubmitButton from '../buttons/SubmitButton';

interface IProps extends FormComponentProps {
  loading: boolean;
  onSubmit: (values: { [key: string]: any }) => void;
}

const Form: React.FC<IProps> = ({
  form,
  loading,
  onSubmit,
  children,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) onSubmit(values);
    });
  };

  const childrenWithForm = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { form }),
  );

  return (
    <AntdForm onSubmit={handleSubmit}>
      <Spin spinning={loading}>
        {childrenWithForm}
        <SubmitButton loading={loading} />
      </Spin>
    </AntdForm>
  );
};

export default AntdForm.create<IProps>()(Form);
