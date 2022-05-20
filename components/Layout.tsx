import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

type TITLE  = {
  title: string
}
const Layout: React.FC<TITLE> = ({ children, title = 'Nextjs' }) => {
  return (
    <div className="flex items-center flex-col min-h-screen font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
            <Link href="/search-book">
                <a
                  data-testid="admin-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Search
                </a>
              </Link>
              <Link href="/book-collection">
                <a
                  data-testid="admin-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Collection
                </a>
              </Link>
              <Link href="/mypage">
                <a
                  data-testid="blog-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  MyPage
                </a>
              </Link>
              <Link href="/admin-page">
                <a
                  data-testid="admin-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  SignIn
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 items-center flex-col w-screen">
        {children}
      </main>
      <footer className="w-full h-12 flex justify-center items-center border-t">
          &copy; &nbsp; 2022
      </footer>
    </div>
  )
}
export default Layout
