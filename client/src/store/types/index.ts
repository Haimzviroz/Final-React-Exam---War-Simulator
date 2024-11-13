export interface User {
  _id?: string;
  username: string;
  password: string;
  isIdf: boolean;
  location: string | null;
  name: string;
  resources?: [{ name: string; amount: number }];
}


export interface RootState {
  user: User;
}
