declare global {
  interface IFieldDecorator {
    (id: string): (node: React.ReactNode) => React.ReactNode;
  }

  interface IOnSubmit {
    (values: { [key: string]: any }): void;
  }
}

export {};
