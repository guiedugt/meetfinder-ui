declare global {
  interface IPoll {
    id: string;
    deadline: Date;
    name: string;
    owner: IUser;
    subjects: [{
      name: string;
      voters: IUser[];
    }];
  }
}

export {};
