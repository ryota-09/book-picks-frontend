import { BookModel } from "./BookModel";
import { UserModel } from "./UserModel";

export type BookCollectionModel = {
  collectionId: number;
  authorId: number;
  author: UserModel;
  bookList: BookModel[];
  likeCount: number;
};
