import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";

import { getAllCollectionIds, getCollectionData } from "../../lib/fetch";
import { ReturnCollectionType } from "../../types/BookCollection";

const CollectionDetail: React.FC<ReturnCollectionType> = ({
  collectionId,
  author,
  bookList,
  likeCount,
}) => {
  return (
    <>
      <Layout title="Single Collection Page">
        <h1 className="text-3xl text-center mt-8 mb-8">Single Collection Page</h1>
        <p>username: {author.username}</p>
        <p>ひとこと: {author.remarks}</p>
          {bookList.map((book, index) => (
            <div key={book.bookId}>
              <p>{index}: {book.title}</p>
              <p>
                URL: <a href={book.sourceUrl}>{book.sourceUrl}</a>
              </p>
              <img src={book.imgPath} alt="" />
            </div>
          ))}
        <Link href="/book-collection">
          <div className="flex cursor-pointer mt-12">
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <a data-testid="back-blog">Back to collection-page</a>
          </div>
        </Link>
      </Layout>
    </>
  );
};
export default CollectionDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCollectionIds();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const collection = await getCollectionData(context.params.id as string);
  return {
    props: {
      ...collection,
    },
  };
};
