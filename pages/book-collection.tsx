import { GetStaticProps } from "next";

import { ReturnCollectionType } from "../types/BookCollection";
import { getAllCollections } from "../lib/fetch";
import Layout from "../components/Layout";
import Link from "next/link";

type StaticProps = {
  collectionData: ReturnCollectionType[];
};

const BookCollection: React.FC<StaticProps> = ({ collectionData }) => {
  return (
    <Layout title="Book Collection">
      <h2 className="text-3xl">Book Collection</h2>
      <div>
        {collectionData &&
          collectionData.map((collection) => (
            <div key={collection.collectionId}>
              <Link href={`/collection/${collection.collectionId}`}>
                <a className="text-purple-800 text-3xl" data-testid="collectionId">{collection.collectionId}</a>
              </Link>
              <p>username: {collection.author.username}</p>
              <p>likeCount: {collection.likeCount}</p>
              <hr />
              <p>BookList: </p>
              {collection.bookList.map((book) => (
                <div key={book.bookId}>
                  <p>title: {book.title}</p>
                  <p>
                    URL: <a href={book.sourceUrl}>{book.sourceUrl}</a>
                  </p>
                  <img src={book.imgPath} alt="" />
                </div>
              ))}
              <hr />
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default BookCollection;

export const getStaticProps: GetStaticProps = async () => {
  const collectionData = await getAllCollections();
  return {
    props: {
      collectionData,
    },
  };
};
