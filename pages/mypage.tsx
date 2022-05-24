/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Edit from "../components/Edit";
import Layout from "../components/Layout";
import { useCurrentUser } from "../lib/useCurrentUser";
import Cookie from "universal-cookie";

import { ReturnCollectionType } from "../types/BookCollection";

const cookie = new Cookie();

const axiosFetcher = async (userId: string) => {
  const response = await axios.get<ReturnCollectionType>(
    `http://localhost:3001/db/${userId}`
  );
  return response.data;
};

const MyPage: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { userState, setUserState } = useCurrentUser();
  const router = useRouter();

  const { data: collection, error } = useSWR(
    String(userState.currentUser.userId),
    axiosFetcher
  );

  if (error) {
    router.push("/signin-page");
  }

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const deleteBook = async (bookId: number) => {
    try {
      const response = await axios.delete("http://localhost:3001/db/delete", {
        data: {
          bookId: bookId,
        },
      });
      const updatedList =
        userState.currentUser.userBookCollection.bookList.filter(
          (book) => book.bookId !== bookId
        );
      if (response.status === 201) {
        setUserState({
          type: "SET_BOOKLIST",
          payload: {
            bookList: updatedList,
          },
        });
      }
    } catch {
      alert("エラーが発生");
    }
  };

  useEffect(() => {
    const token = cookie.get("access_token");
    if (!token) {
      router.push("/signin-page");
    }
  }, []);

  return (
    <>
      <Layout title="My Page">
        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
          My Page
        </h2>
        {collection && (
          <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
            <a
              href="#"
              className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative"
            >
              {userState.currentUser.avatatar === "" ? (
                <img
                  src="/img/avatar.jpeg"
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  className="w-full h-full object-cover object-center absolute inset-0 transition duration-200"
                />
              ) : (
                <img
                  src={userState.currentUser.avatatar}
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  className="w-full h-full object-cover object-center absolute inset-0 transition duration-200"
                />
              )}
            </a>
            <div className="flex flex-col gap-2">
              <span className="text-gray-400 text-xs">Username:</span>

              <h2 className="text-gray-800 text-xl font-bold">
                <p className="hover:text-indigo-500 active:text-indigo-600 transition duration-100">
                  {collection.author.username}
                </p>
              </h2>
              <p className="text-gray-400 text-xs">ひとこと:</p>
              <p className="text-gray-700 text-md">
                {userState.currentUser.remarks}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={toggleIsEdit}
          type="button"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3 mt-10"
        >
          {!isEdit ? "編集モード" : "編集画面を閉じる"}
        </button>
        <Edit isEdit={isEdit} setIsEdit={setIsEdit} />
        <div className="bg-white py-6 sm:py-8 lg:py-12">
          <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 xl:gap-8">
              {collection &&
                collection.bookList.map(
                  (book, index) => (
                    <div
                      className="flex flex-col md:flex-row items-center border overflow-hidden"
                      key={index}
                    >
                      <a
                        href={book.link}
                        className="group w-full md:w-32 lg:w-48 h-48 md:h-full block self-start shrink-0 bg-gray-100 overflow-hidden relative"
                      >
                        <img
                          src={book.imgPath}
                          loading="lazy"
                          alt="Photo by Minh Pham"
                          className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
                        />
                      </a>

                      <div className="flex flex-col gap-2 p-4 lg:p-6">
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

                        <div className="mb-5">
                          <a
                            href={book.sourceUrl}
                            className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100"
                          >
                            {book.sourceUrl}
                          </a>
                        </div>
                        {isEdit ? (
                          <button
                            className="bg-red-500 text-white p-3 rounded"
                            type="button"
                            onClick={() => deleteBook(book.bookId)}
                          >
                            Delete
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  )
                )}
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
export default MyPage;
