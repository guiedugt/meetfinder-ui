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
    preserve: false,
    rules: [{ required: true, message: 'Campo obrigatório.' }],
  });

  const add: (e: React.MouseEvent) => void = (e) => {
    form.getFieldDecorator(`subjects[${subjects.length}]`);
    form.setFieldsValue({ [`subjects[${subjects.length}]`]: '' });
  };

  const removeIcon: (i: number) => React.ReactNode = (i) => {
    const remove: () => void = () => {
      const subjects = form.getFieldValue('subjects');
      subjects.splice(i, 1);
      form.setFieldsValue({ subjects: subjects.filter((subject, i) => i !== (subjects.length - 1) ) });
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
      name="teste"
    />
  );

  const inputs: React.ReactNode[] = subjects.map((subject: ISubject, i: number) => {
    const name = subject && subject.name ? subject.name : subject;
    return fieldDecorator(`subjects[${i}]`, name)(input(i));
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

  console.log('subjects:', subjects);
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
