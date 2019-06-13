import React from 'react';

import { Form, Input, Button, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
}

const SubjectsInput: React.FC<IProps> = ({
  form,
}) => {
  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const subjects = form.getFieldValue('subjects') || [];

  const fieldDecorator: IFieldDecorator = (id, initialValue) => form.getFieldDecorator(id, {
    initialValue,
    normalize: value => value && value.name ? value.name : value,
    getValueFromEvent: e => ({ name: e.target.value }),
    rules: [{ required: true, message: 'Campo obrigatório.' }],
  });

  const add: (e: React.MouseEvent) => void = (e) => {
    form.getFieldDecorator(`subjects[${subjects.length}]`);
    form.setFieldsValue({ [`subjects[${subjects.length}]`]: '' });
  };

  const removeIcon: (i: number) => React.ReactNode = (i) => {
    const remove: () => void = () => {
      form.setFieldsValue({ [`subjects[${i}]`]: null });
    };

    return (
      <Icon
        type="delete"
        onClick={remove}
      />
    );
  };

  const input: (i: number) => React.ReactNode = i => (
    <Input
      key={i}
      type="text"
      placeholder="Nome do assunto"
      addonAfter={removeIcon(i)}
    />
  );

  const inputs: React.ReactNode[] = subjects.map((subject: ISubject, i: number) => {
    const name = subject && subject.name ? subject.name : subject;
    return subject !== null && fieldDecorator(`subjects[${i}]`, name)(input(i));
  });

  const addButton: React.ReactNode = (
    <Button
      block={true}
      type="dashed"
      icon="plus"
      onClick={add}
    >
      Adicionar Assunto
    </Button>
  );

  return (
    <Form.Item
      required={true}
      label="Assuntos"
    >
      {inputs}
      {addButton}
    </Form.Item>
  );
};

export default SubjectsInput;
