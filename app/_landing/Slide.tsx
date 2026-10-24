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
    <div className={`absolute inset-0 w-[84%] md:w-[70%] mx-auto px-4 md:px-8 ${pt}`}>
      <div className={`flex gap-12 items-start w-full ${!hasImages ? "justify-center" : ""}`}>{children}</div>
    </div>
  );
}

export function Slide({ children, state }: { children: React.ReactNode; state: SlideState }) {
  const active = state === "active";
  return (
    <div
      className="absolute inset-0"
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
