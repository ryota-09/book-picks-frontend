import axios from "axios";
import useSWR from "swr";
import Layout from "../components/Layout";

import { ReturnCollectionType } from "../types/BookCollection";

const axiosFetcher = async () => {
  const response = await axios.get<ReturnCollectionType>(
    `http://localhost:3001/db/1`
  );
  return response.data;
};

const MyPage: React.FC = () => {
  const { data: collection, error } = useSWR("myPageData", axiosFetcher);

  if (error) {
    return <span>エラー発生!</span>;
  }

  return (
    <>
      <Layout title="My Page">
        <h2 className="text-3xl">My Page</h2>
        {collection && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="md:shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-48"
                  src="/img/avatar.jpeg"
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  username:
                </div>
                <h3 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                  {collection.author.username}
                </h3>
                <p className="mt-2 text-slate-500">
                  {collection.author.remarks}
                </p>
              </div>
            </div>
            <br />
            <h2 className="text-2xl mb-10 flex flex-1 items-center flex-col">My Book List</h2>
            {collection.bookList.map((book, index) => (
              <div className="md:flex mb-10" key={book.bookId}>
                <div className="md:flex-shrink-0 ml-5">
                  <img
                    className="h-48 w-full object-cover md:h-full md:w-48"
                    src={book.imgPath}
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                    No.{index + 1}
                  </div>
                  <a
                    href={book.link}
                    className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
                  >
                    {book.title}
                  </a>
                  <p className="mt-2 text-gray-600">
                    掲載ページURL:
                    <a
                      href={book.sourceUrl}
                      className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
                    >
                      {book.sourceUrl}
                    </a>
                  </p>
                </div>
                <br />
              </div>
            ))}
          </div>
        )}
      </Layout>
    </>
  );
};
export default MyPage;
