import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { TopNav } from "./TopNav";

it("links the name home and lists Home, Blog and Projects", () => {
  render(<TopNav />);
  const links = screen.getAllByRole("link");
  expect(links.map((l) => [l.textContent, l.getAttribute("href")])).toEqual([
    ["Dillon Rose", "/"],
    ["Home", "/"],
    ["Blog", "/blog"],
    ["Projects", "/projects"],
  ]);
});
