import { TOKEN } from "@/lib/constants";

export default function Chart() {
  const src = `https://dexscreener.com/${TOKEN.chain}/${TOKEN.pairAddress}?embed=1&theme=dark&trades=0&info=0`;

  return (
    <section id="chart" className="relative bg-charcoal text-bone grain-overlay">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-3 mb-8 sm:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood">
            § Live chart
          </span>
          <h2 className="font-display uppercase tracking-tight text-5xl sm:text-7xl leading-[0.9] glyph-shadow-tight">
            The only chart that <span className="text-blood">matters.</span>
          </h2>
          <p className="max-w-2xl text-bone/75">
            Streaming straight from Dexscreener. Up only — except when it&apos;s
            not, in which case it&apos;s a generational entry.
          </p>
        </div>

        <div className="relative border-4 border-bone shadow-[12px_12px_0_0_#d92121] bg-ink">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
            <iframe
              src={src}
              title="$WINNING live chart"
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              allow="clipboard-write"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
