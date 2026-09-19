"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Project {
  name: string;
  role: string;
  dates: string;
  stat?: string;
  bullets: string[];
  imageGroups: string[][];
  slideBullets?: (string[] | null)[];
}

const projects: Project[] = [
  {
    name: "Microsoft Copilot",
    role: "Principal Software Engineer",
    dates: "2023 – Present",
    stat: "~7M daily active users",
    bullets: [
      "Designed Turn 0 Prompt Suggestions, initiating ~3% of all sessions",
      "Built Teaching Moments — 10+ onboarding tutorials that upsell the paid tier",
      "Cut commit-to-production from 2 weeks to 3 days by rearchitecting deployment",
      "Technical Lead for the Client Platform team: reliability, latency, auth, and flighting",
    ],
    imageGroups: [["/Copilot.png"], ["/Copilot2.png"]],
  },
  {
    name: "Play My Emails",
    role: "Senior Software Engineer, Cortana",
    dates: "2017 – 2023",
    stat: "1M+ monthly active users",
    bullets: [
      "Incubated the feature from scratch and grew it to 1M monthly active users",
      "Led a team of 5 engineers through a full service rewrite",
      "Designed a custom audio streaming protocol for email readouts",
      "Added variable playback speed based on user panel feedback",
    ],
    imageGroups: [["/PME1.png", "/PME2.png"]],
  },
  {
    name: "Offline Maps",
    role: "Software Engineer II, Microsoft Maps",
    dates: "2016 – 2017",
    bullets: [
      "Rearchitected Bing's online search stack to run fully offline inside Windows Maps",
      "Defined the strategy for selecting which locations and businesses to download",
    ],
    imageGroups: [["/OfflineMaps.png"]],
  },
  {
    name: "Bing Local Search",
    role: "Software Engineer, Bing",
    dates: "2014 – 2016",
    bullets: [
      "Optimized ML models in the Bing Local Search stack — one of the highest ad revenue verticals",
      "Built a rule-based classifier for head queries, reducing latency and cost",
    ],
    imageGroups: [["/BingLocalSearch.png"], ["/BingMaps.png"]],
    slideBullets: [
      null,
      ["Defined the technique for selecting which point of interest icons to show at various zoom levels of the map"],
    ],
  },
];

type SlideState = "active" | "above" | "below";

interface FlatSlide {
  key: string;
  project: Project;
  images: string[];
  bullets: string[];
}

const flatSlides: FlatSlide[] = projects.flatMap((project) =>
  project.imageGroups.map((images, gi) => ({
    key: `${project.name}-${gi}`,
    project,
    images,
    bullets: project.slideBullets?.[gi] ?? project.bullets,
  }))
);

function Slide({ children, state }: { children: React.ReactNode; state: SlideState }) {
  return (
    <div
      className="absolute inset-0 transition-all duration-700 ease-in-out"
      style={{
        opacity: state === "active" ? 1 : 0,
        transform:
          state === "active"
            ? "translateY(0)"
            : state === "above"
            ? "translateY(-48px)"
            : "translateY(48px)",
        pointerEvents: state === "active" ? "auto" : "none",
        zIndex: state === "active" ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}

function ProjectSlide({ project, images, bullets }: FlatSlide) {
  const hasImages = images.length > 0;

  return (
    <div className="h-full flex items-center w-[70%] mx-auto px-8">
      <div className={`flex gap-12 items-center w-full ${!hasImages ? "justify-center" : ""}`}>

        {/* Left: text */}
        <div className={`${hasImages ? "flex-1" : "max-w-2xl"} space-y-5 min-w-0`}>
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            {project.dates} · {project.role}
          </p>
          <h2 className="text-5xl font-bold text-gray-900">{project.name}</h2>
          <div className="space-y-3">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex gap-3 text-gray-600">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
                <p className="leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>
          {project.stat && (
            <p className="text-3xl font-bold text-gray-900">{project.stat}</p>
          )}
        </div>

        {/* Right: images */}
        {hasImages && (
          <div className="flex-1 flex gap-3 items-center min-w-0">
            {images.map((src) => (
              <div key={src} className="flex-1 min-w-0 flex justify-center">
                <img
                  src={src}
                  alt={project.name}
                  className="max-w-full h-auto max-h-[55vh] rounded-xl"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const locked = useRef(false);
  const total = 1 + flatSlides.length;

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(total - 1, idx));
      if (next === current || locked.current) return;
      setCurrent(next);
      locked.current = true;
      setTimeout(() => { locked.current = false; }, 900);
    },
    [current, total]
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 20) return;
      goTo(current + (e.deltaY > 0 ? 1 : -1));
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, goTo]);

  const slideState = (i: number): SlideState =>
    i === current ? "active" : i < current ? "above" : "below";

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ top: "56px" }}>

      {/* Hero */}
      <Slide state={slideState(0)}>
        <div className="h-full flex flex-col justify-center max-w-4xl mx-auto px-6">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">
            Full Stack Engineer
          </p>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            Hi, I&apos;m Dillon.<br />
            I convert AI capabilities<br />
            into products people actually want.
          </h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            A decade of AI-adjacent development at Microsoft,
            shipping products from zero to millions.
          </p>
        </div>
      </Slide>

      {/* Project slides */}
      {flatSlides.map((slide, i) => (
        <Slide key={slide.key} state={slideState(i + 1)}>
          <ProjectSlide {...slide} />
        </Slide>
      ))}

      {/* Down arrow */}
      {current < total - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-300 hover:text-gray-600 transition-colors animate-bounce"
          aria-label="Next slide"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Slide indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-gray-900 scale-150" : "bg-gray-300 hover:bg-gray-500"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
