/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";

import { ReturnCollectionType } from "../types/BookCollection";
import { getAllCollections, getCollectionData } from "../lib/fetch";
import Layout from "../components/Layout";
import Link from "next/link";
import LikeCount from "../components/LikeCount";




type StaticProps = {
  collectionData: ReturnCollectionType[];
};

const BookCollection: React.FC<StaticProps> = ({ collectionData }) => {
  return (
    <Layout title="Book Collection">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
          {/* <!-- text - start --> */}
          <div className="mb-10 md:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              Book Collection
            </h2>
            {/* <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
              This is a section of some simple filler text, also known as
              placeholder text. It shares some characteristics of a real written
              text but is random or otherwise generated.
            </p> */}
          </div>
          {/* <!-- text - end --> */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-12 xl:gap-16">
            {/* <!-- article - start --> */}
            {collectionData &&
              collectionData.map((collection) => (
                <div
                  className="flex flex-col md:flex-row items-center gap-4 lg:gap-6"
                  key={collection.collectionId}
                >
                  <Link href={`/collection/${collection.collectionId}`}>
                    <a className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative">
                      {collection.author.avatatar === "" ? (
                        <img
                          src="/img/avatar.jpeg"
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
                        />
                      ) : (
                        <img
                          src={collection.author.avatatar}
                          loading="lazy"
                          className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
                        />
                      )}
                    </a>
                  </Link>

                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 text-sm">Collection:</span>

                    <Link href={`/collection/${collection.collectionId}`}>
                      <a className="hover:text-indigo-500 active:text-indigo-600 transition duration-100 text-gray-800 text-xl font-bold">
                        {collection.author.username}
                        {"'s Collection"}
                      </a>
                    </Link>

                    {collection.bookList.map((book) => (
                      <div key={book.bookId}>
                        <p className="text-gray-500 mb-2 text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                          {book.title}
                        </p>
                      </div>
                    ))}
                    <LikeCount
                      collectionId={collection.collectionId}
                      likeCount={collection.likeCount}
                    />
                    <Link href={`/collection/${collection.collectionId}`}>
                      <a
                        className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100"
                        data-testid="collection-id"
                      >
                        More
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            {/* <!-- article - end --> */}
          </div>
        </div>
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
