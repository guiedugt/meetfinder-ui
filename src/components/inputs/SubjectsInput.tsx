import React, { useState } from 'react';

import { Form, Input, Button, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';

interface IProps {
  form?: WrappedFormUtils;
}

const SubjectsInput: React.FC<IProps> = ({
  form,
}) => {
  const [fields, setFields] = useState<React.ReactNode[]>([
    <Input
      key={0}
      type="text"
      placeholder="Nome do assunto"
    />,
  ]);

  if (!form) {
    throw new Error('Input must be wrapped in a Form component');
  }

  const fieldDecorator: IFieldDecorator = id => form.getFieldDecorator(id, {
    rules: [
      { required: true, message: 'Campo obrigatório.' },
    ],
  });

  const add: (e: React.MouseEvent) => void = (e) => {
    setFields([...fields, input(fields.length)]);
  };

  const removeIcon: (i: number) => React.ReactNode = (i) => {
    if (fields.length <= 1) return null;

    const remove: () => void = () => {
      const subjects = form.getFieldValue('subjects');
      subjects.splice(i, 1);
      fields.splice(i, 1);
      form.setFieldsValue({ subjects });
      setFields([...fields]);
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

  const inputs: React.ReactNode[] = fields.map((field, i) => (
    fieldDecorator(`subjects[${i}]`)(input(i))
  ));

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
