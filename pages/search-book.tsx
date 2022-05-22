import axios from "axios";
import { ChangeEvent, useState } from "react";
import { BookInfo } from "../types/BookInfo";

import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";

type ScrapingResponseType = {
  sourceUrl: string;
  bookInfoList: BookInfo[];
};

const SearchBook = () => {
  const [searchText, setSearchText] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [bookInfoList, setBookInfoList] = useState<BookInfo[]>([]);

  const changeText = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const scrapingText = async () => {
    const response = await axios.post("http://localhost:3001/scraping", {
      searchText: searchText,
    });
    console.log(response.data);
    setSourceUrl(response.data.url);
    setBookInfoList(response.data.bookInfoList);
  };

  const saveToDb = async (bookInfo: BookInfo) => {
    const response = await axios.patch("http://localhost:3001/db/addBook", {
      userId: 4,
      title: bookInfo.title,
      link: bookInfo.link,
      imgPath: bookInfo.src,
      sourceUrl: sourceUrl,
    });
    console.log("responseデータ", response.data);
  };

  return (
    <Layout title="Search Book">
      <h2 className="text-3xl mb-10">Search Book</h2>
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
        {bookInfoList.map((bookInfo, index) => (
          <div key={index}>
            <p>{bookInfo.title}</p>
            {bookInfo.src ? <img src={bookInfo.src} alt="" /> : "画像なし"}
            <a href={bookInfo.link}>{bookInfo.title}</a>
            <p>URL: </p>
            <Link href={sourceUrl}>
              <a>{sourceUrl}</a>
            </Link>
            <br />
            <button
              className="bg-blue-500 text-white p-3 rounded"
              type="button"
              onClick={() => saveToDb(bookInfo)}
            >
              保存
            </button>
            <hr />
          </div>
        ))}
      </div>
    </Layout>
  );
};
export default SearchBook;
