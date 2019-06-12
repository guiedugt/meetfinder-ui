import React from 'react';

import moment from 'moment';

import { Form as AntdForm, Spin } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import SubmitButton from '../buttons/SubmitButton';

interface IProps extends FormComponentProps {
  loading: boolean;
  onSubmit: (values: { [key: string]: any }) => void;
  initialValues?: { [key: string]: any };
}

const Form: React.FC<IProps> = ({
  form,
  loading,
  children,
  onSubmit,
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

const momentKeys: string[] = ['deadline', 'date'];

const mapPropsToFields = (props: IProps) => {
  if (!props.initialValues) return;

  const initialValues: { [key: string]: any } =
    Object.entries(props.initialValues)
      .reduce(
        (values, [key, value]) => {
          return {
            ...values,
            [key]: AntdForm.createFormField({
              value: momentKeys.includes(key)
                ? moment(value)
                : value,
            }),
          };
        },
        {},
      );

  return initialValues;
};

export default AntdForm.create<IProps>({ mapPropsToFields })(Form);
