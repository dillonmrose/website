"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Project {
  name: string;
  role: string;
  dates: string;
  description: string;
  stat?: string;
  bullets: string[];
  images: string[];
}

const projects: Project[] = [
  {
    name: "Microsoft Copilot",
    role: "Principal Software Engineer",
    dates: "2023 – Present",
    description: "AI assistant shipped across Teams, Outlook, Windows, Bing, and Office.com.",
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
    description: "Voice-first email experience built from zero and scaled to over a million users.",
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
    description: "Relevance and ranking improvements for local business search on Bing.",
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
    description: "Brought full search capability to the Windows Maps app without a network connection.",
    bullets: [
      "Rearchitected Bing's online search stack to run fully offline inside Windows Maps",
      "Defined the strategy for selecting which locations and businesses to download",
    ],
    images: ["/OfflineMaps.png"],
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="-my-10">

      {/* Hero */}
      <section className="flex flex-col justify-center min-h-[70vh] py-20">
        <FadeIn>
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
        </FadeIn>
      </section>

      {/* Project sections */}
      <div className="border-t border-gray-100">
        {projects.map((project) => (
          <section
            key={project.name}
            className="flex gap-16 min-h-[110vh] py-24 border-b border-gray-100"
          >
            {/* Sticky left panel */}
            <div className="w-64 shrink-0 sticky top-20 h-fit">
              <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-3">
                {project.dates}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{project.name}</h2>
              <p className="text-blue-500 text-sm mb-4">{project.role}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{project.description}</p>
              {project.stat && (
                <p className="mt-5 text-3xl font-bold text-gray-900">{project.stat}</p>
              )}
            </div>

            {/* Scrolling right panel */}
            <div className="flex-1 space-y-8 min-w-0 pt-1">
              <FadeIn delay={100}>
                <div className="flex flex-wrap gap-4">
                  {project.images.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={project.name}
                      className="rounded-lg max-h-64 object-contain"
                    />
                  ))}
                </div>
              </FadeIn>

              <div className="space-y-4">
                {project.bullets.map((bullet, i) => (
                  <FadeIn key={bullet} delay={180 + i * 90}>
                    <div className="flex gap-3 text-gray-600">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-200 shrink-0" />
                      <p className="leading-relaxed">{bullet}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

    </div>
  );
}
