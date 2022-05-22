import { GetStaticProps } from "next";

import { ReturnCollectionType } from "../types/BookCollection";
import { getAllCollections, getCollectionData } from "../lib/fetch";
import Layout from "../components/Layout";
import Link from "next/link";

type StaticProps = {
  collectionData: ReturnCollectionType[];
};

const BookCollection: React.FC<StaticProps> = ({ collectionData }) => {
  return (
    <Layout title="Book Collection">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
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

          {collectionData &&
            collectionData.map((collection) => (
              <div
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 xl:gap-16"
                key={collection.collectionId}
              >
                <div className="flex gap-4 md:gap-6">
                  <div className="w-12 md:w-14 h-12 md:h-14 flex justify-center items-center shrink-0 text-white rounded-lg md:rounded-xl shadow-lg">
                    {collection.author.avatatar === "" ? (
                      <img src="/img/avatar.jpeg" alt="" />
                    ) : (
                      <img src={collection.author.avatatar} />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      {collection.author.username}
                      {"'s Collection"}
                    </h3>
                    <ul>
                      {collection.bookList.map((book) => (
                        <li
                          className="text-gray-500 mb-2 text-xs"
                          key={book.bookId}
                        >
                          ・{book.title}
                        </li>
                      ))}
                    </ul>
                    <p className="font-semibold mb-2">
                      🌟 &nbsp;{collection.likeCount}
                    </p>
                    <Link href={`/collection/${collection.collectionId}`}>
                      <a
                        className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100"
                        data-testid="collectionId"
                      >
                        More
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
