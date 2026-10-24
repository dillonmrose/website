import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
// Not a React hook despite the name: it returns the static component map.
import { Terminal, useMDXComponents as mdxComponents } from "./mdx-components";

vi.mock("next-view-transitions", () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-view-transition {...props}>
      {children}
    </a>
  ),
}));

const c = mdxComponents();
const A = c.a as (props: { href?: string; children?: React.ReactNode }) => React.ReactElement;

describe("MDX links", () => {
  it("opens external links in a new tab without a referrer", () => {
    render(<A href="https://example.com">Out</A>);
    const link = screen.getByRole("link", { name: "Out" });
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("routes site links through the view-transition Link", () => {
    render(<A href="/blog">Blog</A>);
    expect(screen.getByRole("link", { name: "Blog" }).hasAttribute("data-view-transition")).toBe(true);
  });

  it("keeps in-page anchors as plain links in the same tab", () => {
    render(<A href="#top">Top</A>);
    const link = screen.getByRole("link", { name: "Top" });
    expect(link.hasAttribute("target")).toBe(false);
    expect(link.hasAttribute("data-view-transition")).toBe(false);
  });

  it("renders links to .png files as images, using the link text as alt", () => {
    render(<A href="/diagram.png">Diagram</A>);
    expect(screen.getByRole("img", { name: "Diagram" }).getAttribute("src")).toBe("/diagram.png");
  });

  it("gives a .PNG link with non-text content an empty alt", () => {
    const { container } = render(
      <A href="/x.PNG">
        <span>x</span>
      </A>,
    );
    expect(container.querySelector("img")?.getAttribute("alt")).toBe("");
  });
});

describe("MDX elements", () => {
  it("styles every element override", () => {
    const tags = ["h1", "h2", "h3", "h4", "h5", "p", "ol", "ul", "li", "em", "strong", "blockquote"] as const;
    for (const tag of tags) {
      const El = c[tag] as (props: { children: string }) => React.ReactElement;
      const { container } = render(<El>{tag}</El>);
      expect(container.querySelector(tag)?.className).not.toBe("");
    }
  });

  it("defaults images to full width and keeps a given class", () => {
    const Img = c.img as (props: React.ComponentProps<"img">) => React.ReactElement;
    render(<Img src="/a.png" alt="a" />);
    render(<Img src="/b.png" alt="b" className="w-1/2" />);
    expect(screen.getByAltText("a").className).toContain("w-full");
    expect(screen.getByAltText("b").className).toContain("w-1/2");
  });

  it("renders Terminal lines as shell prompts", () => {
    render(<Terminal lines={["pnpm dev", "pnpm build"]} />);
    expect(screen.getAllByText("$")).toHaveLength(2);
    expect(screen.getByText("pnpm build")).toBeTruthy();
  });
});
