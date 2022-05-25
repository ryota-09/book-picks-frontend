import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";
import { getPage, initTestHelpers } from "next-page-tester";
import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";

initTestHelpers();

const handler = [
  rest.get("http://localhost:3001/db", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          collectionId: 1,
          author: {
            userId: 1,
            username: "テストname",
            email: "ex01@gmail.com",
            password: "password",
            avatatar: "テストavatar1",
            remarks: "テストremarks1",
          },
          bookList: [
            {
              bookId: 5,
              title: "テストtitle5",
              link: "テストlink5",
              sourceUrl: "テストurl5",
              connectId: 1,
            },
            {
              bookId: 6,
              title: "テストtitle6",
              link: "テストlink6",
              sourceUrl: "テストurl6",
              connectId: 1,
            },
          ],
          likeCount: 0,
        },
        {
          collectionId: 2,
          author: {
            userId: 2,
            username: "テストname",
            email: "ex02@gmail.com",
            password: "password",
            avatatar: "テストavatar2",
            remarks: "テストremarks2",
          },
          bookList: [
            {
              bookId: 1,
              title: "テストtitle1",
              link: "テストlink1",
              sourceUrl: "テストurl1",
              connectId: 2,
            },
            {
              bookId: 2,
              title: "テストtitle2",
              link: "テストlink2",
              sourceUrl: "テストurl2",
              connectId: 2,
            },
          ],
          likeCount: 0,
        },
      ])
    );
  }),
  rest.get("http://localhost:3001/db/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        collectionId: 1,
        author: {
          userId: 1,
          username: "テストname",
          email: "ex01@gmail.com",
          password: "password",
          avatatar: "テストavatar1",
          remarks: "テストremarks1",
        },
        bookList: [
          {
            bookId: 5,
            title: "テストtitle5",
            link: "テストlink5",
            sourceUrl: "テストurl5",
            connectId: 1,
          },
          {
            bookId: 6,
            title: "テストtitle6",
            link: "テストlink6",
            sourceUrl: "テストurl6",
            connectId: 1,
          },
        ],
        likeCount: 0,
      })
    );
  }),
  rest.get("http://localhost:3001/db/2", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        collectionId: 2,
        author: {
          userId: 2,
          username: "テストname",
          email: "ex02@gmail.com",
          password: "password",
          avatatar: "テストavatar2",
          remarks: "テストremarks2",
        },
        bookList: [
          {
            bookId: 1,
            title: "テストtitle1",
            link: "テストlink1",
            sourceUrl: "テストurl1",
            connectId: 2,
          },
          {
            bookId: 2,
            title: "テストtitle2",
            link: "テストlink2",
            sourceUrl: "テストurl2",
            connectId: 2,
          },
        ],
        likeCount: 0,
      })
    );
  }),
];

const server = setupServer(...handler);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe("collection/[id].tsx", () => {
  test("正常系: userId1のcollectionページが表示される。", async () => {
    const { page } = await getPage({
      route: "/collection/1"
    });
    render(page);

    expect(await screen.findByText("テストname's Collection")).toBeInTheDocument();
    expect(screen.getByText("テストtitle5")).toBeInTheDocument();
    expect(screen.getByText("テストtitle6")).toBeInTheDocument();
  })
})
