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
  slideImageClass?: (string | null)[];
}

const projects: Project[] = [
  {
    name: "Copilot",
    role: "Principal Software Engineer",
    dates: "2023 – Present",
    stat: "400M+ monthly active users",
    bullets: [
      "Designed Turn 0 Prompt Suggestions, initiating ~3% of all sessions",
      "Built Teaching Moments — 10+ onboarding tutorials that upsell the paid tier",
      "Cut commit-to-production from 2 weeks to 3 days by rearchitecting deployment",
      "Technical Lead for the Client Platform team: reliability, latency, auth, and flighting",
    ],
    imageGroups: [["/Copilot2.png"], ["/Copilot.png"]],
    slideImageClass: ["max-w-full h-auto max-h-[55vh] scale-[1.25] origin-center", null],
  },
  {
    name: "Cortana",
    role: "Senior Software Engineer",
    dates: "2017 – 2023",
    stat: "1M+ monthly active users",
    bullets: [
      "Incubated the feature from scratch and grew it to 1M monthly active users",
      "Led a team of 5 engineers through a full service rewrite",
      "Designed a custom audio streaming protocol for email readouts",
      "Added variable playback speed based on user panel feedback",
    ],
    imageGroups: [["/PME1.png", "/PME2.png"]],
    slideImageClass: ["max-w-full h-auto max-h-[55vh] scale-[0.9] origin-center"],
  },
  {
    name: "Microsoft Maps",
    role: "Software Engineer II",
    dates: "2016 – 2017",
    bullets: [
      "Rearchitected Bing's online search stack to run fully offline inside Windows Maps",
      "Defined the strategy for selecting which locations and businesses to download",
    ],
    imageGroups: [["/OfflineMaps.png"]],
  },
  {
    name: "Bing",
    role: "Software Engineer",
    dates: "2014 – 2016",
    bullets: [
      "Optimized ML models in the Bing Local Search stack — one of the highest ad revenue verticals",
      "Built a rule-based classifier for head queries, reducing latency and cost",
    ],
    imageGroups: [["/BingLocalSearch.png"], ["/BingMaps.png"]],
    slideImageClass: [
      "max-w-full h-auto max-h-[55vh] [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
      "max-w-full h-auto max-h-[55vh] [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
    ],
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
  imageClass: string;
}

const flatSlides: FlatSlide[] = projects.flatMap((project) =>
  project.imageGroups.map((images, gi) => ({
    key: `${project.name}-${gi}`,
    project,
    images,
    bullets: project.slideBullets?.[gi] ?? project.bullets,
    imageClass: project.slideImageClass?.[gi] ?? "max-w-full h-auto max-h-[55vh]",
  }))
);

// Shared layout wrapper — used by both the persistent header and each slide.
// Uses a fixed pt-[30vh] so the heading always lands at the same pixel,
// regardless of how many bullets are below it.
function SlideLayout({ hasImages, children }: { hasImages: boolean; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 w-[70%] mx-auto px-8 pt-[30vh]">
      <div className={`flex gap-12 items-start w-full ${!hasImages ? "justify-center" : ""}`}>
        {children}
      </div>
    </div>
  );
}

// Renders the heading + meta visibly, fades only on section change.
function PersistentHeader({ project }: { project: Project | null }) {
  const [shown, setShown] = useState(project);
  const [opacity, setOpacity] = useState(project ? 1 : 0);

  useEffect(() => {
    if (project?.name === shown?.name) return;
    setOpacity(0);
    const t = setTimeout(() => {
      setShown(project);
      setOpacity(project ? 1 : 0);
    }, 350);
    return () => clearTimeout(t);
  }, [project, shown?.name]);

  if (!shown) return null;

  const hasImages = (shown.imageGroups[0]?.length ?? 0) > 0;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      style={{ transition: "opacity 350ms ease-in-out", opacity }}
    >
      <SlideLayout hasImages={hasImages}>
        <div className={`${hasImages ? "flex-1" : "max-w-2xl"} space-y-5 min-w-0`}>
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            {shown.dates} · {shown.role}
          </p>
          <h2 className="text-5xl font-bold text-gray-900">{shown.name}</h2>
        </div>
        {hasImages && <div className="flex-1 min-w-0" />}
      </SlideLayout>
    </div>
  );
}

function Slide({ children, state }: { children: React.ReactNode; state: SlideState }) {
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

function ProjectSlide({ project, images, bullets, imageClass }: FlatSlide) {
  const hasImages = images.length > 0;

  return (
    <SlideLayout hasImages={hasImages}>
      <div className={`${hasImages ? "flex-1" : "max-w-2xl"} space-y-5 min-w-0`}>
        {/* Invisible spacers — keep layout identical to PersistentHeader so bullets sit in the right spot */}
        <p className="text-xs invisible select-none">{project.dates} · {project.role}</p>
        <h2 className="text-5xl font-bold invisible select-none">{project.name}</h2>

        {/* Bullets and stat — these animate with the slide */}
        <div className="space-y-3 !mt-12">
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

      {hasImages && (
        <div className="flex-1 flex gap-3 items-center min-w-0">
          {images.map((src) => (
            <div key={src} className="flex-1 min-w-0 flex justify-center">
              <img
                src={src}
                alt={project.name}
                className={`${imageClass} rounded-xl`}
              />
            </div>
          ))}
        </div>
      )}
    </SlideLayout>
  );
}

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const locked = useRef(false);
  const total = 1 + flatSlides.length;

  const currentProject = current === 0 ? null : flatSlides[current - 1].project;

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

      {/* Persistent heading — stays put within a section, fades on section change */}
      <PersistentHeader project={currentProject} />

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
          <ProjectSlide project={slide.project} images={slide.images} bullets={slide.bullets} imageClass={slide.imageClass} />
        </Slide>
      ))}

      {/* Down arrow */}
      {current < total - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-300 hover:text-gray-600 transition-colors animate-bounce z-20"
          aria-label="Next slide"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Slide indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
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
