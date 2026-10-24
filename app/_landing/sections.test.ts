import { describe, expect, it } from "vitest";
import { flatSlides, mobileFlatSlides, sections } from "./sections";

describe("slides derived from sections", () => {
  it("makes one slide per image group, in section order", () => {
    expect(flatSlides).toHaveLength(sections.reduce((n, s) => n + s.imageGroups.length, 0));
    expect(flatSlides[0].key).toBe(`${sections[0].name}-0`);
  });

  it("uses per-slide bullets and stats when given, else the section's", () => {
    const copilot = flatSlides.filter((s) => s.section.name === "Copilot");
    expect(copilot[0].bullets).not.toEqual(copilot[1].bullets);
    expect(copilot[1].stat).toBeNull();
    const bing = flatSlides.filter((s) => s.section.name === "Bing");
    expect(bing[0].bullets).toBe(bing[0].section.bullets); // null override falls back
    const maps = flatSlides.find((s) => s.section.name === "Microsoft Maps");
    expect(maps?.stat).toBeNull(); // no stat at all
    expect(maps?.pt).toBe("pt-[1vh] md:pt-[30vh]");
  });

  it("splits each slide into image then text on mobile", () => {
    expect(mobileFlatSlides).toHaveLength(flatSlides.length * 2);
    expect(mobileFlatSlides.slice(0, 2).map((s) => s.subType)).toEqual(["image", "text"]);
  });
});
