"use client";

import { useEffect, useRef } from "react";

interface Project {
  name: string;
  role: string;
  dates: string;
  stat?: string;
  bullets: string[];
  images: string[];
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
    images: ["/Copilot.png"],
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
    images: ["/PME1.png", "/PME2.png"],
  },
  {
    name: "Bing Local Search",
    role: "Software Engineer, Bing",
    dates: "2014 – 2016",
    bullets: [
      "Optimized classifier and ranker in the Bing Local Search stack",
      "Built a rule-based classifier for head queries, reducing latency and cost",
    ],
    images: ["/BingMaps.png"],
  },
  {
    name: "Offline Maps Search",
    role: "Software Engineer II, Microsoft Maps",
    dates: "2016 – 2017",
    bullets: [
      "Rearchitected Bing's online search stack to run fully offline inside Windows Maps",
      "Defined the strategy for selecting which locations and businesses to download",
    ],
    images: ["/OfflineMaps.png"],
  },
];

// Clamp value between 0 and 1
const c = (n: number) => Math.max(0, Math.min(1, n));
// Map scroll progress p through a [lo, hi] window to 0→1
const r = (p: number, lo: number, hi: number) => c((p - lo) / (hi - lo));

function ProjectSection({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const bulletRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // p starts as soon as the section is visible in the viewport (coming from bottom),
      // reaches 1 when the section has fully scrolled out the top.
      const p = c((vh - rect.top) / rect.height);

      // p ≈ 0.083 at page load (hero is 75vh, content bottom just at viewport bottom).
      // All animations start above 0.09 so nothing shows on load; they fire
      // the instant the user scrolls and content enters the viewport.

      if (metaRef.current) {
        const t = r(p, 0.09, 0.16);
        metaRef.current.style.opacity = `${t}`;
        metaRef.current.style.transform = `translateY(${(1 - t) * 20}px)`;
      }
      if (headingRef.current) {
        const t = r(p, 0.12, 0.21);
        headingRef.current.style.opacity = `${t}`;
        headingRef.current.style.transform = `translateY(${(1 - t) * 32}px)`;
      }

      // Image: scales in during early sticky scroll
      if (imgRef.current) {
        const t = r(p, 0.34, 0.48);
        imgRef.current.style.opacity = `${t}`;
        imgRef.current.style.transform = `scale(${0.88 + t * 0.12})`;
      }

      // Bullets: staggered through sticky scroll
      bulletRefs.current.forEach((el, i) => {
        if (!el) return;
        const lo = 0.5 + i * 0.08;
        const t = r(p, lo, lo + 0.08);
        el.style.opacity = `${t}`;
        el.style.transform = `translateY(${(1 - t) * 16}px)`;
      });

      // Stat: near end of sticky scroll
      if (statRef.current) {
        const t = r(p, 0.82, 0.90);
        statRef.current.style.opacity = `${t}`;
        statRef.current.style.transform = `translateY(${(1 - t) * 16}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative border-b border-gray-100" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center gap-5 overflow-hidden">

        <p
          ref={metaRef}
          style={{ opacity: 0, transform: "translateY(20px)" }}
          className="text-xs font-semibold tracking-widest text-gray-400 uppercase"
        >
          {project.dates} · {project.role}
        </p>

        <h2
          ref={headingRef}
          style={{ opacity: 0, transform: "translateY(32px)" }}
          className="text-5xl font-bold text-gray-900"
        >
          {project.name}
        </h2>

        <div
          ref={imgRef}
          style={{ opacity: 0, transform: "scale(0.88)", transformOrigin: "left center" }}
          className="flex gap-4 h-80"
        >
          {project.images.map((src) => (
            <img
              key={src}
              src={src}
              alt={project.name}
              className="flex-1 min-w-0 object-contain rounded-xl"
            />
          ))}
        </div>

        <div className="space-y-3">
          {project.bullets.map((bullet, i) => (
            <div
              key={bullet}
              ref={(el) => { bulletRefs.current[i] = el; }}
              style={{ opacity: 0, transform: "translateY(16px)" }}
              className="flex gap-3 text-gray-600"
            >
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
              <p className="leading-relaxed">{bullet}</p>
            </div>
          ))}
        </div>

        {project.stat && (
          <div
            ref={statRef}
            style={{ opacity: 0, transform: "translateY(16px)" }}
          >
            <p className="text-3xl font-bold text-gray-900">{project.stat}</p>
          </div>
        )}

      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="-my-10">

      {/* Hero */}
      <section className="flex flex-col justify-center min-h-[75vh] py-20 relative">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">
          Full Stack Engineer
        </p>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          Hi, I&apos;m Dillon.<br />
          I build AI experiences<br />
          people actually use.
        </h1>
        <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
          A decade at Microsoft shipping products from zero to millions of users —
          most recently as Principal Engineer on Microsoft Copilot.
        </p>
        <div className="absolute bottom-8 left-0 flex flex-col items-start gap-1 animate-bounce">
          <span className="text-xs tracking-widest text-gray-300 uppercase">Scroll</span>
          <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Projects */}
      <div className="border-t border-gray-100">
        {projects.map((project) => (
          <ProjectSection key={project.name} project={project} />
        ))}
      </div>

    </div>
  );
}
