declare global {
  interface IWorkshop {
    id: string;
    date: Date;
    name: string;
    owner: IUser;
    poll: IPoll;
    subject: string;
    room: string;
  }
}

export {};
