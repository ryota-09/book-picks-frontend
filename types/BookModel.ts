import { BookCollectionModel } from "./BookCollectionModel";

export type BookModel = {
  bookId: number;
  title: string;
  link: string;
  imgPath: string;
  sourceUrl: string;
  connectId: number;
  connectCollection: BookCollectionModel;
};
