import { SlideLayout } from "./Slide";
import type { BulletItem, FlatSlide } from "./sections";

export function SectionSlide({ section, images, bullets, imageClass, stat, pt, subType }: Omit<FlatSlide, "key">) {
  if (subType === "image") {
    return (
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <img src={images[0]} alt={section.name} className={imageClass.replace(/max-h-\[40vh\]/, "max-h-[65vh]")} />
      </div>
    );
  }

  const hasImages = subType === "text" ? false : images.length > 0;

  return (
    <SlideLayout hasImages={hasImages} pt={pt}>
      <div className={`${hasImages ? "w-full md:w-[40%] md:shrink-0" : "max-w-2xl"} space-y-5 min-w-0`}>
        {/* Invisible spacers — keep layout identical to PersistentHeader so bullets sit in the right spot */}
        <p className="text-[10px] md:text-xs invisible select-none tracking-normal md:tracking-widest">
          {section.dates}
          <br className="md:hidden" /> {section.role}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold invisible select-none">{section.name}</h2>

        {/* Bullets and stat — these animate with the slide */}
        <BulletList bullets={bullets} />
        {stat && <p className="text-3xl font-bold text-gray-900">{stat}</p>}
      </div>

      {hasImages && (
        <div className="flex-1 flex gap-3 items-center min-w-0">
          {images.map((src) => (
            <div key={src} className="flex-1 min-w-0 flex justify-center">
              <img src={src} alt={section.name} className={imageClass} />
            </div>
          ))}
        </div>
      )}
    </SlideLayout>
  );
}

function BulletList({ bullets }: { bullets: BulletItem[] }) {
  return (
    <div className="space-y-3 !mt-6 md:!mt-12">
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
  );
}
