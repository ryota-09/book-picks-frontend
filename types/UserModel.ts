import { BookCollectionModel } from "./BookCollectionModel";

export type UserModel = {
  userId: number;
  username: string;
  email: string;
  password: string;
  avatatar: string;
  remarks: string;
  userBookCollection: BookCollectionModel;
};
