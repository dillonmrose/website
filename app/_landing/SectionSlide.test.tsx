import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionSlide } from "./SectionSlide";
import type { Section } from "./sections";

const section: Section = {
  name: "Copilot",
  role: "Engineer",
  dates: "2023",
  bullets: [],
  imageGroups: [["/a.png", "/b.png"]],
};
const base = {
  section,
  images: ["/a.png", "/b.png"],
  bullets: ["Shipped it", { text: "Led a team", sub: ["Fixed CI", "Cleaned flags"] }],
  imageClass: "max-h-[40vh] rounded",
  stat: "40M users",
  pt: "pt-0",
};

describe("SectionSlide", () => {
  it("renders bullets, nested bullets, the stat and every image", () => {
    render(<SectionSlide {...base} />);
    for (const text of ["Shipped it", "Led a team", "Fixed CI", "Cleaned flags", "40M users"]) {
      expect(screen.getByText(text)).toBeTruthy();
    }
    expect(screen.getAllByRole("img", { name: "Copilot" })).toHaveLength(2);
  });

  it("shows only the first image, enlarged, for a mobile image slide", () => {
    render(<SectionSlide {...base} subType="image" />);
    const [img] = screen.getAllByRole("img");
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(img.getAttribute("src")).toBe("/a.png");
    expect(img.className).toContain("max-h-[65vh]");
  });

  it("shows text without images for a mobile text slide, and no stat when there is none", () => {
    render(<SectionSlide {...base} stat={null} subType="text" />);
    expect(screen.queryAllByRole("img")).toHaveLength(0);
    expect(screen.queryByText("40M users")).toBeNull();
  });
});
