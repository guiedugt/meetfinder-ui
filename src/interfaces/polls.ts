declare global {
  interface IPoll {
    id: string;
    deadline: Date;
    name: string;
    owner: IUser;
    subjects: ISubject[];
  }

  interface ISubject {
    id: string;
    name: string;
    voters: IUser[];
  }
}

export {};
