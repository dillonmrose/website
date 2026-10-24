"use client";

import { useEffect, useState } from "react";
import { SlideLayout } from "./Slide";
import type { Section } from "./sections";

// Renders the heading + meta visibly, fades only on section change.
export function PersistentHeader({ section }: { section: Section | null }) {
  const [shown, setShown] = useState(section);
  const [opacity, setOpacity] = useState(section ? 1 : 0);

  useEffect(() => {
    if (section?.name === shown?.name) return;
    setOpacity(0);
    const t = setTimeout(() => {
      setShown(section);
      setOpacity(section ? 1 : 0);
    }, 350);
    return () => clearTimeout(t);
  }, [section, shown?.name]);

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
            {shown.dates}
            <br className="md:hidden" />
            <span className="hidden md:inline"> · </span>
            <span className="md:hidden"> </span>
            {shown.role}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{shown.name}</h2>
        </div>
        {hasImages && <div className="hidden md:block md:flex-1 min-w-0" />}
      </SlideLayout>
    </div>
  );
}
