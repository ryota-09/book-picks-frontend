/* eslint-disable @next/next/no-img-element */
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
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              BookList Page
            </h2>
            {collectionId && (
              <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
                <a
                  href="#"
                  className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative"
                >
                  {author.avatatar === "" ? (
                    <img
                      src="/img/avatar.jpeg"
                      loading="lazy"
                      alt="Photo by Minh Pham"
                      className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
                    />
                  ) : (
                    <img
                      src={author.avatatar}
                      loading="lazy"
                      alt="Photo by Minh Pham"
                      className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
                    />
                  )}
                </a>
                <div className="flex flex-col gap-2">
                  <span className="text-gray-400 text-sm">Username:</span>

                  <h2 className="text-gray-800 text-xl font-bold">
                    <p className="hover:text-indigo-500 active:text-indigo-600 transition duration-100">
                      {author.username}
                    </p>
                  </h2>

                  <p className="text-gray-500">{author.remarks}</p>
                </div>
              </div>
            )}
            <div className="bg-white py-6 sm:py-8 lg:py-12">
              <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
                {bookList.map((book) => (
                  <div
                    className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-12 xl:gap-16"
                    key={book.bookId}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-2 lg:gap-6">
                      <a
                        href={book.link}
                        className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative"
                      >
                        <img
                          src={book.imgPath}
                          loading="lazy"
                          alt="Photo by Minh Pham"
                          className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
                        />
                      </a>

                      <div className="flex flex-col gap-2">
                        <span className="text-gray-400 text-sm">Title:</span>

                        <h2 className="text-gray-800 text-xl font-bold">
                          <a
                            href={book.link}
                            className="hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                          >
                            {book.title}
                          </a>
                        </h2>

                        <p className="text-gray-500">引用URL:</p>

                        <div>
                          <a
                            href={book.sourceUrl}
                            className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100"
                          >
                            {book.sourceUrl}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
