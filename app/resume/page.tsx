import type { ReactNode } from "react";

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto text-sm text-gray-800">
      <ResumeHeader />
      <div className="flex gap-8">
        <LeftColumn />
        <RightColumn />
      </div>
    </div>
  );
}

function ResumeHeader() {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">DILLON ROSE</h1>
          <p className="text-blue-500 font-medium text-base mt-0.5">Principal Full-Stack Engineer</p>
        </div>
        <a
          href="/resume.pdf"
          download="Dillon_Rose_Resume.pdf"
          className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded px-3 py-1.5 hover:border-gray-400 hover:text-gray-800 transition-colors mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PDF
        </a>
      </div>
      <div className="flex flex-wrap gap-4 mt-2 text-gray-500 text-xs">
        <span>(954) 579-2558</span>
        <a href="mailto:DR@dillonmrose.com" className="hover:text-gray-800 transition-colors">
          DR@dillonmrose.com
        </a>
        <a
          href="https://linkedin.com/in/dillonmrose"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 transition-colors"
        >
          linkedin.com/in/dillonmrose
        </a>
        <a
          href="https://dillonmrose.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-800 transition-colors"
        >
          dillonmrose.com
        </a>
        <span>Seattle</span>
      </div>
    </div>
  );
}

function LeftColumn() {
  return (
    <div className="w-56 shrink-0 space-y-6">
      <Section title="Summary">
        <p className="text-gray-600 leading-relaxed">
          {
            "Principal full-stack engineer with 12 years of experience creating AI-powered experiences. Led two products from inception to scale, including Microsoft Copilot (~40M MAU). Deep grasp of the processes and structures required to ship products while ensuring live-site reliability and code health. Currently focused on agentic systems: coding harnesses, multi-agent orchestration, and eval-driven development. Eager to scale the next generation of AI products."
          }
        </p>
      </Section>

      <Section title="Technical Skills">
        <ul className="space-y-1 text-gray-700">
          {[
            "Agentic Development",
            "Software Factories",
            "Eval-Driven Development",
            "React",
            "TypeScript",
            "C#",
            "Python",
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="Leadership">
        <ul className="space-y-1 text-gray-600">
          {[
            "Cross-Org Technical Strategy",
            "Cross-Functional Collaboration",
            "Technical Mentorship",
            "Architecture Reviews",
            "Engineering Culture",
            "Knowledge Sharing",
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="Interests">
        <ul className="space-y-1 text-gray-600">
          {["Rock climbing", "Construction", "Guitar"].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function RightColumn() {
  return (
    <div className="flex-1 space-y-6 min-w-0">
      <Experience />

      <Section title="Education">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="font-semibold text-gray-900">Dual B.S. in Computer Science and Mathematical Sciences</p>
            <p className="text-blue-500">Florida Institute of Technology</p>
          </div>
          <span className="text-gray-400 shrink-0 ml-4">09/2010 - 05/2014</span>
        </div>
      </Section>
    </div>
  );
}

function Experience() {
  return (
    <Section title="Experience">
      <div className="space-y-5">
        <Job
          title="Principal Software Engineer"
          company="Microsoft Copilot"
          dates="01/2023 - Present"
          bullets={[
            "Founding client engineer on Microsoft Copilot; built and scaled the client from zero to ~40M MAU across a desktop app, web, and embedded surfaces (Teams, Outlook, Windows, Bing)",
            "Architected an agentic software factory platform that autonomously fights engineering debt, using eval-driven development to measure agent quality; drove the flaky-test backlog to zero and retired 100+ stale feature flags",
            "Technical lead for the Copilot Client Platform (reliability, latency, auth, feature flagging) and advisor on agentic development across the client org",
            "Expanded Copilot's addressable user base by 10x by enabling support for unlicensed business users and licensed consumer users. Projected to unlock tens of millions of new licenses",
            "Cut commit-to-production lead time from 2 weeks to 3 days by re-architecting the deployment pipeline",
            "Drove full-stack design and implementation of Prompt Suggestions and Teaching Moments, an in-product tutorial system that onboards users and upsells paid features",
            "Ran an org-wide engineering talk series, recruiting speakers for 55+ talks; personally presented on agentic development, vector DBs, and engineering scorecards",
          ]}
        />
        <Job
          title="Senior Software Engineer"
          company="Cortana"
          dates="01/2017 - 01/2023"
          bullets={[
            "Incubated and scaled 'Play My Emails' experience to over 1M MAU",
            "Designed an audio streaming protocol replacing whole-file HTTP audio responses with streamed playback. This cut time-to-first-audio for email readouts and enabled seeking, scrubbing and variable playback speed",
            "Led a team of 5 engineers through a full rewrite of the 'Play My Emails' service, migrating from a deprecated internal platform to Microsoft Bot Framework with no user-facing disruption",
            "Developed email search and composition capabilities for the initial launch of the Harman Kardon Invoke",
          ]}
        />
        <Job
          title="Software Engineer II"
          company="Microsoft Maps"
          dates="01/2016 - 01/2017"
          bullets={[
            "Built offline search for the Windows Maps app, adapting Bing's online search stack to run on-device and curating the downloadable content to maximize offline recall given storage constraints",
            "Optimized map icon layout across multiple zoom levels on Bing Maps",
          ]}
        />
        <Job
          title="Software Engineer"
          company="Bing"
          dates="06/2014 - 01/2016"
          bullets={[
            "Optimized classifiers and rankers in Bing Local Search stack",
            "Reduced latency and business costs by developing rule-based classifier to serve head queries",
          ]}
        />
      </div>
    </Section>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-2 pb-1 border-b border-gray-100">
        {title}
      </p>
      {children}
    </div>
  );
}

function Job({ title, company, dates, bullets }: { title: string; company: string; dates: string; bullets: string[] }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-semibold text-gray-900">{title}</p>
        <span className="text-gray-400 shrink-0 ml-4">{dates}</span>
      </div>
      <p className="text-blue-500 mb-1.5">{company}</p>
      <ul className="space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-gray-600 leading-snug">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-gray-300 shrink-0" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
