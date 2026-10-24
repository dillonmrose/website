import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import BlogLayout from "./blog/layout";
import ProjectsLayout from "./projects/layout";

it.each([
  ["blog", BlogLayout],
  ["projects", ProjectsLayout],
])("the %s layout renders its page", (_, Layout) => {
  render(
    <Layout>
      <p>page</p>
    </Layout>,
  );
  expect(screen.getByText("page")).toBeTruthy();
});
