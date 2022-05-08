import { BookModel } from "./BookModel";
import { UserModel } from "./UserModel";

export type ReturnCollectionType = {
  collectionId: number;
  author: UserModel;
  bookList: BookModel[];
  likeCount: number;
};
