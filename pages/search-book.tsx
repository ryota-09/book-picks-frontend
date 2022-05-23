/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BookInfo } from "../types/BookInfo";

import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import { useCurrentUser } from "../lib/useCurrentUser";
import Loading from "../components/Loading";

type ScrapingResponseType = {
  sourceUrl: string;
  bookInfoList: BookInfo[];
};

const SearchBook = () => {
  const [searchText, setSearchText] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [bookInfoList, setBookInfoList] = useState<BookInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userState } = useCurrentUser();

  const changeText = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const scrapingText = async () => {
    setIsLoading(true);
    const response = await axios.post("http://localhost:3001/scraping", {
      searchText: searchText,
    });
    setSourceUrl(response.data.url);
    setBookInfoList(response.data.bookInfoList);
    setIsLoading(false);
  };

  const saveToDb = async (bookInfo: BookInfo) => {
    const response = await axios.patch("http://localhost:3001/db/addBook", {
      userId: userState.currentUser.userId,
      title: bookInfo.title,
      link: bookInfo.link,
      imgPath: bookInfo.src,
      sourceUrl: sourceUrl,
    });
    console.log("responseデータ", response.data);
  };

  return (
    <Layout title="Search Book">
      <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
        Search Books
      </h2>
      <div className="flex flex-1 justify-center items-center flex-col w-screen">
        <p>例: フロントエンドエンジニア　本</p>
        <input
          type="text"
          className="bg-gray-200 m-5 rounded w-6/12"
          placeholder="検索キーワード"
          onChange={changeText}
        />
        <button
          className="bg-gray-500 text-white p-3 rounded"
          type="button"
          onClick={scrapingText}
        >
          検索
        </button>
        <hr />
        <br />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="bg-white py-6 sm:py-8 lg:py-12">
            <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 xl:gap-8">
                {bookInfoList.map((bookInfo, index) => (
                  <div
                    className="flex flex-col md:flex-row items-center border overflow-hidden"
                    key={index}
                  >
                    <a
                      href={bookInfo.link}
                      className="group w-full md:w-32 lg:w-48 h-48 md:h-full block self-start shrink-0 bg-gray-100 overflow-hidden relative"
                    >
                      <img
                        src={bookInfo.src}
                        loading="lazy"
                        alt="Photo by Minh Pham"
                        className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
                      />
                    </a>

                    <div className="flex flex-col gap-2 p-4 lg:p-6">
                      <span className="text-gray-400 text-sm">Title:</span>

                      <h2 className="text-gray-800 text-xl font-bold">
                        <a
                          href={bookInfo.link}
                          className="hover:text-indigo-500 active:text-indigo-600 transition duration-100"
                        >
                          {bookInfo.title}
                        </a>
                      </h2>

                      <p className="text-gray-500">引用URL:</p>

                      <div className="mb-5">
                        <a
                          href={sourceUrl}
                          className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100"
                        >
                          {sourceUrl}
                        </a>
                      </div>
                      <button
                        className="bg-indigo-500 text-white p-3 rounded"
                        type="button"
                        onClick={() => saveToDb(bookInfo)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default SearchBook;
