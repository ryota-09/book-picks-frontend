import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";

initTestHelpers();

const server = setupServer(
  rest.get("http://localhost:3001/db", (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json([
        {
          collectionId: 1,
          author: {
            userId: 1,
            username: "テストname",
            email: "ex01@gmail.com",
            password: "password",
            avatatar: "テストavatar",
            remarks: "テストremarks",
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
      ])
    );
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "bypass" });
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe("pages/BookCollection.tsx", () => {
  test("正常系: フェッチしたデータが正しくレンダリングされる。", async () => {
    const { page } = await getPage({
      route: "/book-collection",
    });

    render(page);
    expect(await screen.findByText("Book Collection")).toBeInTheDocument();
    expect(screen.getByText("username: テストname")).toBeInTheDocument();
    expect(screen.getByText("title: テストtitle6")).toBeInTheDocument();
  });

  test("正常系: 個別のBookListページに正しく遷移する", async () => {
    const { page } = await getPage({
      route: "/book-collection",
    });

    render(page);
    expect(await screen.findByText("Book Collection")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("collectionId"));
    expect(await screen.findByText("Single Collection Page")).toBeInTheDocument();
  })
});
