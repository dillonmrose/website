// Landing page content: one Section per career stage, each rendered as one
// Slide per image group (two on mobile: image, then text). See
// docs/ubiquitous-language.md.

export type BulletItem = string | { text: string; sub: string[] };

export interface Section {
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

export const sections: Section[] = [
  {
    name: "Copilot",
    role: "Principal Software Engineer",
    dates: "2023 – Present",
    stat: "From 0 to 40M+ weekly active users",
    slideStat: ["From 0 to 40M+ weekly active users", null],
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
    stat: "From 0 to 1M+ weekly active users",
    bullets: [
      "Incubated the feature from scratch and grew it to 1M monthly active users",
      "Led a team of 5 engineers through a full service rewrite",
      "Designed audio streaming protocol for email readouts. Enabled seek and variable playback speed",
    ],
    imageGroups: [["/PME1.png", "/PME2.png"]],
    slideImageClass: [
      "max-w-full h-auto max-h-[40vh] md:max-h-[55vh] scale-[0.65] md:scale-[0.9] -translate-y-[2vh] md:-translate-y-[10vh] origin-center rounded-xl [filter:drop-shadow(0_18px_16px_rgb(0_0_0/0.22))_drop-shadow(0_-6px_8px_rgb(0_0_0/0.14))]",
    ],
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
    slideImageClass: [
      "max-w-full h-auto max-h-[40vh] md:max-h-[55vh] -translate-y-[2vh] md:-translate-y-[2vh] rounded-xl [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
    ],
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

export type SlideState = "active" | "above" | "below";

export interface FlatSlide {
  key: string;
  section: Section;
  images: string[];
  bullets: BulletItem[];
  imageClass: string;
  stat: string | null;
  pt: string;
  subType?: "image" | "text";
}

export const flatSlides: FlatSlide[] = sections.flatMap((section) =>
  section.imageGroups.map((images, gi) => ({
    key: `${section.name}-${gi}`,
    section,
    images,
    bullets: section.slideBullets?.[gi] ?? section.bullets,
    imageClass:
      section.slideImageClass?.[gi] ??
      "max-w-full h-auto max-h-[40vh] md:max-h-[55vh] -translate-y-[7vh] rounded-xl [filter:drop-shadow(0_10px_8px_rgb(0_0_0/0.08))_drop-shadow(0_-4px_4px_rgb(0_0_0/0.05))]",
    stat: section.slideStat ? (section.slideStat[gi] ?? null) : (section.stat ?? null),
    pt: section.slidePt?.[gi] ?? "pt-[1vh] md:pt-[30vh]",
  })),
);

export const mobileFlatSlides: FlatSlide[] = flatSlides.flatMap((slide) => [
  { ...slide, key: `${slide.key}-img`, subType: "image" as const },
  { ...slide, key: `${slide.key}-txt`, subType: "text" as const },
]);
