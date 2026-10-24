import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { flatSlides } from "./_landing/sections";
import HomePage from "./page";

const dots = () => screen.getAllByRole("button", { name: /Go to slide/ });
const activeDot = () => dots().findIndex((d) => d.className.includes("scale-150"));
// The persistent header's heading; each slide also has an invisible spacer copy.
const heading = () =>
  screen.queryAllByRole("heading", { level: 2 }).find((h) => !h.className.includes("invisible"))?.textContent;
// The one slide wrapper on top (Slide sets z-index 1 only on the active slide).
const activeSlide = () => {
  const active = [...document.querySelectorAll<HTMLElement>("div")].filter((d) => d.style.zIndex === "1");
  expect(active).toHaveLength(1);
  return active[0];
};
const showsImageHalf = () => activeSlide().querySelector("img")?.className.includes("max-h-[65vh]") ?? false;
const wait = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const wheel = (deltaY: number) => fireEvent.wheel(window, { deltaY });
const swipe = (fromY: number, toY: number) => {
  fireEvent.touchStart(window, { touches: [{ clientY: fromY }] });
  fireEvent.touchEnd(window, { changedTouches: [{ clientY: toY }] });
};

function setWidth(width: number) {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: width });
}

beforeEach(() => {
  vi.useFakeTimers();
  setWidth(1280);
});
afterEach(() => vi.useRealTimers());

describe("landing page on desktop", () => {
  it("starts on the hero with one dot per slide", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain("Hi, I'm Dillon.");
    expect(dots()).toHaveLength(1 + flatSlides.length);
    expect(activeDot()).toBe(0);
  });

  it("advances one slide per wheel gesture and shows the section heading", () => {
    render(<HomePage />);
    wheel(5); // too small to count
    expect(activeDot()).toBe(0);
    wheel(100);
    wheel(100); // ignored while the move is locked
    expect(activeDot()).toBe(1);
    wait(400);
    expect(heading()).toBe(flatSlides[0].section.name);
    wait(600);
    wheel(-100);
    expect(activeDot()).toBe(0);
    wait(400);
    expect(screen.queryByText(flatSlides[0].section.role)).toBeNull();
  });

  it("jumps with the dots and steps with the scroll arrow until the last slide", () => {
    render(<HomePage />);
    fireEvent.click(dots()[flatSlides.length - 1]);
    expect(activeDot()).toBe(flatSlides.length - 1);
    wait(1000);
    fireEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(activeDot()).toBe(flatSlides.length);
    expect(screen.queryByRole("button", { name: "Next slide" })).toBeNull();
    wait(1000);
    wheel(100); // already at the end
    expect(activeDot()).toBe(flatSlides.length);
  });

  it("moves on swipes longer than 50px", () => {
    render(<HomePage />);
    fireEvent.touchEnd(window, { changedTouches: [{ clientY: 0 }] }); // no touchstart
    swipe(300, 280);
    expect(activeDot()).toBe(0);
    swipe(300, 100);
    expect(activeDot()).toBe(1);
    wait(1000);
    swipe(100, 300);
    expect(activeDot()).toBe(0);
  });
});

describe("landing page on mobile", () => {
  it("shows each slide's image first, then auto-advances to its text", () => {
    setWidth(390);
    render(<HomePage />);
    expect(dots()).toHaveLength(1 + flatSlides.length);
    wheel(100);
    expect(activeDot()).toBe(1);
    expect(showsImageHalf()).toBe(true);
    wait(1300);
    expect(activeDot()).toBe(1); // same dot: the text half of the same slide
    expect(showsImageHalf()).toBe(false);
    expect(activeSlide().textContent).toContain(flatSlides[0].bullets[0] as string);
    wait(1000);
    fireEvent.click(dots()[2]);
    expect(activeDot()).toBe(2);
    expect(showsImageHalf()).toBe(false);
    wait(1000);
    wheel(-100); // backwards onto an image slide keeps going backwards
    expect(showsImageHalf()).toBe(true);
    wait(1300);
    expect(activeDot()).toBe(1);
    expect(showsImageHalf()).toBe(false);
  });

  it("resets to the hero when the layout switches", () => {
    render(<HomePage />);
    wheel(100);
    expect(activeDot()).toBe(1);
    setWidth(390);
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
    expect(activeDot()).toBe(0);
  });
});
