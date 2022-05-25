import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event'
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getPage } from "next-page-tester";
import { initTestHelpers } from "next-page-tester";

initTestHelpers();

describe("components/Layout.tsx", () => {
  test("正常系: ナビゲーションバーが正しく機能し、各ページに正しく遷移する。", async () => {
    const { page } = await getPage({
      route: "/index"
    })
    render(page);
    userEvent.click(await screen.getByTestId("search-nav"));
    expect(await screen.findByText("Search Books")).toBeInTheDocument();
    userEvent.click(await screen.getByTestId("collection-nav"));
    expect(await screen.findByText("Book Collection")).toBeInTheDocument();
    userEvent.click(await screen.getByTestId("signin-nav"));
    expect(await screen.findByText("Sign In")).toBeInTheDocument();
    // screen.debug();
  })
})
