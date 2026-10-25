export function Hero() {
  // min-h-full and my-auto rather than h-full and justify-center: if enlarged text makes
  // this taller than the screen, it grows and the slide scrolls instead of clipping the top.
  return (
    <div className="min-h-full flex flex-col max-w-4xl mx-auto px-6">
      <div className="my-auto py-6">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-5">Full Stack Engineer</p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Hi, I&apos;m Dillon.
          <br />I convert AI capabilities
          <br />
          into products people actually want.
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-xl leading-relaxed">
          A decade of AI-adjacent development at Microsoft, shipping products from zero to millions.
        </p>
      </div>
    </div>
  );
}
