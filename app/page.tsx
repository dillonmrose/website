"use client";

import { Hero } from "./_landing/Hero";
import { PersistentHeader } from "./_landing/PersistentHeader";
import { SectionSlide } from "./_landing/SectionSlide";
import { Slide } from "./_landing/Slide";
import { ScrollArrow, SlideIndicators } from "./_landing/SlideControls";
import { flatSlides, mobileFlatSlides, type SlideState } from "./_landing/sections";
import { useIsMobile } from "./_landing/useIsMobile";
import { useSlideNavigation } from "./_landing/useSlideNavigation";

export default function HomePage() {
  const isMobile = useIsMobile();
  const activeSlides = isMobile ? mobileFlatSlides : flatSlides;
  const { current, total, goTo } = useSlideNavigation(activeSlides, isMobile);

  const currentSection = current === 0 ? null : activeSlides[current - 1].section;

  const slideState = (i: number): SlideState => (i === current ? "active" : i < current ? "above" : "below");

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ top: "56px" }}>
      {/* Persistent heading — stays put within a section, fades on section change */}
      <PersistentHeader section={currentSection} />

      <Slide state={slideState(0)}>
        <Hero />
      </Slide>

      {activeSlides.map((slide, i) => (
        <Slide key={slide.key} state={slideState(i + 1)}>
          <SectionSlide
            section={slide.section}
            images={slide.images}
            bullets={slide.bullets}
            imageClass={slide.imageClass}
            stat={slide.stat}
            pt={slide.pt}
            subType={slide.subType}
          />
        </Slide>
      ))}

      {current < total - 1 && <ScrollArrow onClick={() => goTo(current + 1)} />}

      <SlideIndicators current={current} isMobile={isMobile} goTo={goTo} />
    </div>
  );
}
