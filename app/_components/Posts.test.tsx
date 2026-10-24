import path from "node:path";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPosts, Posts } from "./Posts";

const fixtures = path.join(__dirname, "__fixtures__");

describe("getPosts", () => {
  beforeEach(() => {
    vi.spyOn(process, "cwd").mockReturnValue(fixtures);
  });

  it("lists posts newest first by sortDate, hiding drafts", () => {
    const names = getPosts("posts").map((p) => p.name);
    expect(names.slice(0, 2)).toEqual(["Newer Post", "Older Post"]);
    expect(names).not.toContain("Draft");
  });

  it("derives a title from the folder name when meta has none or is missing", () => {
    const names = getPosts("posts").map((p) => p.name);
    expect(names).toContain("Book Review: Some Book");
    expect(names).toContain("No Meta Post");
    expect(names).toContain("Bad Meta");
  });

  it("links each post under its directory", () => {
    const newer = getPosts("posts").find((p) => p.name === "Newer Post");
    expect(newer).toMatchObject({ path: "/posts/newer_post", date: "Feb 2025", sortDate: "2025-02-01" });
  });

  it("returns no posts when the directory doesn't exist", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(getPosts("missing")).toEqual([]);
    expect(error).toHaveBeenCalled();
  });
});

describe("Posts", () => {
  it("renders a link per post, with its date when it has one", () => {
    vi.spyOn(process, "cwd").mockReturnValue(fixtures);
    render(<Posts directoryName="posts" />);
    expect(screen.getByRole("link", { name: "Newer Post" })).toHaveProperty("pathname", "/posts/newer_post");
    expect(screen.getByText("Feb 2025")).toBeTruthy();
    expect(screen.getAllByRole("link")).toHaveLength(5);
  });
});
