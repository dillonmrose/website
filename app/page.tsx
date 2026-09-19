"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type BulletItem = string | { text: string; sub: string[] };

interface Project {
  name: string;
  role: string;
  dates: string;
  stat?: string;
  bullets: BulletItem[];
  imageGroups: string[][];
  slideBullets?: (BulletItem[] | null)[];
  slideImageClass?: (string | null)[];
  slideStat?: (string | null)[];
  slidePt?: (string | null)[];
}

const projects: Project[] = [
  {
    name: "Copilot",
    role: "Principal Software Engineer",
    dates: "2023 – Present",
    stat: "From 0 to 400M+ monthly active users",
    slideStat: ["From 0 to 400M+ monthly active users", null],
    bullets: [
      "Designed Turn 0 Prompt Suggestions, initiating ~3% of all sessions",
      "Built Teaching Moments — 10+ onboarding tutorials that upsell the paid tier",
      "Cut commit-to-production from 2 weeks to 3 days by rearchitecting deployment",
      "Technical Lead for the Client Platform team: reliability, latency, auth, and flighting",
    ],
    imageGroups: [["/Copilot.png"], ["/Copilot2.png"]],
    slideBullets: [
      [
        "One of the original members of the 10-engineer team that built the Copilot client app from scratch",
        "Architected subscription entitlement and feature flag infrastructure",
        "Spearheaded full stack solution for Prompt Suggestions. Enabling suggestions enriched with user content (files, people, meetings, etc.) to meet users where they engage with work",
        "Created Teaching Moments - 10+ guided tutorials that onboard users to Copilot's key features",
      ],
      [
        "Rearchitected the deployment mechanism, cutting commit-to-production from 2 weeks to 3 days and enabling per-user version control via feature flags within 15 minutes",
        "Lead IC for the Client Infrastructure team: reliability, app load and chat latency, and feature flagging",
        "Lead agentic development adoption in the client repo",
        {
          text: "Led a v-team of 4 to create an autonomous agent fleet",
          sub: [
            "Addresses DevOps tasks: feature flag cleanup, flaky E2E tests, test coverage, and accessibility bugs",
            "Addresses merge conflicts and failed CI for subscribing team members",
          ],
        },
      ],
    ],
    slideImageClass: [
      "max-w-full h-auto max-h-[40vh] md:max-h-[55vh] translate-y-[3vh] md:-translate-y-[5vh] rounded-xl [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
      "max-w-full h-auto max-h-[40vh] md:max-h-[55vh] -translate-y-[7vh] rounded-xl [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
    ],
  },
  {
    name: "Cortana",
    role: "Senior Software Engineer",
    dates: "2017 – 2023",
    stat: "From 0 to 1M+ monthly active users",
    bullets: [
      "Incubated the feature from scratch and grew it to 1M monthly active users",
      "Led a team of 5 engineers through a full service rewrite",
      "Designed audio streaming protocol for email readouts. Enabled seek and variable playback speed",
    ],
    imageGroups: [["/PME1.png", "/PME2.png"]],
    slideImageClass: ["max-w-full h-auto max-h-[40vh] md:max-h-[55vh] scale-[0.65] md:scale-[0.9] -translate-y-[2vh] md:-translate-y-[10vh] origin-center rounded-xl [filter:drop-shadow(0_18px_16px_rgb(0_0_0/0.22))_drop-shadow(0_-6px_8px_rgb(0_0_0/0.14))]"],
  },
  {
    name: "Microsoft Maps",
    role: "Software Engineer II",
    dates: "2016 – 2017",
    bullets: [
      "Stripped down and ported Bing's online search stack to run fully offline inside Windows Maps app",
      "Defined the strategy for selecting which locations and businesses to download",
    ],
    imageGroups: [["/OfflineMaps.png"]],
    slideImageClass: ["max-w-full h-auto max-h-[40vh] md:max-h-[55vh] -translate-y-[2vh] md:-translate-y-[2vh] rounded-xl [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]"],
  },
  {
    name: "Bing",
    role: "Software Engineer",
    dates: "2014 – 2016",
    bullets: [
      "Optimized ML models in the Bing Local Search stack - one of the highest ad revenue verticals",
      "Built a rule-based classifier for head queries, reducing latency and cost",
    ],
    imageGroups: [["/BingLocalSearch.png"], ["/BingMaps.png"]],
    slideImageClass: [
      "max-w-full h-auto max-h-[40vh] md:max-h-[55vh] -translate-y-[4vh] md:-translate-y-[7vh] rounded-xl [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
      "max-w-full h-auto max-h-[40vh] md:max-h-[55vh] -translate-y-[4vh] md:-translate-y-[7vh] rounded-xl [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
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
  bullets: BulletItem[];
  imageClass: string;
  stat: string | null;
  pt: string;
  subType?: "image" | "text";
}

const flatSlides: FlatSlide[] = projects.flatMap((project) =>
  project.imageGroups.map((images, gi) => ({
    key: `${project.name}-${gi}`,
    project,
    images,
    bullets: project.slideBullets?.[gi] ?? project.bullets,
    imageClass: project.slideImageClass?.[gi] ?? "max-w-full h-auto max-h-[40vh] md:max-h-[55vh] -translate-y-[7vh] rounded-xl [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
    stat: project.slideStat ? (project.slideStat[gi] ?? null) : (project.stat ?? null),
    pt: project.slidePt?.[gi] ?? "pt-[6vh] md:pt-[30vh]",
  }))
);

const mobileFlatSlides: FlatSlide[] = flatSlides.flatMap((slide) => [
  { ...slide, key: `${slide.key}-img`, subType: "image" as const },
  { ...slide, key: `${slide.key}-txt`, subType: "text" as const },
]);

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Shared layout wrapper — used by both the persistent header and each slide.
// Uses a fixed pt-[30vh] so the heading always lands at the same pixel,
// regardless of how many bullets are below it.
function SlideLayout({ hasImages, pt = "pt-[6vh] md:pt-[30vh]", children }: { hasImages: boolean; pt?: string; children: React.ReactNode }) {
  return (
    <div className={`absolute inset-0 w-[85%] md:w-[70%] mx-auto px-4 md:px-8 ${pt}`}>
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
        <div className={`${hasImages ? "w-full md:w-[40%] md:shrink-0" : "max-w-2xl"} space-y-5 min-w-0`}>
          <p className="text-[10px] md:text-xs font-semibold tracking-normal md:tracking-widest text-gray-400 uppercase">
            {shown.dates}<br className="md:hidden" /><span className="hidden md:inline"> · </span><span className="md:hidden"> </span>{shown.role}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{shown.name}</h2>
        </div>
        {hasImages && <div className="hidden md:block md:flex-1 min-w-0" />}
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

function ProjectSlide({ project, images, bullets, imageClass, stat, pt, subType }: Omit<FlatSlide, "key">) {
  if (subType === "image") {
    return (
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <img
          src={images[0]}
          alt={project.name}
          className={imageClass.replace(/max-h-\[40vh\]/, "max-h-[65vh]")}
        />
      </div>
    );
  }

  const hasImages = subType === "text" ? false : images.length > 0;

  return (
    <SlideLayout hasImages={hasImages} pt={pt}>
      <div className={`${hasImages ? "w-full md:w-[40%] md:shrink-0" : "max-w-2xl"} space-y-5 min-w-0`}>
        {/* Invisible spacers — keep layout identical to PersistentHeader so bullets sit in the right spot */}
        <p className="text-[10px] md:text-xs invisible select-none tracking-normal md:tracking-widest">{project.dates}<br className="md:hidden" /> {project.role}</p>
        <h2 className="text-3xl md:text-5xl font-bold invisible select-none">{project.name}</h2>

        {/* Bullets and stat — these animate with the slide */}
        <div className="space-y-3 !mt-12">
          {bullets.map((bullet, i) => {
            if (typeof bullet === "string") {
              return (
                <div key={i} className="flex gap-3 text-gray-600">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
                  <p className="leading-relaxed">{bullet}</p>
                </div>
              );
            }
            return (
              <div key={i} className="flex gap-3 text-gray-600">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
                <div>
                  <p className="leading-relaxed">{bullet.text}</p>
                  <div className="mt-1.5 space-y-1.5 pl-1">
                    {bullet.sub.map((s, j) => (
                      <div key={j} className="flex gap-2.5 text-gray-500">
                        <span className="mt-2 h-1 w-1 rounded-full bg-gray-300 shrink-0" />
                        <p className="leading-relaxed text-sm">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {stat && (
          <p className="text-3xl font-bold text-gray-900">{stat}</p>
        )}
      </div>

      {hasImages && (
        <div className="flex-1 flex gap-3 items-center min-w-0">
          {images.map((src) => (
            <div key={src} className="flex-1 min-w-0 flex justify-center">
              <img
                src={src}
                alt={project.name}
                className={imageClass}
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
  const lastDirection = useRef<1 | -1>(1);
  const isMobile = useIsMobile();
  const activeSlides = isMobile ? mobileFlatSlides : flatSlides;
  const total = 1 + activeSlides.length;

  const currentProject = current === 0 ? null : activeSlides[current - 1].project;

  useEffect(() => { setCurrent(0); }, [isMobile]);

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(total - 1, idx));
      if (next === current || locked.current) return;
      lastDirection.current = next > current ? 1 : -1;
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

  // Auto-advance image-only slides on mobile
  useEffect(() => {
    const slideIdx = current - 1;
    if (slideIdx < 0) return;
    const slide = activeSlides[slideIdx];
    if (slide?.subType === "image") {
      const t = setTimeout(() => {
        locked.current = false;
        goTo(current + lastDirection.current);
      }, 750);
      return () => clearTimeout(t);
    }
  }, [current, activeSlides, goTo]);

  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      goTo(current + (delta > 0 ? 1 : -1));
      touchStartY.current = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
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
      {activeSlides.map((slide, i) => (
        <Slide key={slide.key} state={slideState(i + 1)}>
          <ProjectSlide project={slide.project} images={slide.images} bullets={slide.bullets} imageClass={slide.imageClass} stat={slide.stat} pt={slide.pt} subType={slide.subType} />
        </Slide>
      ))}

      {/* Down arrow — desktop only */}
      {current < total - 1 && (
        <button
          onClick={() => goTo(current + 1)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-gray-300 hover:text-gray-600 transition-colors animate-bounce z-20"
          aria-label="Next slide"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Slide indicators — always based on flatSlides count (no separate image dots on mobile) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        {Array.from({ length: 1 + flatSlides.length }).map((_, i) => {
          const isActive = isMobile
            ? (i === 0 ? current === 0 : current === i * 2 - 1 || current === i * 2)
            : i === current;
          return (
            <button
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

    </div>
  );
}
