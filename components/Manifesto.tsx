import Image from "next/image";

const POINTS = [
  {
    n: "01",
    title: "Can't stop.",
    body:
      "No paper hands. No exit liquidity. The chart only knows one direction when conviction shows up early.",
  },
  {
    n: "02",
    title: "Won't stop.",
    body:
      "Through FUD, FOMO and red candles. The hustle does not negotiate with the dip.",
  },
  {
    n: "03",
    title: "Win.",
    body:
      "Sports. Music. Markets. Same energy. We're going to win so much, you'll get tired of winning.",
  },
];

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative bg-charcoal text-bone grain-overlay">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Image card */}
        <div className="lg:col-span-5">
          <div className="relative aspect-[3/4] w-full border-4 border-bone shadow-[10px_10px_0_0_#d92121] overflow-hidden">
            <Image
              src="/img.jpg"
              alt="Can't Stop, Won't Stop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute top-3 left-3 bg-blood border-2 border-bone px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-bone">
              The Manifesto
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood">
              § Why $WINNING
            </span>
            <h2 className="font-display uppercase tracking-tight text-5xl sm:text-7xl leading-[0.9] glyph-shadow-tight">
              A coin for the <span className="text-blood">hustlers</span>.
            </h2>
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-bone/85">
              &ldquo;Can&rsquo;t stop, won&rsquo;t stop&rdquo; is more than a
              phrase. It&rsquo;s a refusal to be deterred. It&rsquo;s the
              ambition that builds skylines, breaks records and prints generational
              bags. <span className="font-bold text-bone">$WINNING</span> is
              that mantra, tokenized.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {POINTS.map((p) => (
              <li
                key={p.n}
                className="border-4 border-bone bg-ink p-4 shadow-[6px_6px_0_0_#d92121] plate"
              >
                <div className="font-mono text-xs text-blood">{p.n}</div>
                <div className="font-display uppercase text-2xl mt-1 text-bone">
                  {p.title}
                </div>
                <p className="text-sm mt-2 text-bone/75">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
