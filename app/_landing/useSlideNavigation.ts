"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FlatSlide } from "./sections";

// Moves between slides on wheel, swipe and goTo, locking briefly after each move
// so one gesture advances one slide. Image-only mobile slides auto-advance.
// A slide taller than the screen scrolls first: gestures move only from its edge.
export function useSlideNavigation(activeSlides: FlatSlide[], isMobile: boolean) {
  const [current, setCurrent] = useState(0);
  const locked = useRef(false);
  const lastDirection = useRef<1 | -1>(1);
  const total = 1 + activeSlides.length;

  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(total - 1, idx));
      if (next === current || locked.current) return;
      lastDirection.current = next > current ? 1 : -1;
      setCurrent(next);
      locked.current = true;
      setTimeout(() => {
        locked.current = false;
      }, 900);
    },
    [current, total],
  );

  useWheel(current, goTo);
  useAutoAdvance(current, activeSlides, goTo, locked, lastDirection);
  useSwipe(current, goTo);

  return { current, total, goTo };
}

function useWheel(current: number, goTo: (idx: number) => void) {
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      if (atEdge(e.target, direction)) goTo(current + direction);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, goTo]);
}

// Auto-advance image-only slides on mobile
function useAutoAdvance(
  current: number,
  activeSlides: FlatSlide[],
  goTo: (idx: number) => void,
  locked: React.RefObject<boolean>,
  lastDirection: React.RefObject<1 | -1>,
) {
  useEffect(() => {
    const slideIdx = current - 1;
    if (slideIdx < 0) return;
    const slide = activeSlides[slideIdx];
    if (slide?.subType === "image") {
      const t = setTimeout(() => {
        locked.current = false;
        goTo(current + lastDirection.current);
      }, 1300);
      return () => clearTimeout(t);
    }
  }, [current, activeSlides, goTo, locked, lastDirection]);
}

function useSwipe(current: number, goTo: (idx: number) => void) {
  const touchStart = useRef<{ y: number; atTop: boolean; atBottom: boolean } | null>(null);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      // Edges are read at touchstart, so the swipe that scrolls to the bottom doesn't also move.
      touchStart.current = { y: e.touches[0].clientY, atTop: atEdge(e.target, -1), atBottom: atEdge(e.target, 1) };
    };
    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStart.current;
      if (start === null) return;
      const delta = start.y - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      if (delta > 0 ? start.atBottom : start.atTop) goTo(current + (delta > 0 ? 1 : -1));
      touchStart.current = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [current, goTo]);
}

// Whether the slide under the gesture is scrolled to its edge in this direction
// (always true for a slide that fits, or a gesture outside any slide).
function atEdge(target: EventTarget | null, direction: 1 | -1) {
  const el = target instanceof Element ? target.closest<HTMLElement>("[data-slide-scroller]") : null;
  if (!el) return true;
  return direction > 0 ? el.scrollTop + el.clientHeight >= el.scrollHeight - 1 : el.scrollTop <= 0;
}
