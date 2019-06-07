declare global {
  interface IFieldDecorator {
    (id: string): (node: React.ReactNode) => React.ReactNode;
  }
}

export {};
