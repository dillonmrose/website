import type { ReactNode } from "react";

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto text-sm text-gray-800">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">DILLON ROSE</h1>
            <p className="text-blue-500 font-medium text-base mt-0.5">Full Stack Engineer</p>
          </div>
          <a
            href="/resume.pdf"
            download="Dillon_Rose_Resume.pdf"
            className="flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded px-3 py-1.5 hover:border-gray-400 hover:text-gray-800 transition-colors mt-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-500 text-xs">
          <span>(954) 579-2558</span>
          <a href="mailto:DR@dillonmrose.com" className="hover:text-gray-800 transition-colors">DR@dillonmrose.com</a>
          <a href="https://linkedin.com/in/dillonmrose" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">linkedin.com/in/dillonmrose</a>
          <a href="https://dillonmrose.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">dillonmrose.com</a>
          <span>Seattle</span>
        </div>
      </div>

      <div className="flex gap-8">

        {/* Left column */}
        <div className="w-56 shrink-0 space-y-6">

          <Section title="Summary">
            <p className="text-gray-600 leading-relaxed">
              {"I'm a Full Stack Engineer with a decade of experience building AI-powered user experiences. I've played a key role in developing three projects from the ground up, two of which I led as a tech lead, with both scaling to over 1M monthly active users. I have a solid grasp of the processes and structures required to deliver new features, while also ensuring live site reliability and maintaining code health."}
            </p>
          </Section>

          <Section title="Technical Skills">
            <div className="grid grid-cols-3 gap-x-2 gap-y-1 text-gray-700">
              {["React", "Next.js", "Python", "C#", "VSCode", "AI Fluent"].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </Section>

          <Section title="Soft Skills">
            <ul className="space-y-1 text-gray-600">
              {[
                "Technical documentation",
                "Cross-Functional Collaboration",
                "Cross-Org Communication",
                "Security Best Practices",
                "Data Governance",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>

          <Section title="Interests">
            <ul className="space-y-1 text-gray-600">
              {["Side projects", "Guitar", "Construction", "Rock climbing"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>

        </div>

        {/* Right column */}
        <div className="flex-1 space-y-6 min-w-0">

          <Section title="Experience">
            <div className="space-y-5">
              <Job
                title="Principal Software Engineer"
                company="Microsoft Copilot"
                dates="01/2023 - Present"
                bullets={[
                  "Shipped Microsoft Copilot on Teams, Outlook, Windows, Bing, Office.com and the standalone site serving ~7M daily active users",
                  "Designed full stack solution for Turn 0 Prompt Suggestions which initiate ~3% of sessions",
                  "Designed and developed Teaching Moments feature serving 10+ tutorials to onboard users and upsell the paid feature set",
                  "Reduced time from commit to production from 2 weeks to 3 days by rearchitecting the deployment strategy",
                  "Serving as the Technical Lead for the Microsoft Copilot Client Platform team, responsible for reliability, user perceived latency, authentication, flighting, etc",
                ]}
              />
              <Job
                title="Senior Software Engineer"
                company="Cortana"
                dates="01/2017 - 01/2023"
                bullets={[
                  "Developed email search and composition capabilities for the initial launch of Cortana Invoke",
                  "Incubated and scaled Play My Emails feature to over 1M monthly active users",
                  "Led team of 5 engineers through full rewrite of service powering Play My Emails feature",
                  "Improved user experience by designing custom audio streaming protocol for email readouts",
                  "Created variable playback speed feature based on feedback from user panels",
                ]}
              />
              <Job
                title="Software Engineer II"
                company="Microsoft Maps"
                dates="01/2016 - 01/2017"
                bullets={[
                  "Enhanced user experience by optimizing map icons displayed across multiple zoom levels on Bing Maps",
                  "Developed Offline Search capabilities in the Windows Map app by rearchitecting Bing's online search stack",
                  "Defined strategy for selecting which locations and businesses would be downloaded for offline search",
                ]}
              />
              <Job
                title="Software Engineer"
                company="Bing"
                dates="06/2014 - 01/2016"
                bullets={[
                  "Enhanced user satisfaction by optimizing a classifier and a ranker in Bing Local Search stack",
                  "Reduced latency and business costs by developing rule-based classifier to serve head queries",
                ]}
              />
            </div>
          </Section>

          <Section title="Achievements">
            <div className="space-y-3">
              <Achievement
                title="Copilot for All"
                description="Expanded the Copilot user base by 10x by adding support for unlicensed business users and licensed consumer users. Predicting 80M new licenses from this effort representing $28B/year."
              />
              <Achievement
                title="Knowledge Sharing Series"
                description="Led organization-wide learning series covering React basics, zustand, authentication, testability, performance, transformers, and more across 55 talks. Personally presented on VectorDBs, LangChain, scorecards, and The Effective Engineer."
              />
            </div>
          </Section>

          <Section title="Education">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-semibold text-gray-900">B.S. in Computer Science and Mathematical Sciences</p>
                <p className="text-blue-500">Florida Institute of Technology</p>
              </div>
              <span className="text-gray-400 shrink-0 ml-4">09/2010 - 05/2014</span>
            </div>
          </Section>

        </div>
      </div>
    </div>
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

function Job({
  title,
  company,
  dates,
  bullets,
}: {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}) {
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

function Achievement({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <p className="font-semibold text-gray-900">{title}</p>
      <p className="text-gray-600 leading-snug mt-0.5">{description}</p>
    </div>
  );
}
