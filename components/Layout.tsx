import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookie from "universal-cookie";
import { useCurrentUser } from "../lib/useCurrentUser";
import { useState } from "react";
import SuccessToast from "./SuccessToast";

const cookie = new Cookie();

type TITLE = {
  title: string;
};
const Layout: React.FC<TITLE> = ({ children, title = "Nextjs" }) => {
  const [canShow, setCanShow] = useState(false);
  const [isOpen , setIsOpen] = useState(false);

  const { setUserState } = useCurrentUser();
  const router = useRouter();
  const logout = () => {
    cookie.remove("access_token");
    setUserState({
      type: "INITIALIZE_USER_STATE",
      payload: {
        currentUser: {
          userId: 0,
          username: "",
          email: "",
          password: "",
          avatatar: "",
          remarks: "",
          userBookCollection: {
            collectionId: 0,
            authorId: 0,
            author: null,
            bookList: [],
            likeCount: 0,
          },
        },
        isLogin: false,
      },
    });
    setCanShow(!canShow);
    setTimeout(() => {
      router.push("/book-collection");
    }, 600);
  };
  return (
    <>
      <div className="flex items-center flex-col min-h-screen">
        <Head>
          <title>{title}</title>
        </Head>
        {canShow ? (
          <SuccessToast
            canShow={canShow}
            setCanShow={setCanShow}
            displayText="ログアウトに成功しました！"
          />
        ) : (
          ""
        )}
        <div className="bg-white lg:pb-12">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <header className="flex justify-between items-center py-4 md:py-8">
              {/* <!-- logo - start --> */}
              <a
                href="#"
                className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
                aria-label="logo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                Book Picks
              </a>
              {/* <!-- logo - end --> */}

              {/* <!-- nav - start --> */}
              <nav className="hidden lg:flex gap-12">
                <Link href="/search-book">
                  <a
                    data-testid="search-nav"
                    className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    Search
                  </a>
                </Link>
                <Link href="/book-collection">
                  <a
                    data-testid="collection-nav"
                    className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    Collection
                  </a>
                </Link>
                <Link href="/mypage">
                  <a
                    data-testid="mypage-nav"
                    className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
                  >
                    MyPage
                  </a>
                </Link>
              </nav>
              {/* <!-- nav - end --> */}

              {/* <!-- buttons - start --> */}
              <div className="hidden lg:flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5 -ml-8">
                <Link href="/signin-page">
                  <a
                    data-testid="signin-nav"
                    className="inline-block focus-visible:ring ring-indigo-300 text-gray-500 hover:text-indigo-500 active:text-indigo-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3"
                  >
                    Sign in
                  </a>
                </Link>
                <Link href="#">
                  <a
                    onClick={logout}
                    data-testid="signout-nav"
                    className="inline-block focus-visible:ring ring-indigo-300 text-gray-500 hover:text-indigo-500 active:text-indigo-600 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3"
                  >
                    Sign out
                  </a>
                </Link>
                <Link href="/signup-page">
                  <a
                    data-testid="signup-nav"
                    className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                  >
                    Sign up
                  </a>
                </Link>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
              >
                {isOpen ? "×" : "Menu"}
              </button>
            </header>
            {isOpen && 
            <ul className="absolute z-10 bg-white">
  <li className="border-b"><Link href="/search-book"><a className="block px-8 py-2 my-4 hover:bg-gray-400 hover:text-white rounded">Search</a></Link></li>
  <li className="border-b"><Link href="/book-collection"><a className="block px-8 py-2 my-4 hover:bg-gray-400 hover:text-white rounded">Collection</a></Link></li>
  <li className="border-b"><Link href="/mypage"><a className="block px-8 py-2 my-4 hover:bg-gray-400 hover:text-white rounded">MyPage</a></Link></li>
  <li className="border-b"><Link href="/signin-page"><a className="block px-8 py-2 my-4 hover:bg-gray-400 hover:text-white rounded">Sign in</a></Link></li>
  <li className="border-b"><Link href="#"><a onClick={logout} className="block px-8 py-2 my-4 hover:bg-gray-400 hover:text-white rounded">Sign out</a></Link></li>
  <li className="border-b"><Link href="/signup-page"><a className="block px-8 py-2 my-4 hover:bg-indigo-400 hover:text-white rounded">Sign up</a></Link></li>
</ul>
            
            }
          </div>
          <main className="flex flex-1 items-center flex-col w-screen">
            {children}
          </main>
        </div>
      </div>
      <footer className="w-full h-12 flex justify-center items-center border-t">
        <a
          className="flex items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {/* <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" /> */}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </>
  );
};
export default Layout;
