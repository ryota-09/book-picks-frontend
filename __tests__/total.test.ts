import puppeteer from "puppeteer";
import { rest } from "msw";
import { setupServer } from "msw/node";

let browser: puppeteer.Browser;
let page: puppeteer.Page;

const handler = [
  rest.post("http://localhost:3001/auth/login", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: "test token",
        user: {
          userId: 1,
          username: "テストname",
          email: "ex@gmail.com",
          password: "テストpassword",
          avatartar: "テストavatar",
          remarks: "テストremarks",
          userBookCollection: {
            collectionId: 1,
            authorId: 1,
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
            likeCount: 1,
          },
        },
      })
    );
  }),
];

const server = setupServer(...handler);
beforeAll(() => {
  server.listen();
});
beforeEach(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.waitForTimeout(1000);
}, 5000);

afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe("E2Eテスト", () => {
  test("正常系: ログインしてからscrapingページで書籍情報を取得する。", async () => {
    await page.goto("http://localhost:3000/signin-page", {
      waitUntil: ["load"],
    });
    await page.waitForSelector("#email-area");
    await page.type("#email-area", "ex@gmail.com");
    await page.waitForSelector("#password-area");
    await page.type("#password-area", "ex@gmail.com");
    await page.click("submit-button");
    await page.waitForSelector("#search-area");
    const targetUrl = await page.url();
    await page.screenshot({ path: ".screenshots/signin_scraping.png" });
    expect(targetUrl).toBe("http://localhost:3000/search-book");
  });
});
