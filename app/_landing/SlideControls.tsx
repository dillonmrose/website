import { flatSlides } from "./sections";

// Down arrow — desktop only
export function ScrollArrow({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-gray-300 hover:text-gray-600 transition-colors animate-bounce z-20"
      aria-label="Next slide"
    >
      <span className="text-xs tracking-widest uppercase">Scroll</span>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

// Slide indicators — always based on flatSlides count (no separate image dots on mobile)
export function SlideIndicators({
  current,
  isMobile,
  goTo,
}: {
  current: number;
  isMobile: boolean;
  goTo: (idx: number) => void;
}) {
  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
      {Array.from({ length: 1 + flatSlides.length }).map((_, i) => {
        const isActive = isMobile
          ? i === 0
            ? current === 0
            : current === i * 2 - 1 || current === i * 2
          : i === current;
        return (
          <button
            type="button"
            key={i}
            onClick={() => goTo(isMobile ? (i === 0 ? 0 : i * 2) : i)}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              isActive ? "bg-gray-900 scale-150" : "bg-gray-300 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        );
      })}
    </div>
  );
}
