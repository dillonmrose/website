import { useEffect, useRef } from "react";
import type { SlideState } from "./sections";

// Shared layout wrapper — used by both the persistent header and each slide.
// Uses a fixed pt-[30vh] so the heading always lands at the same pixel,
// regardless of how many bullets are below it.
export function SlideLayout({
  hasImages,
  pt = "pt-[1vh] md:pt-[30vh]",
  children,
}: {
  hasImages: boolean;
  pt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`absolute inset-x-0 top-0 min-h-full pb-16 w-[84%] md:w-[70%] mx-auto px-4 md:px-8 ${pt}`}>
      <div className={`flex gap-12 items-start w-full ${!hasImages ? "justify-center" : ""}`}>{children}</div>
    </div>
  );
}

// Each slide scrolls on its own when its content is taller than the screen
// (short phones, enlarged text), with no scrollbar so it lines up with the
// persistent header; onScroll reports the active slide's offset.
export function Slide({
  children,
  state,
  onScroll,
}: {
  children: React.ReactNode;
  state: SlideState;
  onScroll?: (scrollTop: number) => void;
}) {
  const active = state === "active";
  const ref = useRef<HTMLDivElement>(null);

  // Arrive at the top of a slide, wherever it was left.
  useEffect(() => {
    if (active && ref.current) ref.current.scrollTop = 0;
  }, [active]);

  return (
    <div
      ref={ref}
      data-slide-scroller
      onScroll={active ? (e) => onScroll?.(e.currentTarget.scrollTop) : undefined}
      className="absolute inset-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : state === "above" ? "translateY(-48px)" : "translateY(48px)",
        transition: active
          ? "opacity 600ms ease-in-out, transform 600ms ease-in-out"
          : "opacity 300ms ease-in, transform 300ms ease-in",
        pointerEvents: active ? "auto" : "none",
        zIndex: active ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
